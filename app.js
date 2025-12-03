// Entry Point - starts server
console.log(">>> RUNNING APP FILE:", __filename);

const path = require("path");
const express = require("express");
const cors = require("cors");

// Import Controller
const transactionController = require("./JavaSQL_Backend/0_Presentation/transaction_controller");

const app = express();
const PORT = 3000;

// ------------------- Middleware -------------------

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static frontend folder (HTML, CSS, JS)
// *** CORRECTED FOLDER NAME ***
app.use(express.static(path.join(__dirname, "HTML_Frontend")));
console.log(">>> STATIC FOLDER:", path.join(__dirname, "HTML_Frontend"));



// ------------------- API Routes -------------------

app.get("/accounts", transactionController.getAccounts);
app.post("/accounts", transactionController.createAccount);
app.put("/accounts/:id", transactionController.renameAccount);
app.delete("/accounts/:id", transactionController.deleteAccount);

app.get("/entries/:accountId", transactionController.getEntries);
app.post("/entries", transactionController.addEntry);


// ------------------- Frontend Route -------------------

app.get("/newLedger", (req, res) => {
  console.log(">>> /newLedger route WAS HIT");
  
  res.sendFile(
    path.join(__dirname, "HTML_Frontend", "newLedger.html"),
    (err) => {
      if (err) {
        console.log(">>> ERROR SENDING FILE:", err);
        res.status(500).send("File error");
      }
    }
  );
});

console.log(">>> /newLedger route registered");



// ------------------- Start Server -------------------

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
