const express = require("express");

const jobController = require("../controllers/job");
const isAuth = require("../middleware/isAuth");
const authRole = require("../middleware/authRole");

const router = express.Router();

router.get("/", isAuth, authRole("company"), jobController.getJobs);

module.exports = router;
