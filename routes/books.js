const express = require("express");
const { Book } = require("../models/book");
const { currentUser } = require("../middlewares/currentUser");
const { adminUser } = require("../middlewares/adminUser");

const router = express.Router();

// GET all books
router.get("/", currentUser, async (req, res) => {
    const books = await Book.find({});

    res.status(200).send(books);
});

// GET a book by ID
router.get("/:id", currentUser, async (req, res) => {
    const id = req.params.id;

    const book = await Book.findById(id).catch((err) => {
        console.log("Invalid ID");
    });

    if (!book) {
        res.status(400).send("Can't fetch the book details");
    }

    res.status(200).send(book);
});

// Add a book
router.post("/", adminUser, async (req, res) => {
    const { name, author, description, price } = req.body;

    const book = new Book({ name, author, description, price });

    await book.save();

    res.status(201).send(book);
});

// Update a book
router.put("/:id", adminUser, async (req, res) => {
    const id = req.params.id;
    const { name, author, description, price } = req.body;

    const book = await Book.findById(id).catch((err) => {
        console.log("Invalid ID");
    });

    if (!book) {
        res.status(400).send("Invalid ID");
    }

    const updatedBook = await Book.findByIdAndUpdate(id, {
        name,
        author,
        description,
        price,
    });

    res.status(200).send(updatedBook);
});

// Delete a book
router.delete("/:id", adminUser, async (req, res) => {
    const id = req.params.id;

    const book = await Book.findById(id).catch((err) => {
        console.log("Invalid ID");
    });

    if (!book) {
        res.status(400).send("Invalid ID");
    }

    const updatedBook = await Book.findByIdAndDelete(id);

    res.status(200).send("Data deleted");
});

module.exports = {
    booksRouter: router,
};
