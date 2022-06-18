const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const expressValidator = require("express-validator");

var corsOption = { origin: "http://localhost" };

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
app.get("/", (req, res) => {
    res.json({message: ""});
});*/

require("./app/routes/user.routes")(app);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)});