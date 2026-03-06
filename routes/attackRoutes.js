const router = require("express").Router();
const attackController = require("../controllers/attackController");
const logger = require("../middleware/logger");

/*
SQL Injection endpoint
*/
router.post("/sql-login", logger, attackController.sqlInjectionLogin);

/*
XSS endpoint
*/
router.post("/comment", logger, attackController.xssComment);

/*
Auth bypass endpoint
*/
router.get("/admin-panel", logger, attackController.authBypassAdmin);

module.exports = router;
