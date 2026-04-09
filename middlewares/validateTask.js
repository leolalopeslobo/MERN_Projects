module.exports = async (req, res, next) => {
    const { title, content, priority, is_done, tags } = req.body; // destructuring

    // basic checks
    if(title && typeof(type) !== 'string') {
        return res.status(400).json({ error: "Title must be a string" });
    }

    if (content && typeof content !== "string") {
        return res.status(400).json({ error: "Content must be a string" });
    }

    if (priority && !["high", "moderate", "low"].includes(priority)) {
        return res.status(400).json({ error: "Invalid priority" });
    }

    if (is_done !== undefined && typeof is_done !== "boolean") {
        return res.status(400).json({ error: "is_done must be boolean" });
    }

    if (tags && !Array.isArray(tags)) {
        return res.status(400).json({ error: "tags must be an array" });
    }

  next(); // everything is fine, move forward to controller
}

// What is next ?
// next is the function that moves the request forward to the next stop.
// It's automatically given to every middleware by Express — just like req and res are automatically given.

// next vs next()
// next — just the function sitting there, not called yet. Like a button that hasn't been pressed.
// next() — you're actually pressing the button — telling Express:

// If you DON’T call next():
// The request just gets stuck. It never moves forward to the controller.
// The user who made the request will just sit there waiting for a response that never comes — and eventually the request will time out.
