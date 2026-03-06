const bcrypt = require("bcrypt");
const db = require("../config/db");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users(username,password,role) VALUES(?,?,?)",
    [username, hash, "student"],
    function (err) {
      if (err) return res.status(400).json(err);
      res.json({ message: "User registered" });
    },
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, user) => {
      if (!user) return res.status(401).json({ error: "User not found" });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) return res.status(401).json({ error: "Wrong password" });

      const token = generateToken({ id: user.id, role: user.role });

      res.json({ token });
    },
  );
};
