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

// const getFileFromMongoDB = async (fileId) => {
//     const GridFSBucket = require('mongodb').GridFSBucket;
//     const mongoose = require('mongoose');
//     const conn = mongoose.connection;
//     const bucket = new GridFSBucket(conn.db);

//     return new Promise((resolve, reject) => {
//         bucket.openDownloadStream(fileId)
//             .on('data', (chunk) => {
//                 // You might need to accumulate chunks into a Buffer here
//                 resolve(chunk);
//             })
//             .on('error', (err) => {
//                 reject(err);
//             });
//     });
const getProfilePhoto = async (req, res) => {
    try {
        // Fetch user from database by ID
        const user = await User.findById(req.params.id);
        
        // Check if user or profile photo data is missing
        if (!user || !user.profilePhoto || !user.profilePhoto.data) {
            return res.status(404).send('Profile photo not found');
        }

        // Convert binary data to Base64
        const base64Image = user.profilePhoto.data.toString('base64');
        
        // Use content type from the database or default to 'image/jpeg'
        const contentType = user.profilePhoto.contentType || 'image/jpeg';

        // Send response with Base64 image data and content type
        res.json({ base64Image, contentType });
    } catch (error) {
        console.error('Error fetching profile photo:', error); // Log the error
        res.status(500).send('Internal server error');
    }
};




module.exports = {
    getAllUsers,
    getUsersByGender,
    getProfilePhoto
}