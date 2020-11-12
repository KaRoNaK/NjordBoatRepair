const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Boat = sequelize.define("boat", {
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
    year: {
        type: Sequelize.INTEGER,
        defaultValue: 2000,
    },
    engine_serial_number: {
        type: Sequelize.INTEGER,
        defaultValue: 12345,
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: "Very good",
    },
    length: {
        type: Sequelize.FLOAT,
        defaultValue: 123,
    },
    address: {
        type: Sequelize.STRING,
        defaultValue: "Home",
    },
    zip_code: {
        type: Sequelize.STRING,
        defaultValue: "1234",
    },
    city: {
        type: Sequelize.STRING,
        defaultValue: "Tortuga",
    },
});

module.exports = Boat;
