var express = require("express");
const db = require("../config/db");
const distancia = require("../helpers/distancia");
var router = express.Router();

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  db.conexion.query(
    "select * from orders where order_id=? LIMIT 1",
    [id],
    (err, data) => {
      if (err) res.status(400).send(err);
      res.send(data);
      res.end();
    }
  );
});
router.get("/", async function (req, res, next) {
  db.conexion.query("select * from orders", (err, data) => {
    if (err) res.status(400).send(err);
    res.send(data);
    res.end();
  });
});

router.post("/", async function (req, res, next) {
  const { rest_id, user_long, user_lat } = req.body;
  db.conexion.query("select * from rider", (err, riders) => {
    if (err) res.status(400).send(err);
    db.conexion.query(
      "select * from restaurant where rest_id=?",
      [rest_id],
      (err, restaurante) => {
        console.log(restaurante);
        if (err) res.status(400).send(err);
        const ridersDisponibles = riders
          .filter((rider) => {
            const d = distancia(
              {
                longitud: restaurante[0].rest_long,
                latitud: restaurante[0].rest_lat,
              },
              {
                longitud: rider.rider_long,
                latitud: rider.rider_lat,
              }
            );
            rider.d = d;
            return d <= restaurante[0].rest_delivery_radius * 1000;
          })
          .sort((a, b) => {
            if (a.d >= b.d) return 1;
            return -1;
          });
        const D = distancia(
          {
            longitud: restaurante[0].rest_long,
            latitud: restaurante[0].rest_lat,
          },
          {
            longitud: user_long,
            latitud: user_lat,
          }
        );
        const result = ridersDisponibles.map((rider) => {
          rider.d += D;
          return rider;
        });
        res.send(result);
        res.end();
      }
    );
  });
});

module.exports = router;
