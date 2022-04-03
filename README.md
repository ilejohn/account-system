# account-system

# General Info

This is a mini project in response to the implementation question of a successful job assessment for a fintech company. The assessment is as follows:

```
ASSESSMENT

Given a requirement to build a system where
  • A user can create an account
  • A user can fund their account
  • A user can transfer funds to another user’s account
  • A user can withdraw funds from their account.

Your task is to present
  A short technical design document for your implementation
  An implementation of the project (NodeJS API only)

Notes

  1. You may not bother about building a full authentication system, a faux token-
     based authentication will suffice.
  2. Ensure to write tests for the project

Tech Stack
  • NodeJS (LTS version)
  • KnexJS ORM
  • MySQL database

```

# Configuration:

copy and paste the content of the .env.example file into a new file named .env and set it's values based on your environment's configuration

# Install dependencies
```
npm install
```

# Migrate migration files
```
npm run migrate
```

# To seed database
```
npm run seed
```

# To run on local
```
npm run serve
```

# To run testing
```
npm run test
```
