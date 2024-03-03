Now that we have our schema and data models, we can start creating routes and route handlers to interact with those models. We'll be following a mostly RESTful approach to our API design, but as you'll soon learn, nothing ever stays the course when it comes to REST.

## Thinking of Routes

Until some other need presents itself, we want to create a route for every CRUD action for every resource. So, in the case of a Tweet, we want to create:

- `GET tweets/:id` - get a tweet by a given ID
- `GET tweets` - get all the tweets (for an authenticated user)
- `POST tweets` - create a new tweet
- `PUT tweets/:id` - update or replace a tweet that matches a given ID
- `PATCH tweets/:id` - update a tweet that matches a given ID
- `DELETE tweets/:id` - delete a tweet by a give ID

This is how REST looks. However, when developing an API that's consumed only by a client that you and your team also created, using something like REST is probably redundant and tedious. There's nothing stopping you from just creating an API route to get all the data for every page, or every component, or whatever makes sense for your application. Something like REST is great for external APIs so external developers can onboard more quickly because they know what to expect vs. having to learn some custom API design.

## Create our routes

Create a new file, `src/router.js` and work in there.

```ts
const express = require("express");
const router = express.Router();

router.get("/tweets", (req, res) => {
});

router.get("/tweets/:id", (req, res) => {
});

router.post("/tweets", (req, res) => {
});

router.put("/tweets/:id", (req, res) => {
});

router.delete("/tweets/:id", (req, res) => {
});

module.exports = router;
```

There are a few things going on here. First we created a new router using Express. This gives us more flexibility around configuring a set of routes vs. the whole API. You can create as many routers as you'd like with Express and mount them back to the main Express app on the appropriate paths.
<br>
We then created all the routes for the DB resources we want to interact with. User is noticiably missing. This is because User will have a special set of routes because of the importantance of that resource. For the handlers, we adding placeholder functions for now. If you try to make an API call, your API will get back a `404` status code and some HTML (default 404 response from Express). That's because we didn't mount this router back to the main Express app. So it's just floating and not actually attached to our API.
Let's do that next:
<br>
head over to `src/server.js`:

```js
const router = require("./router");
const express = require("express");

const app = express();

app.use('/api', router);

module.exports = app;
```

Import the router from the other file and remove any current route declerations in `server.js`. We then use something new here: `app.use()`, this allows you to apply a router or middleware (we will learn about middleware later) to the entire API, or in our case, to anything using the path `/api`. So a route we create in the router like `GET /product`, is now actually `GET /api/product` because the router is mounted on the `/api` path.

<br>
You should now be able to hit your API and not get a 404, but, it still won't work. What's happening now is your API is hanging, which just means it never responded back to the request and there is no more code to execute. The client will eventually timeout and close the connection. This happens because we never send a response in any of the handler functions we created. We'll do that soon, but for now, lets talk about middleware.
