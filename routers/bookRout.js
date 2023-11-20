const router = require("express").Router();
const { postReserve, GetAllReserve } = require("../controllers/BookControler");
const asyncMiddleware = require("../middlewares/AsyncMiddleware");
router.post("/stay/:userId", asyncMiddleware(postReserve));
router.get("/stay/:userId", asyncMiddleware(GetAllReserve));

module.exports = router;
