const User = require("../models/User");
const UserRole = require("../models/UserRole");

module.exports = (role) => async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: UserRole }],
        });

        if (user.user_role.role !== role) {
            const error = new Error("Not authorized");
            error.statusCode = 403;
            throw error;
        }

        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
