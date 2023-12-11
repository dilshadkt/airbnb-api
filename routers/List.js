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
  filteredList,
  customeFilter,
} = require("../controllers/ListController");

router.patch(
  "/:propertyId",
  upload.array("photos", 6),
  asyncMiddleware(UpdateList)
);
router.get("/", asyncMiddleware(geAlltList));
router.post(
  "/become-a-host",
  upload.array("photos", 6),
  asyncMiddleware(postList)
);
router.get("/data", asyncMiddleware(filteredList));
router.get("/filtered", asyncMiddleware(customeFilter));
router.get("/manageList/:userId", asyncMiddleware(getAllListUser));
router.delete("/:propertyId", asyncMiddleware(DeletList));

module.exports = router;
