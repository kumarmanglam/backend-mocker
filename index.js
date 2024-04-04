const mongoBackend = require("./src/mongoMocker");
const mysqlBackend = require("./src/mysqlSequelMocker");
const postgreDbBackend = require("./src/postgreSequelMocker");

/**
 * Parses a connection URL and returns a connection object containing relevant details.
 * @param {String} connectionURL - The connection URL to be parsed.
 * @returns {Object} - The connection object containing ORM type, database dialect, username, password, port, and database name.
 * @throws {Error} - Throws an error if the connection URL is unsupported.
 */
function parseConnectionURL(connectionURL) {
  if (
    connectionURL.startsWith("mongodb://") ||
    connectionURL.startsWith("mongodb+srv://")
  ) {
    return {
      orm: "mongoose",
      database: connectionURL.split("/").pop(),
    };
  } else if (connectionURL.startsWith("mysql://")) {
    const [_, _t, credentials, host, database] = connectionURL.split("/");
    const [username, password] = credentials.split(":");
    const [hostname, seq_port] = host.split(":");
    return {
      orm: "sequelize",
      dialect: "mysql",
      username,
      password,
      seq_port,
      database,
    };
  } else if (connectionURL.startsWith("postgresql://")) {
    const [_, _t, credentials, host, database] = connectionURL.split("/");
    const [username, password] = credentials.split(":");
    const [hostname, seq_port] = host.split(":");
    return {
      orm: "sequelize",
      dialect: "postgresql",
      username,
      password,
      seq_port,
      database,
    };
  } else {
    throw new Error("Unsupported connection URL");
  }
}

/**
 * Creates a mock backend based on the provided connection URL, port, model name, and schema definition.
 * @param {Number} port - The port on which the mock backend server will listen.
 * @param {String} modelName - The name of the model for which the mock backend is created.
 * @param {Object} schemaDefn - The schema definition for the model.
 * @param {String} dbUrl - The connection URL for the database.
 */
function createMockBackend(port, modelName, schemaDefn, dbUrl) {
  const db = parseConnectionURL(dbUrl);
  if (dbUrl.startsWith("mongodb://") || dbUrl.startsWith("mongodb+srv://")) {
    mongoBackend(port, modelName, schemaDefn, dbUrl);
  } else if (dbUrl.startsWith("mysql://")) {
    mysqlBackend(
      db.orm,
      db.dialect,
      db.username,
      db.password,
      db.seq_port,
      db.database,
      port,
      modelName,
      schemaDefn,
      dbUrl
    );
  } else if (dbUrl.startsWith("postgresql://")) {
    postgreDbBackend(
      db.orm,
      db.dialect,
      db.username,
      db.password,
      db.seq_port,
      db.database,
      port,
      modelName,
      schemaDefn,
      dbUrl
    );
  }
}

module.exports = createMockBackend;
