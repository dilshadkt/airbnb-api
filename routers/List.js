const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const {
  geAlltList,
  postList,
  getAllListUser,
  DeletList,
  UpdateList,
} = require("../controllers/ListController");

router.patch("/:propertyId", asyncMiddleware(UpdateList));
router.get("/", geAlltList);
router.post("/become-a-host", upload.array("photos", 6), postList);
router.get("/manageList/:userId", getAllListUser);
router.delete("/:propertyId", DeletList);
module.exports = router;
