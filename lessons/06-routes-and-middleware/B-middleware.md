Middleware are functions that run right before your handlers run. They can do things like augment the request, log, handle errors, authenticate, and pretty much anything else. They look exactly like a handler with one difference. Because you can have a list of middleware, there needs to be a mechanism to move into the next middlware function when work is done in the current middleware. It looks like this:

```ts
const myMiddlware = (req, res, next) => {
  // ... do my work, and when I done call next()
  next();
};
```

![middlewareReject](./images/midd-reject.png)
![middlewareAccept](./images/midd-accept.png)

Let's take morgan for example. It's a popular middleware for logging. It logs the request and response to the console. First you need to install it:

```sh
npm i morgan
```

Then you add this to your src/server.js file:

```ts
const morgan = require("morgan");

app.use(morgan("dev"));
```

Let's add cors to our API. This will allow us to make requests to our API from a different domain. First install it:

```sh
npm i cors
```

Then add it to your src/server.js file:

```ts
const cors = require("cors");

app.use(cors());
```

Finally we can add two express specific middleware functions:

```ts
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

This `next` function is exactly what it sounds like. It tells Express that we're done in the middleware and it's safe to proceed to whatever is next (more middleware or a handler).
<br>
To apply the middleware to a route, you can do this:

```ts
app.get("/todo/:id", myMiddleware, my2ndMiddleware, handler);
// or
app.get("/todo/:id", [myMiddleware, my2ndMiddleware], handler);
```

<br>
Middleware will run in the order in which you passed them as arguments.
