const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const twilio = require('twilio');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // For unique file naming

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const serviceId = process.env.serviceId;

const client = new twilio(accountSid, authToken);

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

    const id = user._id.toString();
    const token = jwt.sign({ displayName: user.displayName, email: user.email, id }, ACCESS_TOKEN);

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
      gender,
      age,
      dob,
      qualifications,
      hobbies,
      interests,
      multipleImagesUrls,
      videoUrl,
      smokingHabits,
      drinkingHabits,
      isEmployer,
      jobTitle,
      companyName,
      designation,
      location,
      isJobseeker,
      expertiseLevel,
      longTerm,
      shortTerm
    } = req.body;

    const profilePhotoFile = req.file;

    let profilePhoto = null;
    if (profilePhotoFile) {
      profilePhoto = {
        data: profilePhotoFile.buffer,
        contentType: profilePhotoFile.mimetype,
        filename: profilePhotoFile.originalname
      };
    } else {
      return res.status(400).json({ error: "Profile photo is required" });
    }
    
    console.log('Received data:', req.body);
    console.log('Received files:', profilePhotoFile);

    

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
      age,
      dob,
      qualifications: qualifications.split(','),
      hobbies: hobbies.split(','),
      interests: interests.split(','),
      multipleImagesUrls,
      videoUrl,
      smokingHabits,
      drinkingHabits,
      isEmployer,
      companyName,
      designation,
      location,
      isJobseeker,
      jobTitle,
      expertiseLevel,
      longTerm,
      shortTerm,
      profilePhoto
    });

    await newUser.save();
    return res.status(200).json({ message: "Successfully registration completed!!", newUser });
  } catch (error) {
    console.log("Error",error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleSignUp,
  sendOTP,
  verifyOTP,
  handleRegister
};
