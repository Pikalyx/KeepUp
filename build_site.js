// chatgpt helped me on this code in some aspects
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

// setup file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteDir = path.join(__dirname, "site");

// make sure the site directory exists
if (!fs.existsSync(siteDir)) {
  fs.mkdirSync(siteDir);
  console.log("📁 Created 'site' folder.");
}

// copy logo
const logoPath = path.join(__dirname, "SWElogo.jpeg");
const logoDest = path.join(siteDir, "SWElogo.jpeg");
if (fs.existsSync(logoPath)) {
  fs.copyFileSync(logoPath, logoDest);
} else {
  console.warn("⚠️ SWElogo.jpeg not found — the logo will be missing.");
}

// generate each page
function makePage(title, heading, content) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      text-align: center;
      background-color: #fafafa;
    }
    header img { height: 220px; }
    h1 { color: #1b5e20; }
    nav button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 5px;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s;
    }
    nav button:hover {
      background-color: #2e7d32;
      transform: scale(1.05);
    }
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
      padding: 4px;
      margin: 0 auto;
    }
  </style>

  <script>
    function navigate(page) {
      window.location.href = page + ".html";
    }
  </script>
</head>

<body>
  <header>
    <img src="SWElogo.jpeg" alt="JNJB Logo">
    <h1>${heading}</h1>
  </header>

  <nav>
    <button onclick="navigate('home')">Home</button>
    <button onclick="navigate('journal')">General Journal</button>
    <button onclick="navigate('ledger')">General Ledger</button>
    <button onclick="navigate('statements')">Financial Statement</button>
    <button onclick="navigate('info')">Info</button>
    <button onclick="navigate('help')">Help / Database</button>
  </nav>

  <div style="margin-top:20px;">
    ${content}
  </div>
</body>
</html>`;
}

/*updated ledger*/

const ledger = `
<div class="app" role="application" aria-label="General Ledger">
  <aside class="sidebar" aria-label="Accounts sidebar">
    <h2>Accounts</h2>
    <div class="controls">
      <input id="newAccountName" placeholder="New account name" />
      <button class="primary" id="createAccountBtn">Create</button>
    </div>

    <div class="account-list" id="accountsList" aria-live="polite"></div>

    <div style="margin-top:10px;display:flex;gap:8px;align-items:center">
      <button class="ghost" id="renameAccountBtn">Rename</button>
      <button class="ghost" id="deleteAccountBtn">Delete</button>
      <button class="ghost" id="exportAllBtn">Export All CSV</button>
    </div>

    <footer class="note">
      Tip: Use the "Add Entry" form in the main area to record debits/credits.
    </footer>
  </aside>

  <main class="main" id="main">
    <div class="ledger-header">
      <div>
        <h2 id="ledgerTitle">Select an account</h2>
        <div class="small" id="ledgerSubtitle">No account selected</div>
      </div>

      <div class="actions">
        <select id="accountFilter" style="min-width:160px"></select>
        <button class="primary" id="addEntryToggle">Add Entry</button>
        <button class="export" id="exportAccountBtn">Export CSV</button>
      </div>
    </div>

    <section id="addEntrySection" style="display:none;margin-bottom:12px">
      <div style="background:rgba(15, 212, 108);border-radius:10px;padding:12px">
        <form id="entryForm" onsubmit="return false">
          <div class="form-row">
            <input type="date" id="entryDate" required />
            <input type="text" id="entryDescription" placeholder="Description" style="flex:1" required />
            <select id="entryAccountSelect" required></select>
            <input type="number" id="entryDebit" min="0" step="0.01" placeholder="Debit" />
            <input type="number" id="entryCredit" min="0" step="0.01" placeholder="Credit" />
            <button class="primary" id="saveEntryBtn">Save</button>
            <button class="ghost" id="clearEntryBtn" type="button">Clear</button>
          </div>
          <div class="small muted">
            Enter either Debit or Credit. Split entries require multiple lines.
          </div>
        </form>
      </div>
    </section>

    <section id="ledgerSection" aria-live="polite">
      <table class="ledger-table" id="ledgerTable">
        <thead>
          <tr>
            <th style="width:120px">Date</th>
            <th style="width:250px">Description</th>
            <th style="width:140px">Debit</th>
            <th style="width:140px">Credit</th>
            <th style="width:140px" class="text-right">Balance</th>
          </tr>
        </thead>
        <tbody id="ledgerBody">
          <tr><td colspan="5" class="small muted">No account selected</td></tr>
        </tbody>
      </table>
    </section>
  </main>
</div>

<style>
/* ----- Your full CSS goes here (unchanged) ----- */
</style>

<script>
/* ----- Your full JavaScript logic goes here (unchanged) ----- */
</script>
`;

/*updated journal (MUST appear before page defs)*/

const journalRows = Array.from({ length: 50 })
  .map(
    () => `
  <tr>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
  </tr>`
  )
  .join("");

const journal = `
<table style="width:100%">
  <tr>
    <th>Date</th>
    <th>Account</th>
    <th>Post #</th>
    <th>Debit</th>
    <th>Credit</th>
  </tr>
  ${journalRows}
</table>`;

/*define pages*/

const pages = {
  "home.html": [
    "Home",
    "Welcome to JNJB Personalized Bookkeeping Service",
    "<p>Please select an option.</p>"
  ],
  "journal.html": [
    "General Journal",
    "General Journal",
    journal
  ],
  "ledger.html": [
    "General Ledger",
    "General Ledger",
    ledger
  ],
  "statements.html": [
    "Financial Statement",
    "Financial Statement",
    "<p>Financial statements</p>"
  ],
  "info.html": [
    "Info",
    "Information",
    "<p>INFO</p>"
  ],
  "help.html": [
    "Help/Database",
    "Help & Database",
    "<p>HELP</p>"
  ]
};

/*write the files*/

for (const [filename, [title, heading, content]] of Object.entries(pages)) {
  fs.writeFileSync(path.join(siteDir, filename), makePage(title, heading, content), "utf-8");
}

console.log("✅ Website created in ./site");

/*initialize defualt browser*/

const homePage = path.join(siteDir, "home.html");

const openCommand =
  process.platform === "win32"
    ? `start "" "${homePage}"`
    : process.platform === "darwin"
    ? `open "${homePage}"`
    : `xdg-open "${homePage}"`;

exec(openCommand, (err) => {
  if (err) console.error("⚠️ Could not open browser automatically:", err);
  else console.log("🌐 Homepage opened successfully.");
});
