Lets create an API with Express instead of the vanilla JavaScript one we created earlier.

## Dependencies

Before we can use Express, we need to install it. Using NPM or Yarn:

`npm i express`
or
`yarn add express`

Next, let's create a simple API!

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
 console.log('hello from express');
 res.status(200);
 res.json({ message: 'ahlaaa' });
});

app.listen(42069, () => {
 console.log('listening to server on port 42069');
});

```

Here's another example, we can also send html files using express:

```javascript
const express = require("express");
const app = express();
const PORT = 42069;
const path = require("path");

app.use(express.static("static"));

/**
 * app.[method]([route], [route handler])
 */
app.get("/", (req, res) => {
  // sending back an HTML file that a browser can render on the screen.
  res.sendFile(path.resolve("pages/index.html"));
});

// creates and starts a server for our API on a defined port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
```

Express literally gives us a framework to build out the business logic of our APIs without having to put too much thought into how to make the API functional in the first place.
