var express = require("express");
const db = require("../config/db");
var router = express.Router();

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  await db.conexion.query(
    "select * from restaurant where rest_id=? LIMIT 1",
    [id],
    (err, data) => {
      if (err) res.status(400).send(data);
      res.send(data);
      res.end();
    }
  );
});
router.get("/", async function (req, res, next) {
  await db.conexion.query(
    "select * from restaurant",
    (err, data) => {
      if (err) res.status(400).send(data);
      res.send(data);
      res.end();
    }
  );
});

router.post("/:id", async function (req, res, next) {
  const { id } = req.params;
  const query = req.body;
  await db.conexion.query(
    "update restaurant set ? where rest_id=?",
    [query, id],
    (err, data) => {
      if (err) res.status(400).send(err);
      res.send(data);
      res.end();
    }
  );
});
router.post("/", async function (req, res, next) {
  const query = req.body;
  await db.conexion.query(
    "insert into restaurant (??) values (?)",
    [Object.keys(query), Object.values(query)],
    (err, data) => {
      if (err) res.status(400).send(err);
      res.send(data);
      res.end();
    }
  );
});
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  db.conexion.query(
    "delete from restaurant where rest_id=?",
    [id],
    (err, data) => {
      if (err) res.status(400).send(err);
      res.send(data);
      res.end();
    }
  );
});

module.exports = router;
