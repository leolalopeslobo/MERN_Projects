const Task = require('../models/Task');

// create task service
const createTaskService = async(data) => {
    const task = new Task(data);
    return await task.save();
}

// get all tasks service
const getAllTaskService = async () => {
    return await Task.find();
}

// get a task service
const getATaskService = async (id) => {
    const task = await Task.findById(id);
    return task;
}

// update a task service
const updateATaskService = async (id, body) => {
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
        if (body[key] !== undefined) {

            // Add only allowed + existing fields to updates
            // Example result after loop:
            // updates = {
            //   title: "Study harder",
            //   priority: "high",
            //   is_done: true
            // }
            updates[key] = body[key];
        }
    }

    // Find the document in DB using ID
    const doc = await Task.findById(id);

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
    return updatedDoc;
}


// delete a task service
const deleteTaskService = async (id) => {
    const delTask = await Task.findByIdAndDelete(id);
    return delTask;
}

module.exports = {
    createTaskService,
    getAllTaskService,
    getATaskService,
    updateATaskService,
    deleteTaskService
}