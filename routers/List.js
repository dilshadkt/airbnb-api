const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { geAlltList, postList } = require("../controllers/ListController");

router.get("/", geAlltList);
router.post("/become-a-host", upload.array("photos", 6), postList);

module.exports = router;
