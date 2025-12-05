const db = require("../3_config/db");

//  ACCOUNTS 

// Get all accounts
exports.getAllAccounts = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM accounts WHERE user_id = ? ORDER BY id ASC`;
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// 1.C=Creating a new account
exports.createAccount = (name, userId) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO accounts (name, user_id) VALUES (?, ?)`;
    db.run(sql, [name, userId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, name });
    });
  });
};

// 2.U =Rename an account
exports.renameAccount = (id, newName, userId) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE accounts SET name = ? WHERE id = ? AND user_id = ?`;
    db.run(sql, [newName, id, userId], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) {
        return reject(new Error('Account not found or access denied'));
      }
      resolve({ id, newName });
    });
  });
};

// 3. D = Delete an account
exports.deleteAccount = (id, userId) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM accounts WHERE id = ? AND user_id = ?`;
    db.run(sql, [id, userId], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) {
        return reject(new Error('Account not found or access denied'));
      }
      resolve(true);
    });
  });
};


//  Entries 

// Get all ledger entries for an account (Got help from co-pilot for getEntries)
exports.getEntries = (accountId, userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT le.id, le.account_id, le.date, le.description, le.debit, le.credit
      FROM ledger_entries le
      INNER JOIN accounts a ON le.account_id = a.id
      WHERE le.account_id = ? AND a.user_id = ?
      ORDER BY le.date ASC, le.id ASC
    `;
    db.all(sql, [accountId, userId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// Add a ledger entry
exports.addEntry = ({ accountId, date, desc, debit, credit }, userId) => {
  return new Promise((resolve, reject) => {
    // Checks if the user owns the account
    const checkSql = `SELECT id FROM accounts WHERE id = ? AND user_id = ?`;
    db.get(checkSql, [accountId, userId], (err, row) => {
      if (err) return reject(err);
      if (!row) return reject(new Error('Account not found or access denied'));
      
      // If user owns the account, add the entry
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
  });
};
