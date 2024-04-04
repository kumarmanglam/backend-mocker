const express = require("express");
const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const generateSchemaDefinition = require("./config/sequelDatatypeConfig");

/**
 * Creates a mock backend server for MySQL or PostgreSQL based on the provided connection URL, port, model name, and schema definition.
 * @param {String} orm - The Object-Relational Mapping (ORM) used (sequelize).
 * @param {String} dialect - The dialect of the database (mysql or postgresql).
 * @param {String} username - The username for database authentication.
 * @param {String} password - The password for database authentication.
 * @param {Number} seq_port - The port for database connection.
 * @param {String} database - The name of the database.
 * @param {Number} port - The port on which the mock backend server will listen.
 * @param {String} modelName - The name of the model for which the mock backend is created.
 * @param {Object} schemaDefn - The schema definition for the model.
 * @param {String} connectionURL - The connection URL for the database.
 * @returns {Object} - The Express application instance representing the mock backend server.
 */
function mysqlBackend(
  orm,
  dialect,
  username,
  password,
  seq_port,
  database,
  port,
  modelName,
  schemaDefn,
  connectionURL
) {
  // Create Sequelize instance
  const sequelize = new Sequelize(database, username, password, {
    dialect: dialect,
  });

  const schema = generateSchemaDefinition(schemaDefn);

  // Define model based on provided schema definition
  const Model = sequelize.define(modelName, schema, {
    timestamps: false,
  });

  // Create Express app
  const app = express();
  app.use(express.json());

  // CRUD APIs

  // Create
  app.post("/api/model", async (req, res) => {
    try {
      const newItem = await Model.create(req.body);
      res.status(201).json(newItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Read all
  app.get("/api/model", async (req, res) => {
    try {
      const items = await Model.findAll();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Read one
  app.get("/api/model/:id", async (req, res) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update
  app.put("/api/model/:id", async (req, res) => {
    try {
      const [updatedRows] = await Model.update(req.body, {
        where: { id: req.params.id },
      });
      if (updatedRows === 0)
        return res.status(404).json({ message: "Item not found" });
      const updatedItem = await Model.findByPk(req.params.id);
      res.status(200).json(updatedItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete
  app.delete("/api/model/:id", async (req, res) => {
    try {
      const deletedRows = await Model.destroy({
        where: { id: req.params.id },
      });
      if (deletedRows === 0)
        return res.status(404).json({ message: "Item not found" });
      res.status(200).json({ message: "Item deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Start server
  sequelize.sync().then(() => {
    app.listen(port);
  });
  return app;
}

module.exports = mysqlBackend;
