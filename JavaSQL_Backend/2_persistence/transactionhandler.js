const db = require("../3_config/db");

//  ACCOUNTS 

// Get all accounts
exports.getAllAccounts = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM accounts ORDER BY id ASC`;
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// 1.C=Creating a new account
exports.createAccount = (name) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO accounts (name) VALUES (?)`;
    db.run(sql, [name], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, name });
    });
  });
};

// 2.U =Rename an account
exports.renameAccount = (id, newName) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE accounts SET name = ? WHERE id = ?`;
    db.run(sql, [newName, id], function (err) {
      if (err) return reject(err);
      resolve({ id, newName });
    });
  });
};

// 3. D = Delete an account
exports.deleteAccount = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM accounts WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) return reject(err);
      resolve(true);
    });
  });
};


//  ENTRIES 

// Get all ledger entries for an account
exports.getEntries = (accountId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, account_id, date, description, debit, credit
      FROM ledger_entries
      WHERE account_id = ?
      ORDER BY date ASC, id ASC
    `;
    db.all(sql, [accountId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// Add a ledger entry
exports.addEntry = ({ accountId, date, desc, debit, credit }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO ledger_entries 
      (account_id, date, description, debit, credit)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, [accountId, date, desc, debit, credit], function (err) {
      if (err) return reject(err);

      resolve({
        id: this.lastID,
        accountId,
        date,
        desc,
        debit,
        credit,
      });
    });
  });
};
