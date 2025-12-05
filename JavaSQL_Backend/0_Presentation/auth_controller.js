const authService = require("../1_business/auth_service");

async function signup(req, res) {
    console.log(">>> auth_controller.signup called");
    const { username, email, password } = req.body;
    
    try {
        const userId = await authService.signup(username, email, password);
        
        // Auto-login after successful signup
        const user = { id: userId, username, email };
        req.session.user = user;
        
        res.json({ success: true, message: "Signup successful!", user });
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
        req.session.user = user;
        res.json({ success: true, message: 'Signin successful', user });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(401).json({ success: false, message: err.message || 'Signin failed' });
    }    
}
//Thinking of adding logout function...Figuring out later
function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
}

module.exports = { signup, signin, logout };
