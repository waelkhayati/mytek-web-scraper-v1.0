const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const {Op} = require("sequelize");
const Mobile = db.mobile

exports.Scrape = (req, res) => {
    const mobilelist =[]
    const limit = req.params.limit
    axios.get('https://www.mytek.tn/telephonie-tunisie/smartphone-mobile-tunisie.html?product_list_limit='+limit).then(r => {
        const html = r.data
        const $ = cheerio.load(html)
        $(('div.row.align-items-center'), html).each(function(){
            const titre = $(this).find(('a.product-item-link')).text()
            const disponibilité = $(this).find(('div.stock')).text()
            let prix = $(this).find(('span.price')).text()
            prix = prix.substr(0, prix.indexOf('D')+1)
            const url = $(this).find(('a.product-item-link')).attr(`href`)
            mobilelist.push({
                titre,
                disponibilité,
                prix,
                url
            })
        })
        let filtered = mobilelist.filter(function(value, index){
            return  index % 2 === 0;
        });
        for (let i = 0; i < filtered.length; i++) {

            const entry = Mobile.create({
                titre: filtered[i].titre,
                disponibilité: filtered[i].disponibilité,
                prix: filtered[i].prix,
                url: filtered[i].url
            });
        }
        res.status(200).json(filtered)
    }).catch((err)=>console.log(err))
};

exports.ScrapeFilter = (req, res) => {
    const mobilelist =[]
    const limit = req.params.limit
    const keyword = req.params.keyword
    axios.get('https://www.mytek.tn/telephonie-tunisie/smartphone-mobile-tunisie.html?product_list_limit='+limit).then(r => {
        const html = r.data
        const $ = cheerio.load(html)
        $(('div.row.align-items-center'), html).each(function(){
            const titre = $(this).find(('a.product-item-link:contains("'+ keyword +'")')).text()
            const disponibilité = $(this).find(('div.stock')).text()
            let prix = $(this).find(('span.price')).text()
            prix = prix.substr(0, prix.indexOf('D')+1)
            const url = $(this).find(('a.product-item-link')).attr(`href`)
            mobilelist.push({
                titre,
                disponibilité,
                prix,
                url
            })
        })

        let filtered = mobilelist.filter(function(value, index){
            if ((index % 2 === 0) && (value.titre !==""))
            return true
            return false
        });


        for (let i = 0; i < filtered.length; i++) {
            const entry = Mobile.create({
                titre: filtered[i].titre,
                disponibilité: filtered[i].disponibilité,
                prix: filtered[i].prix,
                url: filtered[i].url
            });
        }
        res.status(200).json(filtered)
    }).catch((err)=>console.log(err))
};

exports.RemoveAll = (req, res) =>{
    Mobile.destroy({
        where: {},
        truncate: true
    })
    res.status(200).send('article effacé avec succés!')
}

exports.RemoveByTitle = (req, res) =>{
    Mobile.destroy({
        where: {
            titre:{
                [Op.substring]: req.params.title
            }
        },
    })
    res.status(200).send('article effacé avec succés!')
}

exports.DisplayAll = async (req, res) =>{
    res.status(200).send(await Mobile.findAll())
}

exports.DisplayByTitle = async (req, res) =>{

    res.status(200).send(
        await Mobile.findAll({
            where: {
                titre:{
                    [Op.substring]: req.params.title
                }
            },
        })
    )
}