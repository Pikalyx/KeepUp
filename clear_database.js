// Script to clear all data from the database
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "JavaSQL_Backend/4_database/information.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    process.exit(1);
  } else {
    console.log("Connected to database");
  }
});

// Clear all data from tables
db.serialize(() => {
  console.log("Clearing ledger_entries...");
  db.run("DELETE FROM ledger_entries", (err) => {
    if (err) console.error("Error clearing ledger_entries:", err.message);
    else console.log("✓ ledger_entries cleared");
  });

  console.log("Clearing accounts...");
  db.run("DELETE FROM accounts", (err) => {
    if (err) console.error("Error clearing accounts:", err.message);
    else console.log("✓ accounts cleared");
  });

  console.log("Clearing users...");
  db.run("DELETE FROM users", (err) => {
    if (err) console.error("Error clearing users:", err.message);
    else console.log("✓ users cleared");
  });

  // Reset auto-increment counters
  console.log("Resetting auto-increment counters...");
  db.run("UPDATE sqlite_sequence SET seq = 0 WHERE name IN ('users', 'accounts', 'ledger_entries')", (err) => {
    if (err) console.error("Error resetting counters:", err.message);
    else console.log("✓ Auto-increment counters reset");
    
    db.close((err) => {
      if (err) console.error("Error closing database:", err.message);
      else console.log("Database cleared successfully!");
    });
  });
});