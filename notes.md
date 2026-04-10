__v is a version key added by Mongoose

```json
"__v": 0
```

Tracks how many times a document has been modified via Mongoose document lifecycle


###### When does __v change?
Increments ONLY when using:
```js
const doc = await Task.findById(id);
doc.priority = "low";
await doc.save();
```

```json
"__v": 1
```

Does NOT change when using:
```js
await Task.findByIdAndUpdate(id, data);
```

```json
"__v": 0
```

###### Why does this happen?
Two update styles in Mongoose:
1. Document-based update (tracked)
```js
const doc = await Task.findById(id);
doc.field = value;
await doc.save();
```

Features:
- Tracks changes
- Runs validation
- Runs middleware
- Updates __v

2. Direct query update (untracked)
```js
await Task.findByIdAndUpdate(id, data);
```

Features:
- Faster
- No tracking
- No __v update
- Limited validation

For more read ['mongoose-versioning-debug'](/mongoose-versioning-debug.md)


Middleware is code that runs BEFORE your controller
validation is done by middlewares

Client
 ↓
Route
 ↓
Middleware (validation)
 ↓
Controller
 ↓
Service
 ↓
Database



You can have many middlewares and they run in the order you add them.

Request
    ↓
authMiddleware      → is the user logged in?
    ↓
validateTask        → is the data valid?
    ↓
rateLimiter         → is the user sending too many requests?
    ↓
Controller

Each middleware does its job and calls next() to pass the request to the next one. If any middleware fails — the chain stops there and the request never reaches the controller.