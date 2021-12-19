const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const currentUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(400).json("user must be signed in");
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const { userId } = jwt.verify(token, "jwt-secret");
        const user = await User.findById(userId);
        console.log(user);
        if (user) {
            next();
        }
    } catch (e) {
        console.log(e);
        res.status(400).json("unauthorized access");
    }
};

module.exports = {
    currentUser,
};
