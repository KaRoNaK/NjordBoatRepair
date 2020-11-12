const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ServiceBoatType = sequelize.define("service_boat_type", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
});

module.exports = ServiceBoatType;
