const express = require('express');
const router = express.Router();
const { appName } = require("../../config");

const authenticationRouter = require ('./authentication');
const accountRouter = require ('./accounts');
const transactionsRouter = require ('./transactions');
const userRouter = require ('./users');

router.use('/auth', authenticationRouter);
router.use('/accounts', accountRouter);
router.use('/transactions', transactionsRouter);
router.use('/users', userRouter);

router.get('/', (request, respond) => {
  respond.send(`${appName} is Online!`);
});

module.exports = router;
