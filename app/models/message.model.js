const sql = require("./db.js");

const Message = function(message) {
    this.login = message.login;
    this.text = message.text;
}

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
};

module.exports = Message;