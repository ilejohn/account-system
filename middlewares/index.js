const jwt = require("jsonwebtoken");
const { appKey } = require("../config");

module.exports = {
  async authenticateUser(request, response, next) {
    //To do false authentication

    if (!request.headers.authorization) {
      return  response.status(403).json({status: 'error', message: 'unauthorised access'});
    }

    let token = request.headers.authorization.split(" ")[1];

    
    if (!token) {
      return  response.status(403).json({status: 'error', message: 'unauthorised access'});
    }

    try {
      request.user = jwt.verify(token, appKey);

      next();
    } catch (error) {

      return  response.status(403).json({status: 'error', message: error.message});;
    }
  },
};
