let express = require("express");
let router = express.Router();

let { authenticateUser } = require("../middlewares");
let UserController = require("../controllers/UserController");

router.post("/", UserController.create);
router.use(authenticateUser);
router.get("/", UserController.all);
router.get("/auth", UserController.showAuthUser);

module.exports = router;
