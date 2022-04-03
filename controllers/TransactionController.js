const Transaction = require("../models/transaction");
const Account = require("../models/account");
const validateEmail = require("../validator/validateEmail");

let TransactionController = {

   /**
     * Retrieve all transactions
     *
     */
  all: async (request, response) => {
    try {
      const transactions = await Transaction.all();

      response.status(200).json({
        status: 'success',
        message: 'All transactions retrieved successfully.',
        data: transactions
    });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: error.message});
    }
  },

   /**
     * Fund account
     *
     */
  
  fundAccount: async (request, response) => {

    try {
      const account = await Account.fund(request.user.id, request.body.amount);

      response.status(200).json({
        status: 'success',
        message: 'Account funded successfully.',
        data: account
      });
    } catch (error) {
      response.status(400).json({status: 'error', message: `${error.message}. failed to fund account`});
    }
  },

   /**
     * Show authenticated user transactions
     *
     */

  showAuthUserTransactions: async (request, response) => {
    try {

      const transactions = await Transaction.getAuthTransactions(request.userAccount.id);

      response.status(200).json({
        status: 'success',
        message: 'Auth user transactions retrieved successfully.',
        data: transactions
    });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: `${error.message}, failed to retrieve auth user transactions`});
    }
  },

   /**
     * Transfer to another account
     *
     */

  transfer: async (request, response) => {
    const amount = request.body.amount;
    const recepientEmail = request.body.email;
    const user = request.user;

    try {
      const account = await Account.transfer(user.id, user.name, amount, recepientEmail);

      response.status(200).json({
        status: 'success',
        message: 'Transfer successful.',
        data: account
      });
    } catch (error) {
      response.status(400).json({status: 'error', message: `${error.message}. failed to transfer`});
    }
  },

   /**
     * Withdraw from account
     *
     */

  withdraw: async (request, response) => {
    const amount = request.body.amount;
    const user = request.user;
    
    try {
      const account = await Account.withdraw(user.id, amount);

      response.status(200).json({
        status: 'success',
        message: 'Withdrawal successful.',
        data: account
      });
    } catch (error) {
      response.status(400).json({status: 'error', message: `${error.message}. failed to withdraw`});
    }
  },
};

module.exports = TransactionController;
