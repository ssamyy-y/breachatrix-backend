const router = require("express").Router();
const db = require("../config/db");

/*
VIEW ATTACK LOGS
*/
router.get("/logs", (req, res) => {
  db.all("SELECT * FROM attacks ORDER BY timestamp DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

module.exports = router;
