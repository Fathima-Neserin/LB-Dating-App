import React from 'react'
import { Typography , Grid, TextField , Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import  { useRef, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


const SIGNUP_URL=('http://localhost:3001/oauth/signup')


const Signup = () => {

  const navigate=useNavigate();


  const signInWithGoogle = () =>{
    try {
      window.open("http://localhost:3001/auth/google/callback","_self")
      console.log("Signup successful");

      
    } catch (error) {
      console.error(error)
    }
  
  } 


  const nameRef= useRef();
  
  const [details,setDetails] = useState({
    displayName:'',
    email:'',
    phoneNumber:'+91'
  })

  useEffect(()=>{

      nameRef.current.focus();

  },[])
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(details.email);

  }


 
  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression to match +91 followed by exactly 10 digits
    const regex = /^\+91\d{10}$/;
    return regex.test(details.phoneNumber);
  };
  

  // if (!validatePhoneNumber(details.phoneNumber)) {
  //   alert("Contact must contain +91 followed by exactly 10 digits");
  // } else {
  //   alert("Contact is valid");
    
  // }
  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  }; 
  
  const signinHandle = async (e) => {
    e.preventDefault();

    // Validate email before submitting the form
    if (!validateEmail(details.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate contact before submitting the form
    if (!validatePhoneNumber(details.phoneNumber)) {
      alert('Include +91 before your mobile number');
      return;
    }

    try {
     
      const response = await axios.post(SIGNUP_URL, details);
     
      console.log(response.data);

      const { token: accessToken, id: accessID, message } = response.data;

      if (accessToken) {
        console.log('Storing token:', accessToken);
        localStorage.setItem('Token', accessToken);
        console.log('Storing accessID:', accessID);
        localStorage.setItem('accessID', accessID);

    } else {
      alert('No token received from server');
    }
      if (response.data.message === `${details.displayName} signed in successfully`) {
        console.log(response.data.message)
        alert(response.data.message); // Optionally alert the message from backend
        navigate('/gender'); // Navigate to dashboard upon successful signup
      } else {
        alert('Signup failed');
        navigate('/')
      }
    } catch (error) {
      console.error(error);
      alert('Signup failed'); // Handle other error cases
      navigate('/')
    }
  };
  
  return (
    <div className='form-container'>
    <br/>
    <Typography variant='h6' className='head2'>"Discover love and connections that matter.<br/> Sign in and start your journey to find that special someone."</Typography>
    <br></br>
    <div className='styleform'>
  
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6}>
        <TextField 
        variant='outlined' 
        fullWidth 
        label='Name'
        required 
        type='text'  
        onChange={changeHandler}
        value={details.displayName}
        name='displayName'
        inputRef={nameRef}/>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
        <TextField 
        variant='outlined' 
        fullWidth 
        label='Email' 
        required 
        type='email'
        onChange={changeHandler}
        value={details.email}
        name='email'
        />
        </Grid>
       <Grid item xs={6} sm={6} md={12}>
        <TextField 
        variant='outlined' 
        fullWidth 
        label='Mobile Number' 
        required
        type='text'
        onChange={changeHandler}
        value={details.phoneNumber}
        name='phoneNumber'
       
        />
      
       </Grid>
        </Grid>
        
        <br/>
        <Button id='btn' variant='outlined' fullWidth onClick={signinHandle}>Sign in</Button>  
        <br/><br/>
        <Typography style={{textAlign:'center', color: 'black'}} variant='h6'>New user; <Link to={'/register'} className='link'>Register</Link></Typography>

        <br/>
        <Button fullWidth id='google-btn' variant='outlined' onClick={signInWithGoogle}>Sign In with Google</Button>
        <br/><br/>
       <Link to={'/generate-otp'}><Button fullWidth id='phone-btn' variant='outlined'>Sign in by otp verification</Button></Link>
          </div>
          </div>
          
)}
export default Signup