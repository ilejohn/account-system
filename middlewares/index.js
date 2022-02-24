let jwt = require("jsonwebtoken");

module.exports = {
  async authenticateUser(request, response, next) {
    //To do false authentication
    next();
  },
};
