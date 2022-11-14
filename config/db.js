const mysql = require("mysql");
//The MySQL administrator (root) has no password.
require('dotenv').config()
const conexion = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  port: process.env.DBPORT
});
console.log(process.env)
const db = () => {
  conexion.connect((error) => {
    if (error) {
      console.log("Problemas de conexion con mysql");
    } else {
      console.log("Conexión con la base de datos correcta");
    }
  });
};

module.exports = { db, conexion };
