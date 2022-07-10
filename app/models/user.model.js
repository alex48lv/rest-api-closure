const sql = require("./db.js");

const User = function(user) {
    this.login = user.login;
    this.password = user.password;
//    this.confirmPassword = user.confirmPassword;
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

User.findAll = result => {
    let query = "SELECT * FROM users";
    sql.query(query, (err, res) =>{
        if(err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }
        console.log("users: " + res);
        result(null, res);
    });
};

User.findUserByEmail = (email, result) => {
    console.log(email);
    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if(err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("email found");
            //result(null, res[0]);
            return Promise.resolve(email);
        }
    });
};

module.exports = User;


// SELECT id FROM users WHERE login = ?
//`SELECT id FROM users WHERE users.login = '${newMessage.login}'`
//INSERT INTO messages (users_id) SELECT id FROM users WHERE users.login = '${newMessage.login}'
//`INSERT INTO messages (users_id, text('${newMessage.text}')) SELECT id FROM users WHERE users.login = '${newMessage.login}'`