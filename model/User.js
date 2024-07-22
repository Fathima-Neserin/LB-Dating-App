const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({ 
    
    googleId      : String,
    displayName   : String,
    email         : String,
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
    profilePhoto  :  String,
    multipleImagesUrls: [String],
    videoUrl      : String,
    smokingHabits : Boolean,
    drinkingHabits: Boolean,
    isEmployer    : Boolean,
    jobTitle      : String,
    companyName   : String,
    designation   : String,
    location      : String,
    isJobseeker   : Boolean,
    expertiseLevel: {
        type: String,
        enum: ['','beginner', 'intermediate', 'expert']
    },
    longTerm      : Boolean,
    shortTerm     : Boolean
           
},
{timestamps:true})

const userData = mongoose.model('user',userSchema);
module.exports = userData;