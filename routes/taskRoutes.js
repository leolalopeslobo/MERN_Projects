const express = require('express');
const router = express.Router(); // is like creating a mini receptionist that handles a specific section of your app
const validate = require('../middlewares/validate');
const { taskSchema } = require("../validators/taskValidator");
const auth = require('../middlewares/auth');
const { createTask, getAllTasks, getATask, updateTask, deleteTask } = require('../controllers/taskControllers');

//create a task
router.post("/", auth, validate(taskSchema), createTask);

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
router.get("/", auth, getAllTasks)

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
router.get("/:id", auth, getATask)


// update/edit a task
router.put("/:id", auth, validate(taskSchema), updateTask)

// delete a task
router.delete("/:id", auth, deleteTask);
module.exports = router;