const mongoose = require("mongoose");
const { app } = require("./app");

// constants
const PORT = 3000;
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

// server setup
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});
