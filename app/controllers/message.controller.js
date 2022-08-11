const Message = require('../models/message.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Bad request"
        })
    }

    Message.saveMessage(req.body.user_id, req.body.text, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Could not get access to account" });
        } else {
            res.send(data);
        }
    });
};
