const User = require("../models/user");
const validateEmail = require("../validator/validateEmail");

let UserController = {

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
  
  create: async (request, response) => {

    if (request.headers.authorization) {
      return  response.status(403).json({status: 'error', message: 'logout before you can create user'});
    }

    const name = request.body.name;
    const email = request.body.email;

    if (!name || !email) {
      return response.status(422).json({status: 'error', message: 'Name and email required'});
    }

    if(typeof name !== 'string') {
      return response.status(422).json({status: 'error', message: 'Invalid name supplied. Name must be string'});
    }

    if(!validateEmail(email)) {
      return response.status(422).json({status: 'error', message: 'Invalid email type supplied'});
    }

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
