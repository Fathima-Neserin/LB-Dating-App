const express=require('express');
const router=express.Router();

const authController = require('../controller/authController')

router.route('/signup')
      .post(authController.handleSignUp)

 router.route('/sendotp')
       .post(authController.sendOTP)

 router.route('/verifyotp')
       .post(authController.verifyOTP)

 module.exports=router;     