const router = require("express").Router();
const postList = require("../controllers/UserController");

router.post("/listings", postList);
module.exports = router;
