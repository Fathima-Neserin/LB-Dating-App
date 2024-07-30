import { Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Gender = () => {
  const navigate = useNavigate();

  const handleGenderClick = (gender) => {
    localStorage.setItem('selectedGender', gender);
    navigate('/userhome');
  };

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const googleId = urlParams.get('googleId');

    if (accessToken && googleId) {
      // Optionally store tokens or user data in session storage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('googleId', googleId);
    } else if (state && state.phoneNumber) {
      // Optionally store phoneNumber or OTP data in session storage
      sessionStorage.setItem('phoneNumber', state.phoneNumber);
    }

    // Navigate to dashboard page regardless of authentication method
    navigate('/gender');
    

  }, [state, navigate]);

  return (
    <div className='gender-page'>
      <div className='qstn-area'>
        <Typography variant='h6' sx={{ fontFamily: 'Georgia' }}>
          Which type of gender are you interested in seeing on this platform?
        </Typography>
        <br/><br/>
      </div>
      <Button id='gender-btn' onClick={() => handleGenderClick('Men')}>Men</Button><br/><br/>
      <Button id='gender-btn' onClick={() => handleGenderClick('Women')}>Women</Button><br/><br/>
      <Button id='gender-btn' onClick={() => handleGenderClick('Both')}>Both</Button><br/><br/>
    </div>
  );
};

export default Gender;
