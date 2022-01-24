const db = require("../models");
const Telephonie = db.telephonie

exports.Categories = async (req, res) =>{
    res.status(200).send(await Telephonie.findAll())
}