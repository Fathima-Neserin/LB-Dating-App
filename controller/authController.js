const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const twilio = require('twilio');
const multer = require('multer');
// const { v4: uuidv4 } = require('uuid'); // For unique file naming

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const serviceId = process.env.serviceId;

const client = new twilio(accountSid, authToken);

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' })



const handleSignUp = async (req, res) => {
  try {
    const { displayName, email, phoneNumber } = req.body;

    if (!displayName || !email) {
      return res.status(400).send('Missing required fields');
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!user.email) {
      return res.status(401).send('User does not have an email');
    }

    if (!user.phoneNumber) {
      return res.status(401).send('User does not have a mobile number');
    }

    let id = user._id.toString();
    let token = jwt.sign({ displayName: user.displayName, email: user.email, id }, ACCESS_TOKEN);

    return res.status(200).json({
      message: `${displayName} signed in successfully`,
      displayName: user.displayName,
      email: user.email,
      id: user._id.toString(),
      token: token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const fullPhoneNumber = `${phoneNumber}`;

    const verification = await client.verify.v2.services(serviceId)
      .verifications
      .create({ to: fullPhoneNumber, channel: 'sms' });

    if (verification.status === 'pending') {
      return res.send({ success: true });
    } else {
      return res.status(500).send({ success: false, error: "Failed to send OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: "Failed to send OTP" });
  }
};

const verifyOTP = async (req, res) => {
  const { phoneNumber, userOTP } = req.body;
  const fullPhoneNumber = `${phoneNumber}`;

  try {
    const verificationCheck = await client.verify.v2.services(serviceId)
      .verificationChecks
      .create({ to: fullPhoneNumber, code: userOTP });

    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phoneNumber: fullPhoneNumber });
      
      if (user) {
        user.otp = userOTP;
        user.verifiedAt = new Date();
        await user.save();
      } else {
        user = new User({
          phoneNumber: fullPhoneNumber,
          otp: userOTP,
          verifiedAt: new Date(),
        });
        await user.save();
      }
      
      res.status(200).send({ success: true, message: "OTP verified", user });
    } else {
      res.status(401).send({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Error verifying OTP" });
  }
};

const handleRegister = async (req, res) => {
  try {
    const { 
      displayName,
      email,
      phoneNumber,
      location,
      gender,
      age,
      dob: rawDob,
      qualifications,
      hobbies,
      interests,
      smokingHabits,
      drinkingHabits,
     
    } = req.body;

   
    const profilePhoto = req.files['profilePhoto'] ? req.files['profilePhoto'][0].filename : null;
    const shortReel = req.files['shortReel'] ? req.files['shortReel'][0].filename : null;
    const multipleImages = req.files['multipleImages'] ? req.files['multipleImages'].map(file => file.filename) : [];
    
    console.log(req.body); // Logs other form data

    console.log('Profile Photo:', profilePhoto);
    console.log('Short Reel:', shortReel);
    console.log('Multiple Images:', multipleImages);
  // Validate and sanitize input data
  let dob = rawDob ? new Date(rawDob) : null;

  if (dob && isNaN(dob.getTime())) {
    return res.status(400).json({ error: 'Invalid date of birth' });
  }

  // Convert dob to string format
  dob = dob ? dob.toISOString() : null;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with the given email" });
    }

    // Create new user
    const newUser = await User.create({
      displayName,
      email,
      phoneNumber,
      gender,
      location,
      age,
      dob,
      qualifications: qualifications.split(','),
      hobbies: hobbies.split(','),
      interests: interests.split(','),
      multipleImages,
      shortReel,
      smokingHabits,
      drinkingHabits,
      profilePhoto
    });

    await newUser.save();

    let id = newUser._id.toString();
    let token = jwt.sign({ displayName: newUser.displayName, email: newUser.email, id }, ACCESS_TOKEN);


    return res.status(200).json({ message: "First part of registration completed",
      token,
      id,
      newUser,
      profilePhoto,
      shortReel,
      multipleImages });
     
  } catch (error) {
    console.log("Error",error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleRegister2 = async (req, res) => {
  try {
    const {
      isEmployer,
      isJobseeker,
      companyName,
      designation,
      companyLocation,
      jobTitle,
      expertiseLevel
    } = req.body;

    // Ensure req.userId is set correctly (e.g., via authentication middleware)
    const userId = req.userId;
    console.log('Request body:', req.body);
    console.log('User ID:', req.userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(userId, {
      isEmployer,
      isJobseeker,
      companyName,
      designation,
      companyLocation,
      jobTitle,
      expertiseLevel
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'Employment details updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating employment details:', error);
    return res.status(500).json({ error: 'Error updating employment details' });
  }
};
const handleRegister3 = async (req, res) => {
  try {
    const { relation, userId } = req.body;

    // Ensure the user ID is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Update the user's relationship status
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { relation },
      { new: true }
    );

    // Check if the update was successful
    if (updatedUser) {
      res.json({ message: 'Relationship updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Error updating relationship details' });
  }
};

module.exports = {
  handleSignUp,
  sendOTP,
  verifyOTP,
  handleRegister,
  handleRegister2,
  handleRegister3
  
};
