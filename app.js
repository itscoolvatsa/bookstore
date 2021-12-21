const express = require("express");
const { booksRouter } = require("./routes/books");
const { userRouter } = require("./routes/users");

const app = express();

// middlewares
app.use(express.json());

const API_URL = "api";

// routes
app.use(`/${API_URL}/books`, booksRouter);
app.use(`/${API_URL}/users`, userRouter);

module.exports = { app };
