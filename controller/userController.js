const User = require('../model/User');

const getAllUsers = async(req,res)=>{

    const users = await User.find({});

       // If no users 
       if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

module.exports = {
    getAllUsers
}