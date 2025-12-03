const db = require("../3_config/db");

function createUser(username, email, passwordHash) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [username, email, passwordHash], function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
        });
    });
}

function createDefaultAccount(userId) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO accounts (user_id, name)
            VALUES (?, 'Main Account')
        `;

        db.run(sql, [userId], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = { createUser, createDefaultAccount };

function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, username, email, password_hash FROM users WHERE email = ?`;
        db.get(sql, [email], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

// export additional function
module.exports = { createUser, createDefaultAccount, findUserByEmail };
