const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    profile_pic: {
        type: Sequelize.STRING,
        defaultValue: "Such a nice profile pic",
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone_number: {
        type: Sequelize.STRING,
        defaultValue: "123456789",
    },
    address: {
        type: Sequelize.STRING,
        defaultValue: "HomeSweetHome",
    },
    zip_code: {
        type: Sequelize.STRING,
        defaultValue: "0000",
    },
    city: {
        type: Sequelize.STRING,
        defaultValue: "Atlantis",
    },
});

module.exports = User;
