// Entry Point - starts server
console.log(">>> RUNNING APP FILE:", __filename);

const path = require("path");
const express = require("express");
const cors = require("cors");
const session = require("express-session");

// Import Controller
const transactionController = require("./JavaSQL_Backend/0_Presentation/transaction_controller");
const authController = require("./JavaSQL_Backend/0_Presentation/auth_controller");


const app = express();
const PORT = 3000;

//  Middleware 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'circular-squares-secret-key',
  resave:false,
  saveUninitialized:true,
  cookie: { secure: false, maxAge: 24*60*60*1000 } // Set to true if using HTTPS (Suggested by Co-pilot)
}))



// Log every incoming request for debugging (method + path) (Done by Co-pilot)
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

// Signin route
app.post("/signin", (req, res, next) => {
  console.log(">>> /signin POST route WAS HIT");
  next();
}, authController.signin);

console.log("AUTH CONTROLLER:", authController);

//Authentication middleware for user routes
function requireAuth(req, res, next) {
  if(!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });

  }next();
}


//API Routes

app.get("/accounts", requireAuth,transactionController.getAccounts);
app.post("/accounts", requireAuth,transactionController.createAccount);
app.put("/accounts/:id",requireAuth, transactionController.renameAccount);
app.delete("/accounts/:id",requireAuth, transactionController.deleteAccount);

app.get("/entries/:accountId", requireAuth,transactionController.getEntries);
app.post("/entries", requireAuth,transactionController.addEntry);


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

// Route for financial statements using /statements.html
app.get("/statements.html", (req, res) => {
  console.log(">>> /statements.html route WAS HIT");
  
  res.sendFile(
    path.join(__dirname, "HTML_Frontend", "financial_statement_test.html"),
    (err) => {
      if (err) {
        console.log(">>> ERROR SENDING FILE:", err);
        res.status(500).send("File error");
      }
    }
  );
});

console.log(">>> /statements.html route registered");



//Start Server

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
