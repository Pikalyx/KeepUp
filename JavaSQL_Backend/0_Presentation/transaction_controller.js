const transactionService = require("../1_business/business_calculations");

// ACCOUNTS 

// GET /accounts
async function getAccounts(req, res) {
  try {
    const accounts = await transactionService.getAllAccounts();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /accounts
async function createAccount(req, res) {
  try {
    const newAccount = await transactionService.createAccount(req.body.name);
    res.json(newAccount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// PUT /accounts/:id
async function renameAccount(req, res) {
  try {
    const updated = await transactionService.renameAccount(
      req.params.id,
      req.body.newName
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// DELETE /accounts/:id
async function deleteAccount(req, res) {
  try {
    await transactionService.deleteAccount(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// ENTRIES 

// GET /entries/:accountId
async function getEntries(req, res) {
  try {
    const entries = await transactionService.getEntries(req.params.accountId);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /entries
async function addEntry(req, res) {
  try {
    const savedEntry = await transactionService.addEntry(req.body);
    res.json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getAccounts,
  createAccount,
  renameAccount,
  deleteAccount,
  getEntries,
  addEntry,
};
