# Debugging Mongoose `__v` Not Incrementing

## What is `__v`?

`__v` is Mongoose's **version key**. It tracks how many times a document has been saved. It's used for **optimistic concurrency** — detecting conflicts when two processes try to update the same document at the same time.

---

## How to Make `__v` Work Correctly

You need **three things** in place:

### 1. Schema option: `optimisticConcurrency: true`

```js
const taskSchema = new mongoose.Schema({
    title: String,
    // ...other fields
}, { timestamps: true, optimisticConcurrency: true }); // ← this activates __v tracking
```

Without this, Mongoose **will not** increment `__v` on `save()`.

### 2. Use `doc.set()` not `Object.assign()`

```js
// ✅ Correct — goes through Mongoose's document lifecycle
doc.set(updates);

// ❌ Avoid — raw JS assignment, can bypass Mongoose's change tracking
Object.assign(doc, updates);
```

### 3. Save via `doc.save()`, not `findOneAndUpdate()`

```js
const doc = await Task.findById(req.params.id);
doc.set(updates);
const updatedDoc = await doc.save(); // __v increments here
```

> `findOneAndUpdate()` bypasses the document lifecycle entirely and will **never** increment `__v`.

---

## The Tricky Part: Stale Documents in the Database

Even with all three things correct, `__v` may still not increment on **old documents**.

### Why?

When you add `optimisticConcurrency: true` to an existing schema, only **new documents** (created after the change) will have `__v` physically stored in MongoDB.

Old documents show `__v: 0` in API responses, but that's Mongoose adding it **virtually** — the field doesn't actually exist in the raw database record. Mongoose has nothing to increment against.

### The Clue

If correct code still shows `__v: 0` after multiple updates — and no errors are thrown — the field is missing from the actual document in MongoDB.

```
// Two separate PUT requests, both return __v: 0 → data problem, not code problem
{"__v": 0}
{"__v": 0}
```

### The Fix: Data Migration

Run this once in your MongoDB shell to physically write `__v: 0` into all existing documents:

```js
db.tasks.updateMany({}, { $set: { __v: 0 } })
```

After this, Mongoose can find the field, compare it, and increment it on every `save()`.

---

## Debugging Checklist

When `__v` is not incrementing, go through this in order:

| Step | Check | Fix |
|------|-------|-----|
| 1 | Is `optimisticConcurrency: true` in the schema? | Add it |
| 2 | Did you restart the server after changing the schema? | Restart — Node caches modules in memory |
| 3 | Are you using `doc.save()` (not `findOneAndUpdate`)? | Switch to `findById` + `save()` |
| 4 | Are you using `doc.set()` (not `Object.assign`)? | Switch to `doc.set(updates)` |
| 5 | Does `__v` still not increment after all of the above? | Run the data migration below |

```js
// Data migration — run once in MongoDB shell
db.your_collection.updateMany({}, { $set: { __v: 0 } })
```

---

## Key Lesson

> **Correct code + wrong data = data problem, not a code problem.**

If your code looks right but the behavior is still wrong, check whether the **existing data in the database** matches what your code now expects. Schema changes don't retroactively fix old documents.

References
- [https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose](https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose)