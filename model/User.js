const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({ 
    googleId : {
        type : String
    },
    displayName : {
        type : String 
    },
    email : {
        type : String
    },
    image : {
        type : String
    },
    name : {
        type : String
    },
    password : {
        type : String
    },
    phoneNumber : {
        type : String
    },
    otp : {
        type: Number
    }
},{timestamps:true})

const userData = mongoose.model('user',userSchema);
module.exports = userData;