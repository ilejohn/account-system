let express = require("express");
let router = express.Router();

const { authenticateUser } = require("../middlewares");
const {create, all, showAuthUser} = require("../controllers/UserController");
const validateCreateUser = require("../validations/users/validateCreateUser");

router.post("/", validateCreateUser, create);
router.use(authenticateUser);
router.get("/", all);
router.get("/auth", showAuthUser);

module.exports = router;
