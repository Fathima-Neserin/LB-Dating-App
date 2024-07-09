import React from 'react'
import { Typography , Grid, TextField , Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import  { useRef, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


const SIGNUP_URL=('http://localhost:3001/auth/signup')

const Signup = () => {
   
  const navigate=useNavigate();

  const nameRef= useRef();
  
  const [details,setDetails] = useState({
    username:'',
    password:''
  })

  useEffect(()=>{

      nameRef.current.focus();

  },[])
  // const validateEmail = (email) => {
  //   // Regular expression for basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);

  // }

  // const validatePassword = (password) => {
  //   // Password must be at least 4 characters long and contain only numbers
  //   const passwordRegex = /^\d{4,}$/;
  //   return passwordRegex.test(password);
  // };
 
  // const validateContact = (contact) => {
  //   // Validate that the contact is a valid number and contains exactly 10 digits
  //   return /^\d{10}$/.test(contact);
  // };

  const changeHandler = async (e) =>{
   
      setDetails({ ...details, [e.target.name]: e.target.value });
    
  }
 
  const signupHandle = async(e) =>{
     
    e.preventDefault();
    
    // // Validate email before submitting the form
    // if (!validateEmail(details.email)) {
    //   alert('Please enter a valid email address.');
    //   return;
    // }
    
    // if (!validatePassword(details.password)) {
    //   alert('Password must be at least 4 characters long and contain only numbers.');
    //   return;
    // }
    
    //    // Validate contact before submitting the form
    //    if (!validateContact(details.contact)) {
    //     alert('Contact must contain exactly 10 digits.');
    //     return;
    //   }
      
    try {
      const response = await axios.post(SIGNUP_URL,details)
      if(response.data.message===` ${details.username} ,sign in`){
        alert(response.data.message)
        // navigate ('/login')
      }
      else{
        alert('Signup failed')
      }

    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className='form-container'>
    <br/>
    <Typography variant='h3' className='head2' >SignUp Form</Typography>
    <br></br>
    <div className='styleform'>
  
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <TextField 
        variant='outlined' 
        fullWidth 
        label='Username'
        required 
        type='text'  
        onChange={changeHandler}
        value={details.username}
        name='username'
        inputRef={nameRef}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
        <TextField 
        variant='outlined' 
        fullWidth 
        label='Password' 
        required 
        type='password'
        onChange={changeHandler}
        value={details.password}
        name='password'
       
        />
      
       
        </Grid>
        </Grid>
        <br/><br/>
        <Button id='btn' variant='filled' fullWidth onClick={signupHandle}>Signup</Button>  
        <br/><br/>
        <Typography variant='h6'>New user; <Link>Register</Link></Typography>
       
          </div>
          </div>
          
)}
export default Signup