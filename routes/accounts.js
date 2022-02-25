let express = require("express");
let router = express.Router();

let { authenticateUser } = require("../middlewares");
let AccountController = require("../controllers/AccountController");

router.use(authenticateUser)
router.get("/", AccountController.all);
router.post("/", AccountController.create);
router.get("/auth", AccountController.showAuthUserAccount);

module.exports = router;