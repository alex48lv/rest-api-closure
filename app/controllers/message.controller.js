const Message = require('../models/message.model');
const sql = require("../models/db.js");

//Create and save new message
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Bad request"
        })
    }
    //check if user is registered and not banned
    Message.checkUser(req.body.user_id, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Could not get access to account"});
        } else {
            res.send(data);
        }
    });

    const message = new Message({
        user_id: req.body.user_id,
        text: req.body.text,
        date: req.body.date
    });

    Message.create(message, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            })
        } else {
            res.send(data);
        }
    })
};