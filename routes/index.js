const express = require('express');
const router = express.Router();
const { appName } = require("../config");

const accountRouter = require ('./accounts');
const transactionsRouter = require ('./transactions');
const userRouter = require ('./users');

router.use('/accounts', accountRouter);
router.use('/transactions', transactionsRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
  res.send(`${appName} is Online!`);
});

module.exports = router;
