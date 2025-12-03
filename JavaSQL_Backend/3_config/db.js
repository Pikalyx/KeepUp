const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Path to your SQLite database
const dbPath = path.join(__dirname, "../4_database/information.db");

// Create / connect to DB
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error connecting to SQLite DB:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
    initializeSchema();
  }
});

// Load and execute schema.sql
function initializeSchema() {
  const schemaPath = path.join(__dirname, "../4_database/schema.sql");

  if (!fs.existsSync(schemaPath)) {
    console.error("❌ schema.sql not found:", schemaPath);
    return;
  }

  const schema = fs.readFileSync(schemaPath, "utf8");

  db.exec(schema, (err) => {
    if (err) {
      console.error("❌ Error loading schema.sql:", err.message);
    } else {
      console.log("✅ Database initialized with schema.sql");
      seedDefaultAccounts(); 
    }
  });
}
// Create default accounts if table is empty
function seedDefaultAccounts() {
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

  db.get("SELECT COUNT(*) AS count FROM accounts", (err, row) => {
    if (err) {
      console.error("❌ Error checking accounts table:", err.message);
      return;
    }

    if (row.count > 0) {
      console.log(" Default accounts already exist, skipping seeding.");
      return;
    }

    console.log(" Seeding default chart of accounts...");

    const insertSQL = `INSERT INTO accounts (name) VALUES (?)`;

    defaultAccounts.forEach((name) => {
      db.run(insertSQL, [name], (err) => {
        if (err) console.error("Error inserting account:", name, err.message);
      });
    });

    console.log(" Default accounts created.");
  });
}



module.exports = db;
