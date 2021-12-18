const express = require("express");

const router = express.Router();

// GET all books
router.get("/", (req, res) => {});

module.exports = {
    booksRouter: router,
};
