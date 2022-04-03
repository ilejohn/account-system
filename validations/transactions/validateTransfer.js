const User = require("../../models/user");
const Account = require("../../models/account");
const validateEmail = require("../../validator/validateEmail");

module.exports = async (request, response, next) => {
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

    const account = await Account.get({user_id: user.id});

    if(!account) {
      return response.status(400).json({status: 'error', message: 'You do not have an account, please create one and fund it'});
    }

    if (account.available_balance < amount) {
      return response.status(400).json({status: 'error', message: 'Your balance is insufficient for this transfer, please fund your account and try again'});
    }

    const recepient = await User.getUserByEmail(recepientEmail);

    if (!recepient) {
      return response.status(400).json({status: 'error', message: 'Recepient is not registered'});
    }

    const recepientAccount = await Account.get({user_id: recepient.id});

    if(!recepientAccount) {
      return response.status(400).json({status: 'error', message: 'Recepient does not have an account'});
    }

    next();
}
  