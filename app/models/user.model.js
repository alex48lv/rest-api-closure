const sql = require("./db.js");
const { nanoid } = require('nanoid');

const User = function (user) {
    this.login = user.login;
    this.password = user.password;
    this.email = user.email;
    this.enabled = user.enabled;
}

User.checkAndSave = (login, email, newUser, result) => {
    console.log(login);
    sql.query(`SELECT COUNT(*) AS logins FROM users WHERE login = '${login}'`, (err, res) => {
        if (err) throw err;

        const loginCount = res[0].logins;
        if (loginCount === 1) {
            result(null, { error: "Выберите пожалуйста другое имя пользователя" });
        } else if (loginCount > 1) {
            result(null, { error: "Ошибка сервера" });
        }

        sql.query(`SELECT COUNT(*) AS emails FROM users WHERE email = '${email}'`, (err, res) => {
            if (err) throw err;

            const emailCount = res[0].emails;
            if (emailCount === 1) {
                const link = nanoid(5);
                result(null, { error: `Такой адрес электронной почты уже существует в базе данных. Если вы забыли имя пользователя, пройдите по ссылке https://appwhats.com/${link}` });
            } else if (emailCount > 1) {
                result(null, { error: "Ошибка сервера" });
            }

            sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
                if (err) {
                    console.error("Error: ", err);
                    result(null, err);
                    return;
                }
                console.log("created user: ", { id: res.insertId, ...newUser });
                result(null, { 'text': 'Новый пользователь добавлен в базу данных. ', id: res.insertId, ...newUser });
            })
        });
    });
};

module.exports = User;