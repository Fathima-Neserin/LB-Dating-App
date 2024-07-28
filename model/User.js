const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({ 
    
    googleId      : String,
    displayName   : String,
    email         : String,
    location      : String,
    gender        : String,
    image         : String,
    password      : String,
    phoneNumber   : String,
    otp           : Number,
    age           : Number,
    dob           : Date,
    qualifications: [String],
    hobbies       : [String],
    interests     : [String],
    profilePhotoId: mongoose.Schema.Types.ObjectId, // Reference to the photo
    profilePhoto  :  String,
    multipleImages: [String],
    shortReel     : String,
    smokingHabits : Boolean,
    drinkingHabits: Boolean,
    isEmployer    : Boolean,
    jobTitle: {
        type: String,
        default: '' // Default value to handle empty strings
      },
      companyName: {
        type: String,
        default: '' // Default value to handle empty strings
      },
      designation: {
        type: String,
        default: '' // Default value to handle empty strings
      },
      companyLocation: {
        type: String,
        default: '' // Default value to handle empty strings
      },
      isJobseeker: Boolean,
      expertiseLevel: {
        type: String,
        enum: ['', 'beginner', 'intermediate', 'expert'], // Include empty string in enum
        default: '' // Default value to handle empty strings
      },
      relation: {
        type: String,
        enum: ['longterm', 'shortterm']
      }
    },
{timestamps:true})

const userData = mongoose.model('user',userSchema);
module.exports = userData;