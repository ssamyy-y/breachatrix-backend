const db = require("../config/db");

exports.patch = (req, res) => {
  const { vuln_id } = req.body;

  db.run(
    "UPDATE vulnerabilities SET patched=1 WHERE id=?",
    [vuln_id],
    (err) => {
      if (err) return res.status(400).json(err);

      res.json({ message: "Patched" });
    },
  );
};
