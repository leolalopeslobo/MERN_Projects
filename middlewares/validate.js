const validate = (schema) => (req, res, next) => {
  try {
        schema.parse(req.body);
        next();
  } catch (err) {
        return res.status(400).json({
        error: err.errors[0].message
        });
  }
};

module.exports = validate;



// What is next ?
// next is the function that moves the request forward to the next stop.
// It's automatically given to every middleware by Express — just like req and res are automatically given.

// next vs next()
// next — just the function sitting there, not called yet. Like a button that hasn't been pressed.
// next() — you're actually pressing the button — telling Express:

// If you DON’T call next():
// The request just gets stuck. It never moves forward to the controller.
// The user who made the request will just sit there waiting for a response that never comes — and eventually the request will time out.
