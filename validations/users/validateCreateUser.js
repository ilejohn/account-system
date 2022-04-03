const validateEmail = require("../../validator/validateEmail");

module.exports = async (request, response, next) => {
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

    next();
}
