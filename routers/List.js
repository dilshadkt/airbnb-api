const router = require("express").Router();
const getProperties = require("../controllers/ListController");

router.get("/", getProperties);

module.exports = router;
