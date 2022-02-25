const Transaction = require("../models/transaction");
const Account = require("../models/account");

let TransactionController = {

  all: (request, response) => {

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

  show: (request, response) => {

  },

  update: (request, response) => {

  },

  transfer: (request, response) => {

  },

  withdraw: (request, response) => {

  },
};

module.exports = TransactionController;
