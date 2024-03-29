We know from our schema that a user needs a unique username and password. Lets create a handler to create a user. Before we can do that, we'll create some helper functions to hash and compare a user's password so we're not storing it in plain text.
<br>
Inside of `src/utils/auth.js`

```ts
const bcrypt = require("bcrypt");

const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

module.exports = {
  comparePasswords,
  hashPassword
}
```

`comparePasswords` compare a plain text password and hashed password to see if they're the same.
<br>

`hashPassword` hashes a password.
<br>
Now, let's create that handler inside `src/handlers/user.js`

```ts
const prisma = require("../db")
const { createJWT, hashPassword } = require("../utils/auth");

const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};
```

First thing here is the prisma import. I'm creating module that exports a Prisma client so we don't have to keep creating a new client every time we need it.
<br>
There isn't anything special going on here other than creating a new user then using that user to create a JWT and sending that token back as a response.
<br>
Next, we need to allow a user to sign in.

```ts
const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};


module.exports = {
  createNewUser,
  signin
}

```

Using the provided username, we search for a matching user. We'll get more into how to query with Prisma soon. Then we compare passwords. If it's a match, we create a JWT and send it back.

<br>
Now we need to create some routes and add these handlers. We can do this in `src/server.js`

```ts
const { createNewUser, signin } = require("./handlers/user");

app.post("/user", createNewUser);
app.post("/signin", signin);
```

Task for next lesson:

- Add expiration to JWTs
- Make token output something similar to this

```json
{
  "user_id": "usr_cbttlr6873dc33rdqc2g",
  "email": "faroukhamadi1@outlook.com",
  "preferred_region": "es",
  "preferred_locale": "en-us",
  "iss": "domain.co",
  "sub": "usr_cbttlr6873dc33rdqc2g",
  "aud": [
    "domain.co"
  ],
  "exp": 1709588476,
  "nbf": 1708378875,
  "iat": 1708378876,
  "jti": "usr_cbttlr6873dc33rdqc2g"
}
```

- Implement user routes
- Fix tweets route now that we have authentication set up
