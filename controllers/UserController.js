const User = require("../models/user");

let UserController = {

   /**
     * Retrieve all users
     *
     */
  all: async (request, response) => {
    try {
      const users = await User.all();

      response.status(200).json({
        status: 'success',
        message: 'All Users retrieved successfully.',
        data: users
    });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: 'Users failed to be retrieved'});
    }
  },

   /**
     * Create user
     *
     */
  
  create: async (request, response) => {
    const name = request.body.name;
    const email = request.body.email;

    try {
      const user = await User.create({name,email});

      response.status(201).json({
        status: 'success',
        message: 'User created successfully.',
        data: user
      });
    } catch (error) {
      response.status(400).json({status: 'error', message: `${error.message}. failed to create user`});
    }
  },

   /**
     * Show authenticated user
     *
     */

  showAuthUser: (request, response) => {
    const user = request.user;

    try {

      response.status(200).json({
        status: 'success',
        message: 'Auth User retrieved successfully.',
        data: user
    });
   
    } catch (error) {
      response.status(400).json({status: 'error', message: "failed to retrieve auth user"});
    }
  },
  
};

module.exports = UserController;
