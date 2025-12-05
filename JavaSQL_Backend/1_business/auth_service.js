const bcrypt = require("bcrypt");
const authRepo = require("../2_persistence/auth_repository");

async function signup(username, email, password) {
    const hash = await bcrypt.hash(password, 10);

    // Insert user record
    const userId = await authRepo.createUser(username, email, hash);

    // Create a default account for this user with default accounts
    await authRepo.createDefaultAccountsForUser(userId);

    return userId;
}

async function signin(email, password) {
    const user = await authRepo.findUserByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error('Invalid email or password');

    // return safe user info
    return { id: user.id, username: user.username, email: user.email };
}

module.exports = { signup, signin };
