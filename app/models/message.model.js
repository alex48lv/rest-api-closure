const sql = require("./db.js");

const Message = function (message) {
    this.user_id = message.user_id;
    this.text = message.text;
    this.date = message.date;
};

Message.create = (newMessage, result) => {
    sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
        if (err) {
            console.log("error", err);
            return;
        }

        console.log('Message created');
        result(null, { id: res.insertId, ...newMessage });
    })
};

Message.checkUser = user_id => {
    sql.query(`SELECT enabled FROM users WHERE id=${user_id}`, (err, res) => {
        if (err) throw err; 
        else {
            if (res.length == 0) {
                throw Error("Only registered users can send messages. Please log in or create an account!");
            } else {
                if (res[0].enabled == false) {
                    throw Error("Your account is disabled");
                }
                console.log("user ok");
            } 
        }
    })
};

/*
Message.send = (newMessage, result) => {
    sql.query(`INSERT INTO messages (users_id) SELECT id FROM users WHERE login = '${newMessage.login}'`);
    sql.query(`UPDATE messages SET text = '${newMessage.text}' WHERE id = LAST_INSERT_ID()`, newMessage, (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    })
};*/

module.exports = Message;