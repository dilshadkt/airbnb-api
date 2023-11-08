const router = require("express").Router();
const { Login, Sign } = require("../controllers/UserController");

router.post("/login", Login);
router.post("/signin", Sign);
module.exports = router;
