const express = require("express");
const mongoose = require("mongoose");
const generateSchemaDefinition = require("./config/mongoTypeConfig");

/**
 * Creates a mock backend server for MongoDB based on the provided connection URL, port, model name, and schema definition.
 * @param {Number} port - The port on which the mock backend server will listen.
 * @param {String} modelName - The name of the model for which the mock backend is created.
 * @param {Object} schemaDefn - The schema definition for the model.
 * @param {String} dbUrl - The connection URL for the MongoDB database.
 * @returns {Object} - The Express application instance representing the mock backend server.
 */
function mongoBackend(port, modelName, schemaDefn, dbUrl) {
  // create express app
  const app = express();

  // Middleware to parse json
  app.use(express.json());

  // connnect to dbUrl
  mongoose.connect(dbUrl);
  const db = mongoose.connection;

  const sch = generateSchemaDefinition(schemaDefn);

  // create a schema based on provided defination
  const schema = new mongoose.Schema(sch);

  const Model = mongoose.model("Model", schema);

  // CRUD APIs

  // Create
  app.post("/api/model", async (req, res) => {
    try {
      const newItem = new Model(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Read all
  app.get("/api/model", async (req, res) => {
    try {
      const items = await Model.find();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Read one
  app.get("/api/model/:id", async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update
  app.put("/api/model/:id", async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete
  app.delete("/api/model/:id", async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json({ message: "Item deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Start server
  app.listen(port);

  return app;
}

module.exports = mongoBackend;
