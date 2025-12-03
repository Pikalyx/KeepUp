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

module.exports = { signup };
