---
description: "Creating DB models with with Primsa"
---

## Prisma Syntax

Prisma has an easy to understand syntax for creating models. Its based on the GraphQL language which is based on JSON. So you'll feel right at home. I highly recommend installing the Prisma VS Code plugin. It lints and cleans up your schema file.

<br>
Now, onto the models. Let's look at an example model.
<br>

```prisma
model User {
  id        String @id @default(uuid())
  username  String @unique
  password  String
  image_url String @default("")
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  
  tweets       Tweet[]
  followed_by  Follows[] @relation("following")
  following    Follows[] @relation("follower")
}
```

Most of this is self explanatory, but check out the comments in the code to learn a bit more context. This isn't a prisma course, so we're going to keep moving along on our API. The rest of the modeling looks very much like this.

## Tweet

```prisma
model Tweet {
  id   String @id @default(uuid())
  body String
  
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  user    User   @relation(fields: [user_id], references: [id], onDelete: Cascade, onUpdate: Cascade)
  user_id String
}
```

Above is our Tweet schema

## Follows

```prisma
model Follows {
  follower     User   @relation("follower", fields: [follower_id], references: [id])
  follower_id  String
  following    User   @relation("following", fields: [following_id], references: [id])
  following_id String

  @@id([follower_id, following_id])
}
```

As we continue to build, we will most likely make changes to our schema to fit the experience we want to create.
