const mysql = require("mysql");

//The MySQL administrator (root) has no password.
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_delivery_api",
});

const db = () => {
  conexion.connect((error) => {
    if (error) {
      console.log("Problemas de conexion con mysql");
    } else {
      console.log("Conexión con la base de datos correcta");
    }
  });
};

module.exports = {db, conexion};
