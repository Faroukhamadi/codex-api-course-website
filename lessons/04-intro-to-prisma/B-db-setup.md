---
title: "DB Setup"
description: "Setup our DB and install Prisma"
---

## Psql

We'll be using PSQL as a DB in this course. You won't have to install anything as we'll be using a hosting and managed DB from [Render](https://render.com). Go there, create an account, and then create a FREE psql DB.

## Installing Prisma

`npm i prisma --save-dev`
<br>
<br>

Next, we'll initalize Prisma
<br>

`npx prisma init`

<br>
This command will do a few things:

- Create a prisma folder
- Create a schema file in that folder
  Next, we'll learn how to design and create some models in our schema

Install the Prisma VS Code plugin. It gives you syntax highlighting and autocompletion for Prisma schema files.

![Prisma VS Code Plugin](./images/prisma-extension.png)
