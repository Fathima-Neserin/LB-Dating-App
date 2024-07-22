import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register3 = () => {
  const [shortTerm, setShortTerm] = useState(false);
  const [longTerm, setLongTerm] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }

    const storedProfilePhoto = localStorage.getItem('profilePhoto');
    if (storedProfilePhoto) {
      setProfilePhoto(storedProfilePhoto); // Assume this is a Blob URL
    }
  }, []);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const combinedData = { ...formData, relationship: shortTerm ? 'shortTerm' : 'longTerm' };

    const formDataToSend = new FormData();
    if (profilePhoto) {
      try {
        const response = await fetch(profilePhoto);
        const blob = await response.blob();
        formDataToSend.append('profilePhoto', blob, 'profilePhoto.jpg');
      } catch (error) {
        console.error('Error fetching profile photo:', error);
      }
    }

    Object.keys(combinedData).forEach(key => {
      formDataToSend.append(key, combinedData[key]);
    });

    try {
      const res = await axios.post('http://localhost:3001/oauth/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.message === 'Successfully registration completed!!') {
        alert(res.data.message);
        navigate('/gender');
      }
    } catch (error) {
      console.error('Error response:', error);
      alert(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
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
        
        <Box display='flex' justifyContent='space-between'>
          <Link to={'/reg2'}><Button id='btn'>Back</Button></Link>
          <Button id='reg-btn' onClick={handleRegister}>Register</Button>
        </Box>
      </div>
    </>
  );
};

export default Register3;
