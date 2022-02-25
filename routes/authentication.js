let express = require("express");
let router = express.Router();
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const { appKey } = require("../config");
const { authenticateUser } = require("../middlewares");

router.post("/login", async (request, response) => {
    const email = request.body.email;

    db('users').select('id', 'email', 'name').where({email: email}).first().then((user) => {

       const token = jwt.sign(
            {
              ...user
            },
            appKey,
            { expiresIn: 30*60 }, // expires in 30 minutes
        );

        response.status(200).json({
            status: 'success',
            message: 'User logged in successfully. Add token to Api request header as bearer Token to visit logged in routes',
            data: {user, token}
        })
    }).catch((error) => {
        response.json({status: 'error', message: error.message});
    })

});

router.post("/logout", authenticateUser, (request, response) => {
    const user = request.user;

    if(!user) {
      response.status(403).json({status: 'error', message: 'Only logged in users can log out'});
    }

    response.status(200).json({
        status: 'success',
        message: 'Clear token from Api request header',
    });
});

module.exports = router;
