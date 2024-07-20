const User = require('../model/User');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
require('dotenv').config();
const twilio = require('twilio');
const bodyParser = require('body-parser');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const serviceId = process.env.serviceId;


const client = new twilio(accountSid, authToken);

// const compareAsync = promisify(bcrypt.compare);

const handleSignUp = async (req, res) => {
  try {
    const { displayName, email , phoneNumber } = req.body;

    // Check for required fields
    if (!displayName || !email) {
      return res.status(400).send('Missing required fields');
    }

    // Find user in the database
    const user = await User.findOne({ email }); // Assuming email is unique

    if (!user) {
      return res.status(404).send('User not found!!!');
    }

    if (!user.email) {
      return res.status(401).send('User does not have an email');
    }

    if (!user.phoneNumber) {
      return res.status(401).send('User does not have a mobile number');
    }

    const id = user._id.toString();
    

    // Generate JWT token
    const token = jwt.sign({ displayName: user.displayName, email: user.email, id }, ACCESS_TOKEN);

    return res.status(200).json({
      message: `${displayName} signed in successfully`,
      displayName: user.displayName,
      email: user.email,
      id: user._id.toString(),
      token: token
    });  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error!!!');
  }
};


const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const fullPhoneNumber = `${phoneNumber}`;
//     console.log('Sending OTP to:', fullPhoneNumber);
//     console.log('Twilio account SID:', accountSid);
// console.log('Twilio auth token:', authToken);
// console.log('Twilio service ID:', serviceId);
// console.log('Phone number to send OTP:', fullPhoneNumber);


    const verification = await client.verify.v2.services(serviceId)
      .verifications
      .create({ to: fullPhoneNumber, channel: 'sms' });

    console.log('Twilio verification response:', verification);

    if (verification.status === 'pending') {
      return res.send({ success: true });
    } else {
      console.error('Failed to send OTP:', verification);
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
        // If the user exists, update the OTP and verifiedAt fields
        user.otp = userOTP;
        user.verifiedAt = new Date();
        await user.save();
      } else {
        // If the user does not exist, create a new user
        user = new User({
          phoneNumber: fullPhoneNumber,
          otp: userOTP,
          verifiedAt: new Date(),
        });
        await user.save();
      }
      
      res.status(200).send({ success: true, message: "OTP verified" , user});
    } else {
      res.status(401).send({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Error verifying OTP" });
  }
};

const handleRegister = async(req,res) =>{
  try{
  const { 

    displayName ,
    email ,
    phoneNumber ,
    gender,
    age ,
    dob ,
    qualifications ,
    hobbies ,
    interests ,
    profilePhotoUrl ,
    multipleImagesUrls ,
    videoUrl ,
    smokingHabits ,
    drinkingHabits ,
    isEmployer ,
    jobTitle,
    companyName ,
    designation ,
    location ,
    isJobseeker ,
    beginner ,
    intermediate ,
    expert ,
    longTerm ,
    shortTerm
           
    } = req.body;

     // Check if user already exists
     const existingUser = await User.findOne( { email  });
     if (existingUser) {
       return res.status(400).json({ error: "User already exists with the given email " });
     }


  const newuser=  await User.create({
    displayName ,
    email ,
    phoneNumber ,
    gender,
    age ,
    dob ,
    qualifications ,
    hobbies ,
    interests ,
    profilePhotoUrl ,
    multipleImagesUrls ,
    videoUrl ,
    smokingHabits ,
    drinkingHabits ,
    isEmployer ,
    companyName ,
    designation ,
    location ,
    isJobseeker ,
    jobTitle,
    beginner ,
    intermediate ,
    expert ,
    longTerm ,
    shortTerm
           
  })
  await newuser.save();
   return res.status(200).json({message:"Successfully registration completed!!",newuser})
}catch(error){
  console.log(error)
  return res.status(500).json({error:"Internal server error"})
}}


module.exports = {
  handleSignUp,
  sendOTP,
  verifyOTP,
  handleRegister
};
