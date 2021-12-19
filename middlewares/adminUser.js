const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const adminUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json("user must be signed in");
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const { userId } = jwt.verify(token, "jwt-secret");
        const user = await User.findById(userId);
        if (user && user.isAdmin) {
            next();
        } else {
            return res
                .status(400)
                .json("unauthorized access, you are not an admin");
        }
    } catch (e) {
        console.log(e);
        res.status(400).json("unauthorized access");
    }
};

module.exports = {
    adminUser,
};
