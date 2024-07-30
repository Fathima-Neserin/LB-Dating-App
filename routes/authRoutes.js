const express=require('express');
const router=express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyJWT = require('../middleware/verifyJWT')

const authController = require('../controller/authController')
// Directory setup for uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the `uploadDir` variable here
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  },
});

const upload = multer({ storage: storage })

// Define the fields for Multer
const uploadFields = upload.fields([
      { name: 'profilePhoto', maxCount: 1 },
      { name: 'shortReel', maxCount: 1 },
      { name: 'multipleImages', maxCount: 10 } // Adjust maxCount as needed
    ]);


router.route('/signup')
      .post(authController.handleSignUp)

 router.route('/sendotp')
       .post(authController.sendOTP)

 router.route('/verifyotp')
       .post(authController.verifyOTP)

 router.route('/register')
       .post(uploadFields,authController.handleRegister)     
       
 router.route('/register2')
       .put(verifyJWT,authController.handleRegister2)      

 router.route('/register3')
       .put(verifyJWT,authController.handleRegister3)

       
 module.exports=router;     