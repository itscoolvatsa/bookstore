const express = require("express");
const mongoose = require("mongoose");
const { booksRouter } = require("./routes/books");
const { userRouter } = require("./routes/users");

const app = express();

// middlewares
app.use(express.json());

// constants
const PORT = 3000;
const API_URL = "api";
const MONGO_URI =
    "mongodb+srv://itscoolvatsa:mongodbpassword@cluster0.cikjf.mongodb.net/bookstore?retryWrites=true&w=majority";

// database connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });

// routes
app.use(`/${API_URL}/books`, booksRouter);
app.use(`/${API_URL}/users`, userRouter);

// server setup
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});
