let express = require("express");
let router = express.Router();

let { authenticateUser } = require("../middlewares");
let TransactionController = require("../controllers/TransactionController");

router.use(authenticateUser)
router.get("/", TransactionController.all);
router.post("/", TransactionController.create);
router.get("/:id", TransactionController.show);

module.exports = router;