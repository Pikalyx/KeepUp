// Entry Point - starts server
console.log(">>> RUNNING APP FILE:", __filename);

const path = require("path");
const express = require("express");
const cors = require("cors");

// Import Controller
const transactionController = require("./JavaSQL_Backend/0_Presentation/transaction_controller");
const authController = require("./JavaSQL_Backend/0_Presentation/auth_controller");


const app = express();
const PORT = 3000;

//  Middleware 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log every incoming request for debugging (method + path) (Done by VS Co-pilot)
app.use((req, res, next) => {
  console.log(`>>> REQ ${req.method} ${req.path}`);
  next();
});

// Serve static frontend folder (HTML, CSS, JS)
// Serve `signup.html` as the default index when requesting `/`.
app.use(express.static(path.join(__dirname, "HTML_Frontend"), { index: "signup.html" }));
console.log(">>> STATIC FOLDER:", path.join(__dirname, "HTML_Frontend"), "(default index: signup.html)");

app.post("/signup", (req, res, next) => {
  console.log(">>> /signup POST route WAS HIT");
  next();
}, authController.signup);

console.log("AUTH CONTROLLER:", authController);


//API Routes

app.get("/accounts", transactionController.getAccounts);
app.post("/accounts", transactionController.createAccount);
app.put("/accounts/:id", transactionController.renameAccount);
app.delete("/accounts/:id", transactionController.deleteAccount);

app.get("/entries/:accountId", transactionController.getEntries);
app.post("/entries", transactionController.addEntry);



// Frontend Route 

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



//Start Server

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
