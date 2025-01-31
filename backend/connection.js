const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Keep your existing MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root2024",
    database: process.env.DB_NAME || "dcreation_db",
});

// Add Sequelize instance using the same credentials
const sequelize = new Sequelize(
    process.env.DB_NAME || "dcreation_db",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root2024",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
    }
);

connection.connect((error) => {
    if (error) console.log(error);
    else console.log("MySQL Connected!!!!");
});

// Initialize models
const Contact = require("./models/contact")(sequelize);
const Service = require("./models/service")(sequelize);
const Category = require("./models/category")(sequelize);

// Test Sequelize connection
sequelize
    .authenticate()
    .then(() => console.log("Sequelize Connected!!!!"))
    .catch((error) => console.log(error));

module.exports = { connection, sequelize, Contact, Service, Category };
