const db = require("../config/db");

exports.createTeam = (req, res) => {
  const { name, role } = req.body;

  db.run(
    "INSERT INTO teams(name,role) VALUES(?,?)",
    [name, role],
    function (err) {
      if (err) return res.status(400).json(err);

      res.json({ team_id: this.lastID });
    },
  );
};

exports.joinTeam = (req, res) => {
  const { team_id } = req.body;

  db.run(
    "INSERT INTO team_members(user_id,team_id) VALUES(?,?)",
    [req.user.id, team_id],
    (err) => {
      if (err) return res.status(400).json(err);

      res.json({ message: "Joined team" });
    },
  );
};
