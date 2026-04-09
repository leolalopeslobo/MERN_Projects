const { createTaskService, getAllTaskService, getATaskService, updateATaskService, deleteTaskService } = require('../services/taskService');

// create task controller
const createTask = async(req, res) => {
    console.log('Headers: ', req.headers);
    console.log('Body: ', req.body);
    try {
        const saved = await createTaskService(req.body);
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
        const tasks = await getAllTaskService();
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
        const task = await getATaskService(req.params.id);
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
        const updatedDoc = await updateATaskService(req.params.id, req.body);
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
        const delTask = await deleteTaskService(req.params.id);
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


// req and res only exist in the controller — they are never passed to the service.
// If the service needs data from the request, the controller must extract it and pass it as an argument.