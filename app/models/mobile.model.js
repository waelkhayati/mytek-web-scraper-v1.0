module.exports = (sequelize, Sequelize) => {
    return sequelize.define("mobile", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre:{
            type: Sequelize.STRING,
            unique: true
        },
        disponibilité:{
            type: Sequelize.STRING
        },
        prix: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        }
    });
};
