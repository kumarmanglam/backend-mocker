const mongoDatatypeConfig = {
  string: String,
  number: Number,
  boolean: Boolean,
  date: Date,
};

/**
 * Generates a schema definition for MongoDB based on the provided model configuration.
 * @param {Object} model - The model configuration specifying data types for each field.
 * @returns {Object} - The schema definition compatible with MongoDB Mongoose schema.
 */
function generateSchemaDefinition(model) {
  const schemaDefn = {};
  for (let i in model) {
    schemaDefn[i] = mongoDatatypeConfig[model[i]];
  }
  return schemaDefn;
}

module.exports = generateSchemaDefinition;
