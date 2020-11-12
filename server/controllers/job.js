const Job = require("../models/Job");
const Service = require("../models/Service");
const Boat = require("../models/Boat");
const BoatSubType = require("../models/BoatSubType");
const BoatType = require("../models/BoatType");
const User = require("../models/User");

module.exports.getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.findAll({
            include: [
                { model: Service },
                {
                    model: Boat,
                    include: [
                        { model: BoatSubType, include: [{ model: BoatType }] },
                    ],
                },
                { model: User },
            ],
        });

        const simplifiedJobs = jobs.map((job) => {
            const jobData = { ...job.dataValues };

            jobData.serviceName = job.service.name;
            jobData.boatName = job.boat.name;
            jobData.boatAddress = job.boat.address;
            jobData.boatCity = job.boat.city;
            jobData.boatSubTypeName = job.boat.boat_sub_type.name;
            jobData.boatTypeName = job.boat.boat_sub_type.boat_type.name;
            jobData.posterName = job.user.name;

            delete jobData.service;
            delete jobData.boat;
            delete jobData.user;

            return jobData;
        });

        res.status(200).json({
            message: "Jobs fetched successfully",
            jobs: simplifiedJobs,
        });
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    }
};
