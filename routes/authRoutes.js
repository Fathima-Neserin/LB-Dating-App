const express=require('express');
const router=express.Router();
const multer = require('multer');

const authController = require('../controller/authController')


// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.route('/signup')
      .post(authController.handleSignUp)

 router.route('/sendotp')
       .post(authController.sendOTP)

 router.route('/verifyotp')
       .post(authController.verifyOTP)

 router.route('/register')
       .post(upload.single('profilePhoto'),authController.handleRegister)      

 module.exports=router;     