const bcrypt = require("bcrypt");
const authRepo = require("../2_persistence/auth_repository");

async function signup(username, email, password) {
    try {
        const hash = await bcrypt.hash(password, 10);

        // Insert user record
        const userId = await authRepo.createUser(username, email, hash);

        // Create default accounts for this user
        await authRepo.createDefaultAccountsForUser(userId);

        return userId;
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
}

async function signin(email, password) {
    try {
        const user = await authRepo.findUserByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) throw new Error('Invalid email or password');

        // return safe user info
        return { id: user.id, username: user.username, email: user.email };
    } catch (error) {
        console.error("Signin error:", error);
        throw error;
    }
}

module.exports = { signup, signin };
