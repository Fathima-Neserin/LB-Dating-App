import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gender = () => {
  const navigate = useNavigate();

  const handleGenderClick = (gender) => {
    localStorage.setItem('selectedGender', gender);
    navigate('/userhome');
  };

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
