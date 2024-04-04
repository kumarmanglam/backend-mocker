const { DataTypes } = require("sequelize");

const sequelDatatypeConfig = {
  string: DataTypes.STRING,
  number: DataTypes.BIGINT,
  boolean: DataTypes.BOOLEAN,
  date: DataTypes.DATE,
};

/**
 * Generates a schema definition for Sequelized based on the provided model configuration
 * @param {Object} model - The model configuration specifying data types for each field
 * @returns The schema definition compatible with Sequelize Mysql and Postgres schema
 */
function generateSchemaDefinition(model) {
  const schemaDefn = {};
  for (let i in model) {
    schemaDefn[i] = sequelDatatypeConfig[model[i]];
  }
  return schemaDefn;
}

module.exports = generateSchemaDefinition;
