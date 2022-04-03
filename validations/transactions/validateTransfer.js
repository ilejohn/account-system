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

    next();
}
  