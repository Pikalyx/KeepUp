const authService = require("../1_business/auth_service");

async function signup(req, res) {
    console.log(">>> auth_controller.signup called");
    const { username, email, password } = req.body;
    
    try {
        await authService.signup(username, email, password);
        res.json({ success: true, message: "Signup successful!" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(400).json({ success: false, message: "Signup failed: " + err.message });
    }
}

async function signin(req, res) {
    console.log(">>> auth_controller.signin called");
    const { email, password } = req.body;
    
    try {
        const user = await authService.signin(email, password);
        res.json({ success: true, message: 'Signin successful', user });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(401).json({ success: false, message: err.message || 'Signin failed' });
    }    
}

module.exports = { signup, signin };
