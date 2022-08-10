module.exports = app => {
    const user = require("../controllers/user.controller");
    const message = require("../controllers/message.controller");
    var router = require("express").Router();

    router.post("/users", user.validate, user.create);

    router.post("/messages", message.create);

    app.use('/api', router);
}