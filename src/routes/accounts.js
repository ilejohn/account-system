let express = require("express");
let router = express.Router();

const { authenticateUser } = require("../middlewares");
const validateCreateAccount = require("../validations/accounts/validateCreateAccount");
const {all, create, showAuthUserAccount} = require("../controllers/AccountController");

router.use(authenticateUser)
router.get("/", all);
router.post("/", validateCreateAccount, create);
router.get("/auth", showAuthUserAccount);

module.exports = router;
