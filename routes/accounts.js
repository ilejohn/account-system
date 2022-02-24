let express = require("express");
let router = express.Router();

let { authenticateUser } = require("../middlewares");
let AccountController = require("../controllers/AccountController");

router.use(authenticateUser)
router.get("/", AccountController.all);
router.post("/", AccountController.create);
router.get("/:id", AccountController.show);
router.put("/:id", AccountController.update);
router.delete("/:id", AccountController.delete);

module.exports = router;