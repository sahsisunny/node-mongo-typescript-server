# NodeJS TypeScript Express Mongoose Starter

This is a starter template for a Node.js backend using TypeScript, Express, Mongoose, Prettier, ESLint, and Jest.

## Tech Stack

-  **Node.js**: JavaScript runtime for server-side development.
-  **TypeScript**: Typed superset of JavaScript.
-  **Express**: Web application framework for Node.js.
-  **Jest**: Testing framework.
-  **Yarn**: Package manager.
-  **MongoDB**: NoSQL database.
-  **Prettier**: Code formatter.
-  **ESLint**: Linting utility for code quality.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sahsisunny/node-mongo-typescript-server
   ```

2. **Install Dependencies:**

   ```bash
   yarn
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the root of the project and add the following variables:

   ```plaintext
   PORT=<your-port>
   MONGO_URI=<your-mongo-uri-with-username-and-password>
   ```

4. **Run the Application:**

   ```bash
   yarn start
   ```

5. **Run Tests:**
   ```bash
   yarn test
   ```

## Code Formatting and Linting

-  **Prettier**: Code is automatically formatted using Prettier.

   ```bash
   yarn format:fix
   ```

-  **ESLint**: Code is linted using ESLint.
   ```bash
     yarn lint:fix
   ```

## Project Structure

```plaintext
node-mongo-typescript-server
│   .env
│   .eslintrc.js
│   .gitignore
│   .prettierignore
│   .prettierrc
│   jest.config.js
│   nodemon.json
│   package.json
│   README.md
│   tsconfig.json
│   yarn.lock
│
├───src
│   ├───controller
│   ├───middlewares
│   ├───models
│   ├───routes
│   ├───services
│   ├───types
│   ├───utils
│   └───index.ts
│
├───tests
|   ├───unit
│   └───integration
```

## Environment Variables

-  **PORT**: Port on which the server will run (default is 3000).
-  **MONGO_URI**: MongoDB connection URI.
