const Account = require("../models/account");

let AccountController = {

   /**
     * Retrieve all accounts
     *
     */
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


   /**
     * Create an account for authenticated user
     *
     */
  create: async (request, response) => {
    try {
      
      const account = await Account.create({user_id: request.user.id});

      response.status(201).json({
        status: 'success',
        message: 'Account created successfully.',
        data: account
      });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: `${error.message}.failed to create account`});
    }
  },

   /**
     * Show authenticated user account
     *
     */

  showAuthUserAccount: async (request, response) => {
    try {

      const account = await Account.get({user_id: request.user.id});

      response.status(200).json({
        status: 'success',
        message: 'Auth user account retrieved successfully.',
        data: account ? account : null
      });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: error.message});
    }
  },

};

module.exports = AccountController;
