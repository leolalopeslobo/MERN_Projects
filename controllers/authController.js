const { signUpService, loginService } = require('../services/authService');

// signup controller
const signUp = async (req, res, next) => {
    try {
    const saved = await signUpService(req.body);
    res.json({ id: saved._id, email: saved.email });
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
  try {

    const token = await loginService(req.body);
    res.json({ token });

  } catch (err) {
      next(err);
  }
};

module.exports = {
    signUp,
    login
}