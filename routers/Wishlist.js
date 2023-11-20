const router = require("express").Router();
const {
  addwhishList,
  GetWhishList,
  DeleteWhishList,
} = require("../controllers/WishList");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");

router.post("/:userId", asyncMiddleware(addwhishList));
router.get("/:userId", asyncMiddleware(GetWhishList));
router.delete("/:userId", asyncMiddleware(DeleteWhishList));
module.exports = router;
