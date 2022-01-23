module.exports = (sequelize, Sequelize) => {
    return sequelize.define("telephonie", {
        categorie: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        endpoint: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        }
    });
};
