const Account = require("../../models/account");

module.exports = async (request, response, next) => {
    const account = await Account.get({user_id: request.user.id})

    if (account) {
      return response.status(403).json({status: 'error', message: 'You already have an account.'});
    }

    next();
  }
  