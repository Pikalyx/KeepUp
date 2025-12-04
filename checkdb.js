const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "JavaSQL_Backend/4_database/information.db");
const db = new sqlite3.Database(dbPath);

db.all("SELECT * FROM accounts", (err, rows) => {
  if (err) {
    console.log("ERROR:", err.message);
  } else {
    console.log("Accounts in DB:");
    console.log(rows);
  }
  db.close();
});
