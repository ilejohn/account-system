const Transaction = require("../models/transaction");
const Account = require("../models/account");
const validateEmail = require("../validator/validateEmail");

let TransactionController = {

  all: async (request, response) => {
    try {
      const transactions = await Transaction.all();

      response.status(200).json({
        status: 'success',
        message: 'All transactions retrieved successfully.',
        data: transactions
    });
   
    } catch (error) {
      response.json({status: 'error', message: error.message});
    }
  },
  
  fundAccount: async (request, response) => {
    const amount = request.body.amount;
    const user = request.user;

    if (!amount) {
      return response.status(422).json({status: 'error', message: 'Amount required'});
    }

    if(typeof amount !== 'number' || amount < 0) {
      return response.status(422).json({status: 'error', message: 'Invalid amount supplied. Amount must be a positive number'});
    }

    try {
      const account = await Account.fund(user.id, amount);

      response.status(200).json({
        status: 'success',
        message: 'Account funded successfully.',
        data: account
      });
    } catch (error) {
      response.json({status: 'error', message: `${error.message}. failed to fund account`});
    }
  },

  showAuthUserTransactions: async (request, response) => {
    const user = request.user;

    try {

      const account = await Account.get({user_id: user.id});
      if (!account) {
        return response.status(422).json({status: 'error', message: 'You have no account.'});
      }
      const transactions = await Transaction.getAuthTransactions(account.id);

      response.status(200).json({
        status: 'success',
        message: 'Auth user transactions retrieved successfully.',
        data: transactions
    });
   
    } catch (error) {
      response.json({status: 'error', message: `${error.message}, failed to retrieve auth user transactions`});
    }
  },

  transfer: async (request, response) => {
    const amount = request.body.amount;
    const recepientEmail = request.body.email;
    const user = request.user;

    if (!amount || !recepientEmail) {
      return response.status(422).json({status: 'error', message: 'Amount and recepient email required'});
    }

    if(typeof amount !== 'number' || amount < 0) {
      return response.status(422).json({status: 'error', message: 'Invalid amount supplied. Amount must be a positive number'});
    }

    if(!validateEmail(recepientEmail)) {
      return response.status(422).json({status: 'error', message: 'Invalid Recepient Email'});
    }

    if(user.email === recepientEmail) {
      return response.status(422).json({status: 'error', message: 'Cannot transfer to self'});
    }

    try {
      const account = await Account.transfer(user.id, user.name, amount, recepientEmail);

      response.status(200).json({
        status: 'success',
        message: 'Transfer successful.',
        data: account
      });
    } catch (error) {
      response.json({status: 'error', message: `${error.message}. failed to transfer`});
    }
  },

  withdraw: async (request, response) => {
    const amount = request.body.amount;
    const user = request.user;

    if (!amount) {
      return response.status(422).json({status: 'error', message: 'Amount required'});
    }

    if(typeof amount !== 'number' || amount < 0) {
      return response.status(422).json({status: 'error', message: 'Invalid amount supplied. Amount must be a positive number'});
    }

    try {
      const account = await Account.withdraw(user.id, amount);

      response.status(200).json({
        status: 'success',
        message: 'Withdrawal successful.',
        data: account
      });
    } catch (error) {
      response.json({status: 'error', message: `${error.message}. failed to withdraw`});
    }
  },
};

module.exports = TransactionController;
