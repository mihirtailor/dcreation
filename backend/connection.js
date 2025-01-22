const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root2024",
  database: process.env.DB_NAME || "dcreation_db",
});

connection.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected!!!!");
});

module.exports = connection;
