const router = require("express").Router();
const { geAlltList } = require("../controllers/ListController");

router.get("/", geAlltList);

module.exports = router;
