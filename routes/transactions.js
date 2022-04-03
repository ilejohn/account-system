let express = require("express");
let router = express.Router();

const { authenticateUser } = require("../middlewares");
const validateFundAccount = require("../validations/transactions/validateFundAccount");
const validateShowAuthUserTransactions = require("../validations/transactions/validateShowAuthUserTransactions");
const validateTransfer = require("../validations/transactions/validateTransfer");
const validateWithdraw = require("../validations/transactions/validateWithdraw");
const {all, fundAccount, transfer, withdraw, showAuthUserTransactions} = require("../controllers/TransactionController");

router.use(authenticateUser)
router.get("/", all);
router.post("/fund-account", validateFundAccount, fundAccount);
router.post("/transfer", validateTransfer, transfer);
router.post("/withdraw", validateWithdraw, withdraw);
router.get("/auth", validateShowAuthUserTransactions, showAuthUserTransactions);

module.exports = router;
