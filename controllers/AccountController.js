const Account = require("../models/account");

let AccountController = {

  all: async (request, response) => {
    try {
      const accounts = await Account.all();

      response.status(200).json({
        status: 'success',
        message: 'All Accounts retrieved successfully.',
        data: accounts
      });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: "failed to retrieve accounts"});
    }
  },
  
  create: async (request, response) => {
    const user = request.user;

    try {
      
      const account = await Account.create({user_id: user.id});

      response.status(201).json({
        status: 'success',
        message: 'Account created successfully.',
        data: account
      });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: `${error.message}.failed to create account`});
    }
  },

  showAuthUserAccount: async (request, response) => {
    const user = request.user;

    try {

      const account = await Account.get({user_id: user.id});

      response.status(200).json({
        status: 'success',
        message: 'Auth User Account retrieved successfully.',
        data: account ? account : null
      });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: error.message});
    }
  },

};

module.exports = AccountController;
