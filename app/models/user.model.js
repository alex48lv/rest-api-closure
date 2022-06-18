const sql = require("./db.js");

const User = function(user) {
    this.login = user.login;
    this.password = user.password;
    this.email = user.email;
    this.enabled = user.enabled;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.error("Error: ", err);
            result(null, err);
            return;
        }
        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser})
    })
};



module.exports = User;


// SELECT id FROM users WHERE login = ?
//`SELECT id FROM users WHERE users.login = '${newMessage.login}'`
//INSERT INTO messages (users_id) SELECT id FROM users WHERE users.login = '${newMessage.login}'
//`INSERT INTO messages (users_id, text('${newMessage.text}')) SELECT id FROM users WHERE users.login = '${newMessage.login}'`