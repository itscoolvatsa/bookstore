const express = require("express");

const app = express();

// middlewares
app.use(express.json());

// constants
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});
