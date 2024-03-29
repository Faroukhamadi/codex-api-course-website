---
description: "How to design a schema"
---

We're not building a UI for this API in this course. However, having a UI design is helpful when designing your models. Knowing what data is required in a UI gives you hints on what needs to be recorded in a DB.
<br>

We'll be using the design [here](https://sveltekit-twitter-clone-production.up.railway.app/tweets) as an imaginary twitter app. Let's observe this UI and figure out what resources we need to record in our DB.

<br>
<!-- So it looks like we'll need at least the following:
* `Update` - title, body, asset, status (in progress, launched), created at, and version
* `Update Point` - belongs to an update, type (feature, improvement, bug)
* `Feature`
<br>
And of course standard things like users. There will probably be supporting models that we create to help with querying and other logic like authentication. -->

So it looks like we'll need at least the following:

* `Tweet` - body, created at, and user
* `User` - username, email, password, created at, and tweets
* `Follow` - belongs to a user, belongs to a user, and created at
