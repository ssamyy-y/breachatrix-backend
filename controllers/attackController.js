const db = require("../config/db");

/*
SQL Injection endpoint
*/
exports.sqlInjectionLogin = (req, res) => {
  const { username, password } = req.body;

  const query = `
 SELECT * FROM users WHERE username='${username}' AND password='${password}'
 `;

  db.get(query, [], (err, user) => {
    if (user) {
      res.json({ message: "Login success" });
    } else {
      res.json({ message: "Login failed" });
    }
  });
};

/*
XSS VULNERABILITY
*/
exports.xssComment = (req, res) => {
  const { comment } = req.body;

  res.send(`
 <html>
  <body>
   <h2>Comment Section</h2>
   <p>${comment}</p>
  </body>
 </html>
 `);
};

/*
AUTHENTICATION BYPASS
*/
exports.authBypassAdmin = (req, res) => {
  if (req.query.admin === "true") {
    res.json({
      message: "Welcome Admin",
      secret: "Top secret admin data",
    });
  } else {
    res.status(403).json({
      error: "Access denied",
    });
  }
};
