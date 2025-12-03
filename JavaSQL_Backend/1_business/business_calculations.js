const transactionRepo = require("../2_persistence/transactionhandler");


async function createTransaction(data) {
  // Basic Error Handling
  if (data.amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  // Default user_id = 1, will create login system at a later point
  data.user_id = 1;

  return await transactionRepo.addTransaction(data);
}

async function listTransactions() {
  const transactions = await transactionRepo.getAllTransactions();
  return transactions;
}

module.exports = {
  createTransaction,
  listTransactions,
};

