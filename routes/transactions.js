let express = require("express");
let router = express.Router();

let { authenticateUser } = require("../middlewares");
let TransactionController = require("../controllers/TransactionController");

router.use(authenticateUser)
router.get("/", TransactionController.all);
router.post("/", TransactionController.create);
router.get("/:id", TransactionController.show);
router.put("/:id", TransactionController.update);
router.delete("/:id", TransactionController.delete);

module.exports = router;