var express = require("express");
const db = require("../config/db");
var router = express.Router();

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  db.conexion.query(
    "select * from rider where rider_id=? LIMIT 1",
    [id],
    (err, data) => {
      if (err) res.status(400).send(err);
      res.send(data);
      res.end();
    }
  );
});
router.get("/", async function (req, res, next) {
  db.conexion.query("select * from rider", (err, data) => {
    if (err) res.status(400).send(err);
    res.send(data);
    res.end();
  });
});

router.post("/:id", async function (req, res, next) {
  const { id } = req.params;
  const query = req.body;
  db.conexion.query(
    "update rider set ? where rider_id=?",
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
  db.conexion.query(
    "insert into rider (??) values (?)",
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
    "delete from rider where rider_id=?",
    [id],
    (err, data) => {
      if (err) res.status(400).send(err);
      res.send(data);
      res.end();
    }
  );
});

module.exports = router;
