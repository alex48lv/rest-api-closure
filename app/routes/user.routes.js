module.exports = app => {
    const user = require("../controllers/user.controller");
    const userData = require("../controllers/user.controller");
    const message = require("../controllers/user.controller");
    var router = require("express").Router();

    router.post("/", userData.validate, user.create);

    router.post("/message", message.send);

    // get all users
    //router.get("/", user.getAll);

    
    
    app.use('/api/users', router);
}