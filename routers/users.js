const router = require("express").Router();
const {
  Login,
  Sign,
  CurrentUser,
  GetAllUser,
} = require("../controllers/UserController");
const auth = require("../middlewares/VerifyToken");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
router.post("/login", asyncMiddleware(Login));
router.post("/signin", asyncMiddleware(Sign));
router.post("/me", auth, CurrentUser);
router.get("/allUser", asyncMiddleware(GetAllUser));

module.exports = router;
