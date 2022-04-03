const Account = require("../../models/account");

module.exports = async (request, response, next) => {
    const amount = request.body.amount;

    if (!amount) {
      return response.status(422).json({status: 'error', message: 'Amount required'});
    }
  
    if(typeof amount !== 'number' || amount < 0) {
      return response.status(422).json({status: 'error', message: 'Invalid amount supplied. Amount must be a positive number'});
    }

    const account = await Account.get({user_id: request.user.id});

    if(!account) {
      return response.status(400).json({status: 'error', message: 'You do not have an account, please create one'});
    }

    next();
  }
  