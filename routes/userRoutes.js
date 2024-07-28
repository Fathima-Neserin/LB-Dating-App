const express = require('express');
const router = express.Router();

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

      
module.exports = router;   