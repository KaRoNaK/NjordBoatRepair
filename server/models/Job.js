const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Job = sequelize.define("job", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    is_emergency: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    allow_contact_by_app: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    can_user_bring_boat: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    allow_picking_from_spot: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    allow_repair_on_spot: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    allow_contact_by_phone: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    allow_contact_by_email: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    lat: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    lng: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    posted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    due_date: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
    },
    due_time: {
        type: Sequelize.TIME,
        defaultValue: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
    },
    is_done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Job;
