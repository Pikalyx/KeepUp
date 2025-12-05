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

// function createDefaultAccount(userId) {
//     return new Promise((resolve, reject) => {
//         const sql = `
//             INSERT INTO accounts (user_id, name)
//             VALUES (?, 'Main Account')
//         `;

//         db.run(sql, [userId], (err) => {
//             if (err) reject(err);
//             else resolve();
//         });
//     });
// }

module.exports = { createUser, createDefaultAccountsForUser };

function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, username, email, password_hash FROM users WHERE email = ?`;
        db.get(sql, [email], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

function createDefaultAccountsForUser(userId) {
    return new Promise((resolve, reject) => {
        const defaultAccounts = [
            "Cash",
            "Accounts Receivable",
            "Inventory",
            "Accounts Payable",
            "Common Stock",
            "Retained Earnings",
            "Rent Expense",
            "Payroll Expense",
            "Supplies Expense",
            "Cost of Goods Sold",
            "Sales Revenue",
            "Service Revenue"
        ];

        const sql = `INSERT INTO accounts (name, user_id) VALUES (? ,?)`;
        let completed = 0;
        let hasError = false;
        
        defaultAccounts.forEach((name) => {
            db.run(sql, [name, userId], (err) => {
                if (err && !hasError) {
                    hasError = true;
                    return reject(err);
                }
                completed++;
                if (completed === defaultAccounts.length && !hasError){
                    resolve();
                }
            });
        });
    });

}

// export additional function
module.exports = { createUser, findUserByEmail, createDefaultAccountsForUser };
