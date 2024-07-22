const User = require('../model/User');

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


module.exports = {
    getAllUsers,
    getUsersByGender
}