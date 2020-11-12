const User = require("../models/User");
const UserRole = require("../models/UserRole");
const Job = require("../models/Job");
const Boat = require("../models/Boat");
const BoatSubType = require("../models/BoatSubType");
const BoatType = require("../models/BoatType");
const Service = require("../models/Service");
const ServiceBoatType = require("../models/ServiceBoatType");
const sequelize = require("./database");

const init = async () => {
    UserRole.hasMany(User);
    User.belongsTo(UserRole);

    User.hasMany(Job);
    Job.belongsTo(User);

    Service.hasMany(Job);
    Job.belongsTo(Service);

    Service.belongsToMany(BoatType, { through: ServiceBoatType });
    BoatType.belongsToMany(Service, { through: ServiceBoatType });

    BoatType.hasMany(BoatSubType);
    BoatSubType.belongsTo(BoatType);

    BoatSubType.hasMany(Boat);
    Boat.belongsTo(BoatSubType);

    Boat.belongsTo(User);
    User.hasMany(Boat);

    Job.belongsTo(Boat);
    Boat.hasMany(Job);

    try {
        // await sequelize.sync();
        await sequelize.sync({ force: true });

        const adminRole = await UserRole.create({
            role: "admin",
        });

        const companyRole = await UserRole.create({
            role: "company",
        });

        const userRole = await UserRole.create({
            role: "user",
        });

        const John = await User.create({
            name: "John Doe",
            email: "test@test.com",
            password: "superpassword123",
            userRoleId: userRole.id,
        });

        const Jane = await User.create({
            name: "Jane Doe",
            email: "test@test.com",
            password:
                "$2y$12$jp8FZAaPuyHX4tSw91jfWevVETlWDBdxwVf7MUmehpNy/oTaAWOQW",
            userRoleId: userRole.id,
        });

        const James = await User.create({
            name: "James Doe",
            email: "test@test.com",
            password:
                "$2y$12$q29zLSM5TdabH5cccjgzbuSrlsbxMqJMfI/29g7rKTRVLSse8Y.Vq",
            userRoleId: companyRole.id,
        });

        const engineRepairService = await Service.create({
            name: "Engine repair",
        });

        const dummyBoatType = await BoatType.create({
            name: "DummyType",
        });

        dummyBoatType.addService(engineRepairService);

        const dummyBoatSubType = await BoatSubType.create({
            name: "Dummy Sub Type",
            boatTypeId: dummyBoatType.id,
        });

        const dummyBoat1 = await Boat.create({
            name: "Black pearl",
            boatSubTypeId: dummyBoatSubType.id,
            userId: Jane.id,
        });

        const dummyBoat2 = await Boat.create({
            name: "The Codfather",
            boatSubTypeId: dummyBoatSubType.id,
            userId: John.id,
        });

        await Job.create({
            title: "Something wrong",
            description: "Unkown error",
            userId: Jane.id,
            serviceId: engineRepairService.id,
            boatId: dummyBoat1.id,
        });

        await Job.create({
            title: "Broken engine",
            description: "The negine will not start",
            userId: John.id,
            serviceId: engineRepairService.id,
            boatId: dummyBoat2.id,
            is_emergency: true,
        });
    } catch (err) {
        console.log("There has been a problem initializing the database", err);
    }

    return;
};

module.exports = init;
