const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const UserRole = require("../models/UserRole");

require("dotenv").config();

module.exports.login = async (req, res, next) => {
    const name = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({
            where: { name },
            include: [{ model: UserRole }],
        });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { name: user.name, userId: user.id.toString() },
            process.env.SECRET_OR_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            token,
            userId: user.id.toString(),
            userRole: user.user_role.role,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
