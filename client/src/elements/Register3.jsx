import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register3 = () => {

  const [shortTerm, setShortTerm] = useState(false);
  const [longTerm, setLongTerm] = useState(false);
 
  const navigate = useNavigate();

 

  const handleShortTerm = (event) => {
    setShortTerm(event.target.checked);
    if (event.target.checked) {
      setLongTerm(false);
    }
  };

  const handleLongTerm = (event) => {
    setLongTerm(event.target.checked);
    if (event.target.checked) {
      setShortTerm(false);
    }
  };

  
  const handleRegister3 = async (e) => {
    e.preventDefault();

    const relation = shortTerm ? 'Short Term' : longTerm ? 'Long Term' : '';

    if (!relation) {
      alert('Please select a relationship type.');
      return;
    }

    const form3Data = { relation };

    const accessToken = localStorage.getItem('accessToken'); // Get the token from local storage
    const accessId = localStorage.getItem('accessId'); // Get the user ID from local storage

    try {
      const response = await axios.put('http://localhost:3001/oauth/register3', {
        ...form3Data,
        userId: accessId // Include the user ID in the request payload
      });

      if (response.data.message === "Relationship updated successfully") {
        alert(response.data.message);
        navigate('/gender'); // Navigate to the next page
      } else {
        alert('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Error occurred while updating relationship details.');
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='form-container' id='reg-form'>
        <Typography variant='h4' style={{ color: 'white', marginLeft: '3%', paddingBottom: '3%', paddingTop: '10%' }}>
          Relationship:
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox sx={{ color: 'white' }} />} label='Short Term Relationship' sx={{ color: 'white' }} checked={shortTerm} onChange={handleShortTerm} />
          <FormControlLabel control={<Checkbox sx={{ color: 'white' }} />} label='Long Term Relationship' sx={{ color: 'white' }} checked={longTerm} onChange={handleLongTerm} />
        </FormGroup>
        <br /><br /><br /><br />
        <Box sx={{ margin: '15px 100px', color: 'crimson', padding: '5%', width: '50%', height: '60%', fontSize: 25 }}>
          {shortTerm && (
            <span>Wishing you a fun journey on our Dating App!</span>
          )}
          {longTerm && (
            <span>Wishing you happiness on your journey with our Matrimony service!</span>
          )}
        </Box>
        <br /><br /><br />
        <Divider />
        <br /><br />
        
          <Button id='reg-btn' onClick={handleRegister3}>Register</Button>
      
      </div>
    </>
  );
};

export default Register3;
