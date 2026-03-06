const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/teamController");

router.post("/create", auth, controller.createTeam);
router.post("/join", auth, controller.joinTeam);

module.exports = router;
