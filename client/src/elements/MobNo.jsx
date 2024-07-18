import React, { useState } from 'react';
import Navbar from './Navbar';
import { Button, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MobNo = () => {
  const navigate = useNavigate();
  const [mob, setMob] = useState('');
  const [error, setError] = useState('');

  const validateMobileNumber = (number) => {
    const regex = /^\+[1-9]\d{1,14}$/;
    return regex.test(number);
  };

  const handleSubmit = () => {
    const fullPhoneNumber = `+91${mob}`;
    if (!validateMobileNumber(fullPhoneNumber)) {
      setError('Mobile number must contain exactly 10 digits.');
      return;
    }
    setError('');
    
    axios.post("http://localhost:3001/oauth/sendotp", { phoneNumber: fullPhoneNumber })
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
          alert("OTP sent successfully");
          navigate('/verify-otp',{ state: { phoneNumber: fullPhoneNumber  }});
        } else {
          alert("Failed to send OTP");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Error occurred", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className='form-container'>
        <Grid className='otp-form'>
          <Typography style={{ textAlign: 'left', color: "black" }} variant='h6'>
            Enter your Mobile Number, to get verified
          </Typography>
          <br /><br />
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              variant='outlined'
              fullWidth
              label='Mobile Number'
              required
              type='text'
              value={mob}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 10) {
                  setMob(value);
                }
              }}
              error={!!error}
              helperText={error}
              // InputProps={{
              //   startAdornment: <InputAdornment position="start">+91</InputAdornment>,
              // }}
            />
          </Grid>
          <br /><br />
          <Button
            style={{ marginLeft: "30%" }}
            id='btn'
            variant='contained'
            onClick={handleSubmit}
          >
            Send OTP
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default MobNo;
