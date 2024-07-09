const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const compareAsync = promisify(bcrypt.compare);

const handleSignUp = async (req, res) => {
   
  try {
    
    const { username, pwd, _id} = req.body;
    const user = await User.findOne({ username });
    // const id = user._id.toString();
    // const role = user.role;
    if (!user) {
      return res.status(404).send('User not found!!!');
    }

    // Ensure that the user has a password before attempting to compare
    if (!user.password) {
      return res.status(401).send('User does not have a password set');
    }
    const id = user._id.toString();
    console.log('Password from request:', pwd);
    console.log('User password from database:', user.password);



    const result = await compareAsync(pwd, user.password);

    if (!result) {
      return res.status(401).send('Wrong Password');
    }
    
    let privatekey={username:username,password:pwd}

    const token = jwt.sign({ username: user.username,pwd:user.password,id:id }, process.env.ACCESS_TOKEN);

    console.log('Token:', token, "username:",username,"id:", id);

    return res.status(201).send({ username,pwd, id, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error!!!');
  }
}

// const handleSignup = async(req,res) =>{
//   try{
//   const { name,username,email,password,contact,role} = req.body;

//    if(!name || !username || !email || !password || !contact || !role || username ==='' || email ==='' || password ==='' || contact ===''){
//     return res.status(400).json({message: "All fields are required"})
//    }
//   const newuser=  await Users.create({
//     name,
//     username,
//     email,
//     password,
//     contact,
//     role
//   })
//   await newuser.save();
//    return res.status(200).json({message:"Signup successful",newuser})
// }catch(error){
//   console.log(error)
// }}

module.exports = {
  handleSignUp,
//   handleSignup
};