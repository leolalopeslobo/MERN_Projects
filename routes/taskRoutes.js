const express = require('express');
const router = express.Router(); // is like creating a mini receptionist that handles a specific section of your app
const Task = require('../models/Task')

//create a task
router.post("/", async(req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    try {
        const task = new Task(req.body);
        const saved = await task.save() // wait for save to finish
        res.send(saved)                 // then run this
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// async/await
/*
async
You put this before a function to say:

"This function contains slow operations — it will return a Promise."

You cannot use await without first marking the function as async.
await
You put this before a slow operation to say:

"Stop here and wait for this to finish before moving to the next line."
*/

// The only reason try/catch exists in async/await is because you no longer have .catch() chained at the end — so you need another way to catch errors. try/catch is that way.


// get all tasks
router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

/*
Q: What is res.send()?
A: General purpose — sends anything back. Figures out the type on its own.
Q: What is res.json()?
A: Explicitly sends JSON — also sets the correct header Content-Type: application/json automatically so the receiver knows the format.
Q: Why not just use res.send() for everything?
A: You could and it would work — but res.json() is more explicit and correct when sending data. It clearly communicates your intention.
Q: When to use which?
A: Sending data from database → res.json(). Sending a simple message → res.send().
*/

// get a specific task
router.get("/:id", async(req, res) => {
    try {
        const specificTask = await Task.findById(req.params.id)
        res.json(specificTask)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// update/edit a task
router.put("/:id", async(req, res) => {
    console.log("Header ", req.header);
    console.log("Body ", req.body);
    try {
        const allowedFields = ["title", "content", "priority", "is_done", "tags"];
        const updates = {};

        for (let key of allowedFields) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        const doc = await Task.findById(req.params.id);

        doc.set(updates);

        const updatedDoc = await doc.save(); // __v increments due to optimisticConcurrency: true in schema

        res.json(updatedDoc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;