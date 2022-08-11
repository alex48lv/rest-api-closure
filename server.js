const express = require("express");
const cors = require("cors");
const app = express();

var corsOption = { origin: "http://localhost" };

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    console.log(req.hostname);
    next();
});

require("./app/routes/user.routes")(app);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)});