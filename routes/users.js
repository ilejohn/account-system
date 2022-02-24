let express = require("express");
let router = express.Router();

let { authenticateUser } = require("../middlewares");
let UserController = require("../controllers/UserController");

router.use(authenticateUser)
router.get("/", UserController.all);
router.post("/", UserController.create);
router.get("/:id", UserController.show);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
