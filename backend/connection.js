const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Keep your existing MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Add Sequelize instance using the same credentials
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3307,
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
const Portfolio = require("./models/portfolio")(sequelize);
const PortfolioCategory = require("./models/portfolioCategory")(sequelize);

// Test Sequelize connection
sequelize
    .authenticate()
    .then(() => console.log("Sequelize Connected!!!!"))
    .catch((error) => console.log(error));

module.exports = {
    connection,
    sequelize,
    Contact,
    Service,
    Category,
    Portfolio,
    PortfolioCategory
};
