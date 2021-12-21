const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { currentUser } = require("../middlewares/currentUser");

const router = express.Router();
const { hashPassword, comparePassword } = require("../services/password");

// Get all user
router.get("/", async (req, res) => {
    const users = await User.find();

    res.status(201).send(users);
});

// Add a user
router.post("/", async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const checkuser = await User.findOne({ email });

    if (checkuser) {
        return res.status(400).json("email already exists");
    }

    const hashedPassword = await hashPassword(password);

    let user = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin,
    });

    try {
        await user.save();
        user = { name, email };

        res.status(201).send(user);
    } catch (err) {
        console.log(err.message);
        res.status(400).json("user not created");
    }
});

// SignIn a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json("Invalid Credentials");
    }

    const comparedPassword = await comparePassword(password, user.password);

    if (comparedPassword) {
        const token = jwt.sign(
            {
                userId: user.id,
            },
            "jwt-secret",
            {
                expiresIn: "1d",
            }
        );

        res.setHeader("authorization", `Bearer ${token}`);

        res.status(200).send(token);
    } else {
        res.status(400).json("Invalid Credentials");
    }
});

module.exports = {
    userRouter: router,
};
