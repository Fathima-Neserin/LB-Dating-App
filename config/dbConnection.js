const mongoose=require('mongoose');

const Connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports=Connect;