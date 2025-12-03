const bcrypt = require("bcrypt");
const authRepo = require("../2_persistence/auth_repository");

async function signup(username, email, password) {
    const hash = await bcrypt.hash(password, 10);

    // Insert user record
    const userId = await authRepo.createUser(username, email, hash);

    // Create a default account for this user
    await authRepo.createDefaultAccount(userId);

    return userId;
}

module.exports = {signup};
