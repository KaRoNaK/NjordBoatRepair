const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const UserRole = sequelize.define("user_role", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: Sequelize.STRING,
    },
});

module.exports = UserRole;
