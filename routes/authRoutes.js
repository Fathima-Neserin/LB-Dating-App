const express=require('express');
const router=express.Router();

const authController = require('../controller/authController')

router.route('/signup')
      .post(authController.handleSignUp)

// router.route('/signup')
//       .post(authController.handleSignup)
      
 module.exports=router;     