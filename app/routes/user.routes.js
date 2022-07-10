module.exports = app => {
    const user = require("../controllers/user.controller");
    const userData = require("../controllers/user.controller");
    const message = require("../controllers/message.controller");
    var router = require("express").Router();

    router.post("/users", userData.validate, user.create);


    router.post("/messages", message.create);
//    router.get("/:user_id", message.checkUser);

    // get all users
    router.get("/", user.getAll);

    
    
    app.use('/api', router);
}