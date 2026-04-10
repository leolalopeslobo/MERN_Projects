const { signUpService, loginService } = require('../services/authService');

// signup controller
const signUp = async (req, res) => {
    try {
    const saved = await signUpService(req.body);
    res.json({ id: saved._id, email: saved.email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) => {
  try {

    const token = await loginService(req.body);
    res.json({ token });

  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = {
    signUp,
    login
}