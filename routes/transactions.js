let express = require("express");
let router = express.Router();

let { authenticateUser } = require("../middlewares");
let TransactionController = require("../controllers/TransactionController");

router.use(authenticateUser)
router.get("/", TransactionController.all);
router.post("/fund-account", TransactionController.fundAccount);
router.post("/transfer", TransactionController.transfer);
router.post("/withdraw", TransactionController.withdraw);
router.get("/auth", TransactionController.showAuthUserTransactions);

module.exports = router;