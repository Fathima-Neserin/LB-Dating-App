const User = require('../model/User');
const path =require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const getAllUsers = async(req,res)=>{

    const users = await User.find({});

       // If no users 
       if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}
const getUsersByGender = async (req, res) => {
    try {
        const { gender } = req.params;
        let users;

        if (gender.toLowerCase() === 'men') {
            users = await User.find({ gender: "Men" });
        } else if (gender.toLowerCase() === 'women') {
            users = await User.find({ gender: "Women" });
        } else {
            return res.status(400).json({ "message": "Invalid gender specified" });
        }

        if (!users || users.length === 0) {
            return res.status(204).json({ "message": `${gender} users are not available here` });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
};


const getOneUser = async (req,res) => {
    const id=req.params.id
   
    if(!id){
        

        return res.status(400).json({"message": "User ID requied"})
    }
    try {
      

        const user= await User.findById(id).exec();
        console.log(user)
        if(!user){
         return res.status(204).json({"message": `No user matches ID ${id}`})   
        }
       
         res.json(user);
    } catch (error) {
        console.error("An error occurred while fetching user data:", error);

        res.status(500).json({error:error.message})
        console.error(error)
    }
}

const getUserQualifications = async (req, res) => {
    const id = req.params.id;
  
    if (!id) {
      return res.status(400).json({ "message": "User ID required" });
    }
  
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${id}` });
      }
  
      // Assuming user object has qualifications field
      res.json(user.qualifications || []);
    } catch (error) {
      console.error("An error occurred while fetching user qualifications:", error);
      res.status(500).json({ error: error.message });
    }
  }
  
  const getUserHobbies = async (req, res) => {
    const id = req.params.id;
  
    if (!id) {
      return res.status(400).json({ "message": "User ID required" });
    }
  
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${id}` });
      }
  
      // Return hobbies if they exist
      res.json(user.hobbies || []);
    } catch (error) {
      console.error("An error occurred while fetching user hobbies:", error);
      res.status(500).json({ error: error.message });
    }
  }

  const getUserInterests = async (req, res) => {
    const id = req.params.id;
  
    if (!id) {
      return res.status(400).json({ "message": "User ID required" });
    }
  
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${id}` });
      }
  
      // Return interests if they exist
      res.json(user.interests || []);
    } catch (error) {
      console.error("An error occurred while fetching user interests:", error);
      res.status(500).json({ error: error.message });
    }
  }
  
  const getUserImages = async (req, res) => {
    const id = req.params.id;
  
    if (!id) {
      return res.status(400).json({ "message": "User ID required" });
    }
  
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${id}` });
      }
  
      // Check if the user has images
      if (!user.multipleImages || user.multipleImages.length === 0) {
        return res.status(204).json({ "message": "No images found for this user" });
      }
  
      // Respond with the list of image file names
      res.json(user.multipleImages);
    } catch (error) {
      console.error("An error occurred while fetching user images:", error);
      res.status(500).json({ error: error.message });
    }
  }

  const getUserShortReel = async (req, res) => {
    const userId = req.params.id;
  
    try {
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const videoFile = user.shortReel;
      if (!videoFile) {
        return res.status(204).json({ message: 'No video file found for this user' });
      }
  
      const filePath = path.join(__dirname, '..', 'routes' , 'uploads', videoFile); // Adjust path if necessary
      console.log('File path:', filePath);

      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'video/mp4'); // Adjust MIME type if needed
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    } catch (error) {
      console.error('Error fetching short reel:', error); // Log error for debugging
      res.status(500).json({ error: error.message });
    }
  };
  
const  getUserProfile = async (req, res) => {
  const userId = req.params.id; // Make sure this is coming from a valid source

  // Validate the ID (Ensure it is not null and is a valid ObjectId)
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
  }

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send("User not found");
      }
      res.status(200).json({user,userId});
  } catch (err) {
      console.error("An error occurred while fetching user data:", err);
      res.status(500).json({ message: 'Server error' }); 
}
}
  

const editUserProfile =  async(req, res) => {
  const userId = req.params.id;
  const { displayName, location, age, email, phoneNumber, dob, smokingHabits, drinkingHabits } = req.body;
  const profilePhoto = req.file ? req.file.filename : null;

  try {
    // Find user by ID and update with new data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        displayName, 
        location, 
        age, 
        email, 
        phoneNumber, 
        dob, 
        smokingHabits, 
        drinkingHabits, 
        profilePhoto 
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User details updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const searchUsers = async (req, res) => {
  try {
    const { location, qualification, age } = req.query;

    console.log('Received Query:', req.query);

    // Ensure location, qualification, and age are handled correctly
    const query = {};
    if (location) query.location = location;
    if (qualification) query.qualification = qualification;
    if (age) query.age = age;

    console.log('Query Object:', query);console.log('Query Object:', query);
    console.log('MongoDB Query:', User.find(query).getQuery()); // or similar depending on your MongoDB library version
    

    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    console.error('An error occurred while fetching user data:', error);
    res.status(500).send('An error occurred while fetching user data');
  }
};

module.exports = {
    getAllUsers,
    getUsersByGender,
    getOneUser,
    getUserQualifications,
    getUserHobbies,
    getUserInterests,
    getUserImages,
    getUserShortReel,
    getUserProfile,
    editUserProfile,
    searchUsers
}