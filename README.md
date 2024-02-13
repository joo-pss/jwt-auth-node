# JWT Auth with Node

## Description
This project is an API built in Node.js and TypeScript, implementing a JWT authentication system. It provides routes for account creation and authentication, as well as private routes for updating, deleting, and retrieving user account information. PostgreSQL is used as the database, with Prisma as the ORM. Bcryptjs is utilized for hashing account passwords, ensuring the security of stored information, and unit tests are conducted using Vitest.

## Technologies Used

- TypeScript
- Express
- JWT
- Docker
- PostgreSQL
- Prisma
- Vitest

## Endpoints 

- POST /sessions
- POST /accounts
- GET /accounts
- PUT /accounts
- DELETE /accounts