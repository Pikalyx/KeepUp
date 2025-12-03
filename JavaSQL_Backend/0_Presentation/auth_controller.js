const authService = require("../1_business/auth_service");

async function signup(req, res) {
  console.log(">>> auth_controller.signup called");
  const { username, email, password } = req.body;

  try {
    await authService.signup(username, email, password);
    res.send("Signup successful!");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).send("Signup failed: " + err.message);
  }
}

module.exports = { signup };
