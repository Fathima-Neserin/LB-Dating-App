const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT')
const multer = require('multer');


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
      //     { name: 'shortReel', maxCount: 1 },
      //     { name: 'multipleImages', maxCount: 10 } // Adjust maxCount as needed
        ]);

const userController = require('../controller/userController')

router.route('/')
      .get(userController.getAllUsers)

router.route('/gender/:gender')      
      .get(userController.getUsersByGender)

router.route('/:id')
      .get(userController.getOneUser)

router.route('/:id/qualifications')
      .get(userController.getUserQualifications)      

router.route('/:id/hobbies')
      .get(userController.getUserHobbies)     
      
router.route('/:id/interests')    
       .get(userController.getUserInterests) 
       
router.route('/:id/images') 
      .get(userController.getUserImages)      
       
router.route('/:id/shortReel')
      .get(userController.getUserShortReel)      

router.route('/profile/:id')
       .get(userController.getUserProfile)   
       
router.route('/edit/:id')
      .put(upload.single('profilePhoto'),userController.editUserProfile)       
      
router.route('/search')
      .get(userController.searchUsers)

module.exports = router;   