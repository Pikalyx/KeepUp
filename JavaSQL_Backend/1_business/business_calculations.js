const transactionDB = require("../2_persistence/transactionhandler");

// ACCOUNTS

// Get all accounts
async function getAllAccounts() {
  return await transactionDB.getAllAccounts();
}

// Create a new account
async function createAccount(name) {
  if (!name || name.trim() === "") {
    throw new Error("Account name is required.");
  }
  return await transactionDB.createAccount(name.trim());
}

// Rename an account
async function renameAccount(id, newName) {
  if (!newName || newName.trim() === "") {
    throw new Error("New name is required.");
  }
  return await transactionDB.renameAccount(id, newName.trim());
}

// Delete an account
async function deleteAccount(id) {
  return await transactionDB.deleteAccount(id);
}

// ENTRIES

// Get all ledger entries for an account
async function getEntries(accountId) {
  if (!accountId) throw new Error("accountId is required.");
  return await transactionDB.getEntries(accountId);
}

// Add a ledger entry
async function addEntry(data) {
  const { accountId, date, desc, debit, credit } = data;

  if (!accountId) throw new Error("Account is required.");
  if (!date) throw new Error("Date is required.");
  if (!desc || desc.trim() === "") throw new Error("Description is required.");

  if ((!debit || debit == 0) && (!credit || credit == 0)) {
    throw new Error("Either debit or credit must have a value.");
  }

  return await transactionDB.addEntry({
    accountId,
    date,
    desc: desc.trim(),
    debit: Number(debit) || 0,
    credit: Number(credit) || 0,
  });
}

module.exports = {
  // Accounts
  getAllAccounts,
  createAccount,
  renameAccount,
  deleteAccount,

  // Entries
  getEntries,
  addEntry,
};
