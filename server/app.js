const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const init = require("./util/initDb");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// app.listen(3000);

init()
    .then((res) => {
        app.listen(process.env.PORT);
    })
    .catch((err) => console.log(err));
