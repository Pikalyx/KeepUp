// //SECOND TRY
// const sqlite3 = require("sqlite3").verbose();
// const fs = require("fs");
// const path = require("path");


// const dbPath = path.join(__dirname, "../4_database/information.db");

// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) console.error("DB Connection Error: ", err.message);
//   else console.log("Connected to SQLite database.");
// });

// const schemaPath = path.join(__dirname, "../4_database/schema.sql");
// const schema = fs.readFileSync(schemaPath, "utf-8");
// db.exec(schema, (err) =>{
//   if (err) {
//     console.error("Schema initialization error: ", err.message);
//   }else {
//     console.log("Database initalized using schema.sql");
//   }
// });
// module.exports =db;

// First TRY
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

console.log("db.js loaded!");

const db = new sqlite3.Database(
  path.join(__dirname, "../4_database/information.db"),
  (err) => {
    if (err) {
      console.error(" Failed to connect to database:", err.message);
    } else {
      console.log(" Connected to SQLite database.");
    }
  }
);
// 1. Handle POST from the General Journal form
router.post("/add_transaction", (req, res) => {
  const { transaction_date, transaction_type, description, is_credit, amount } = req.body;
  const user_id = 1;

  const sql = `
    INSERT INTO user_transactions 
    (user_id, transaction_date, transaction_type, Transaction_desc, is_credit, amount)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [user_id, transaction_date, transaction_type, description, is_credit, amount], (err) => {
    if (err) {
      console.error("Error inserting transaction:", err.message);
      return res.status(500).send("Database insert failed.");
    }
      console.log("✅ Transaction added successfully!");
      res.redirect("/journal");
  });
});

// 2. Fetch all transactions
router.get("/journal", (req, res) => {
  const sql = `SELECT * FROM user_transactions ORDER BY transaction_date DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching transactions:", err.message);
      return res.status(500).send("Error retrieving transactions.");
    } 

    console.log("Sending rows: ", rows);
    let tableRows = rows
    .map(tx =>
      `<tr>
        <td>${tx.transaction_date}</td>
        <td>${tx.transaction_type}</td>
        <td>${tx.Transaction_desc}</td>
        <td>${tx.is_credit == 0 ? "✔" : ""}</td>
        <td>${tx.is_credit == 1 ? "✔" : ""}</td>
        <td>${tx.amount.toFixed(2)}</td>
      </tr>`
    )
    .join("");

    const html = `
    <html>
      <body>
        <h1>General Journal</h1>
      </body>
    </html>
    `;

    res.send(html);

  });
});

module.exports = router;
