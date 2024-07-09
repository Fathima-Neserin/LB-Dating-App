const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({ 
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    contact : {
        type : Number,
        
    },
    otp : {
        type: Number
    }
})

const userData = mongoose.model('user',userSchema);
module.exports = userData;