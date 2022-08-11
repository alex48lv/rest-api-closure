const sql = require("./db.js");
const { nanoid } = require('nanoid');

const Message = function (message) {
    this.user_id = message.user_id;
    this.text = message.text;
    this.date = message.date;
};

Message.saveMessage = (user_id, message, result) => {
    const link = nanoid(5);

    sql.query(`SELECT COUNT(*) as count FROM users WHERE id=${user_id}`, (err, res) => {
        if (err) throw err;

        const count = res[0].count;

        if (count === 1) {
            sql.query(`SELECT enabled FROM users WHERE id=${user_id}`, (err, res) => {
                if (err) throw err;
                const enabled = res[0].enabled;

                if (enabled === 1) {
                    sql.query(`INSERT INTO messages (id, user_id, text, date) VALUES (NULL, ${user_id}, '${message}', NULL)`, (err, res) => {
                        if (err) throw err;

                        result(null, { 'text': 'Текст сообщения добавлен. ID = ' + res.insertId});
                    });
                } else {
                    result(null, { 'text': `Вы заблокированы, обратитесь в службу поддержки, нажав на ссылку https://appwhats.com/${link}`});
                }
            })
        } else {
            result(null, { 'text': `Вы не зарегистрированы! Нажмите на ссылку (https://appwhats.com/${link}), чтобы пройти регистрацию.`});
        }
    })
};

module.exports = Message;