const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const BoatSubType = sequelize.define("boat_sub_type", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: "No image available",
    },
});

module.exports = BoatSubType;
