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
  const [form2Data, setForm2Data] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
    const stored2Data = localStorage.getItem('form2Data');
    if (stored2Data) {
      setForm2Data(JSON.parse(stored2Data));
    }
    const storedProfilePhoto = localStorage.getItem('profilePhoto');
    if (storedProfilePhoto) {
      setProfilePhoto(storedProfilePhoto);
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

    const {
      displayName,
      email,
      phoneNumber,
      gender,
      age,
      dob,
      qualifications,
      hobbies,
      interests,
      multipleImagesUrls,
      videoUrl,
      smokingHabits,
      drinkingHabits,
      isEmployer,
      jobTitle,
      companyName,
      designation,
      location,
      isJobseeker,
      expertiseLevel
    } = formData;

    const formDataToSend = new FormData();

    formDataToSend.append('displayName', displayName);
    formDataToSend.append('email', email);
    formDataToSend.append('phoneNumber', phoneNumber);
    formDataToSend.append('gender', gender);
    formDataToSend.append('age', age);
    formDataToSend.append('dob', dob);
    formDataToSend.append('qualifications', qualifications.join(','));
    formDataToSend.append('hobbies', hobbies.join(','));
    formDataToSend.append('interests', interests.join(','));
    formDataToSend.append('multipleImagesUrls', multipleImagesUrls);
    formDataToSend.append('videoUrl', videoUrl);
    formDataToSend.append('smokingHabits', smokingHabits);
    formDataToSend.append('drinkingHabits', drinkingHabits);
    formDataToSend.append('isEmployer', isEmployer === true ? 'true' : 'false');
    formDataToSend.append('isJobseeker', isJobseeker === true ? 'true' : 'false');  
    formDataToSend.append('jobTitle', jobTitle);
    formDataToSend.append('companyName', companyName);
    formDataToSend.append('designation', designation);
    formDataToSend.append('location', location);
    formDataToSend.append('longTerm', longTerm);
    formDataToSend.append('shortTerm', shortTerm);
  
  
  // Only append expertiseLevel if it's defined
  
  if (expertiseLevel) {
    formDataToSend.append('expertiseLevel', expertiseLevel);
  }

// Convert blobs to files
    const blobToFile = (blob, filename) => new File([blob], filename, { type: blob.type });
    const profilePhotoFile = profilePhoto ? blobToFile(profilePhoto, 'profilePhoto.jpg') : null;

    if (profilePhotoFile) {
      formDataToSend.append('profilePhoto', profilePhotoFile);
    }
    
   
  // Logging formData contents
  for (let pair of formDataToSend.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

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
