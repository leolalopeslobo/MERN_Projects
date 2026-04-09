const Task = require('../models/Task');

// create task controller
const createTask = async(req, res) => {
    console.log('Headers: ', req.headers);
    console.log('Body: ', req.body);
    try {
        const task = new Task(req.body);
        const saved = await task.save()
        res.send(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// get all tasks controller
const getAllTasks = async (req, res) => {
    console.log('Headers: ', req.headers);
    console.log('Body: ', req.body);
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// get a specific task controller
const getATask = async (req, res) => {
    console.log('Headers: ', req.headers);
    console.log('Body: ', req.body);

    try {
        const task = Task.findById(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// update a task controller
const updateTask = async (req, res) => {
    console.log('Headers: ', req.headers);
    console.log('Body: ', req.body);

    try {
    // Example incoming request:
    // req.body = {
    //   title: "Study harder",
    //   priority: "high",
    //   is_done: true,
    //   randomField: "hack attempt"
    // }

    // Only these fields are allowed to be updated
    const allowedFields = ["title", "content", "priority", "is_done", "tags"];

    // This will store only valid fields from req.body
    const updates = {};

    // Loop through allowed fields one by one
    for (let key of allowedFields){

        // Check: does req.body contain this field?
        // Example checks:
        // key = "title"     → exists
        // key = "content"   → does NOT exist
        if (req.body[key] !== undefined) {

            // Add only allowed + existing fields to updates
            // Example result after loop:
            // updates = {
            //   title: "Study harder",
            //   priority: "high",
            //   is_done: true
            // }
            updates[key] = req.body[key];
        }
    }

    // Find the document in DB using ID
    const doc = await Task.findById(req.params.id);

    // Example DB document before update:
    // doc = {
    //   title: "Study",
    //   content: "Math chapter 1",
    //   priority: "low",
    //   is_done: false,
    //   tags: ["school"]
    // }

    // Apply updates to the document
    doc.set(updates);

    // After this line, doc becomes:
    // {
    //   title: "Study harder",      // updated
    //   content: "Math chapter 1",  // unchanged
    //   priority: "high",           // updated
    //   is_done: true,              // updated
    //   tags: ["school"]            // unchanged
    // }

    // Save updated document to database
    const updatedDoc = await doc.save();

    // Send updated document back as response
    res.json(updatedDoc);

    // Final response sent:
    // {
    //   _id: "...",
    //   title: "Study harder",
    //   content: "Math chapter 1",
    //   priority: "high",
    //   is_done: true,
    //   tags: ["school"]
    // }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// delete a task controller
const deleteTask = async(req, res) => {
    console.log("Headers: ", req.headers);
    console.log("Body: ", req.body);

    try {
        const delTask = await Task.findByIdAndDelete(req.params.id);
        res.json(delTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getATask,
    updateTask,
    deleteTask
}