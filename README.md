# Mock Backend Creator

Mock Backend Creator is a Node.js package that allows you to quickly create mock backend servers for various databases such as MongoDB, MySQL, and PostgreSQL. It provides a simple interface to define models and expose CRUD (Create, Read, Update, Delete) APIs.

## Installation

To install Mock Backend Creator, use npm:

```cmd
npm init -y
npm install mock-backend-creator
```

## Features :

- Easy Setup: Get your CRUD API up and running in the blink of an eye.
- Customizable Schema: Shape your data just the way you want it. No more rigid structures!
- Automatic ID Generation: Sit back and relax while we handle the IDs for you.
- Robust Error Handling: Friendly error messages to guide you through the dark tunnels of debugging.
- Built-in Counters: Counting made simple. Manage your data effortlessly.
- Custom Port: Create a custom port to run the backend on. If not specified, the port will be automatically set to 3000.

## Usage

Here's how you can use Mock Backend Creator to create mock backend servers for different databases:

```javascript
const createMock = require("mock-backend-creator");

// Define the port on which the mock backend server will listen
const port = 5000;

// Define the schema for the model
const schemaDefinition = {
  name: "string",
  age: "number",
};

// Define the MongoDB connection URL
const mongoURL = "mongodb://0.0.0.0:27017/students";

// Create a mock backend server for MongoDB
const app = createMock(port, "student", schemaDefinition, mongoURL);
```

Replace the `schemaDefinition` and `mongoURL` variables with your desired schema and database connection URL respectively.

## Supported Databases

- MongoDB
- MySQL
- PostgreSQL

## API

The mock backend server exposes the following CRUD APIs:

- **Create**: POST `/api/model`
- **Read all**: GET `/api/model`
- **Read one**: GET `/api/model/:id`
- **Update**: PUT `/api/model/:id`
- **Delete**: DELETE `/api/model/:id`

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Let's Connect!

Feel free to connect with me through:

- **Email:** kumarmanglamemail@gmail.com
- **LinkedIn:** [Kumar Manglam](https://www.linkedin.com/in/manglamkumar/)
