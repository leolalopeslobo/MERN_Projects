const mongoose = require('mongoose')

// A Schema is the blueprint. You're telling Mongoose: "Every Task document saved in the database must look exactly like this."
const taskSchema = new mongoose.Schema({
    title: String,
    content: String,
    priority: {
        type: String,
        enum: ["low", "moderate", "high"],
        default: "low"
    },
    is_done: {
        type: Boolean,
        default: false
    },
    tags: [String]
}, { timestamps: true, optimisticConcurrency: true });
/*
{ timestamps: true }
This is a bonus option outside the fields. It tells Mongoose to automatically add two fields to every task:

createdAt → when the task was created
updatedAt → when the task was last changed
*/

module.exports = mongoose.model("Task", taskSchema); //takes the blueprint and creates a Model called Task. 

/*
A Schema is just a plan on paper. It defines the shape and rules of your data — what fields exist, what types they are, what the defaults are.
But a Schema cannot talk to the database. It's just a description. It has no power on its own.

A Model takes that blueprint and brings it to life. It's the actual tool you use to interact with the database — creating, reading, updating, and deleting documents.
Think of it this way — the Model is what you actually use in your code to do things.




The form (Schema) defines the rules.
The HR department (Model) enforces those rules and does the actual work.
*/