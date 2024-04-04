// Import the createMock function from the mocker module
const createMock = require("..index");

// Define the port on which the mock backend server will listen
const port = 5000;

// Define the schema for the model
const schemaDefinition = {
  name: "string",
  age: "number",
};

// Define the MongoDB connection URL
const mongoURL = "mongodb://0.0.0.0:27017/students";

// Create a mock backend server for MongoDB using the createMock function
const app = createMock(port, "teacher", schemaDefinition, mongoURL);

// Example usage for MySQL database
// const mysqlUrl = "mysql://root:password@localhost:3306/employeedb";
// const app = createMock(port, "teacher", schemaDefinition, mysqlUrl);

// Example usage for PostgreSQL database
// const url = "postgresql://username:password@localhost:5432/employeedb";
// const app = createMock(port, "manager", schemaDefinition, url);

// Uncomment and modify the above lines to use the package for different databases
