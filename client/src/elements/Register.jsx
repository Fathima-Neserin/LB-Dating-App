import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Typography, InputLabel, MenuItem, FormControl, Select, Box, Chip, RadioGroup, FormControlLabel, Radio, Grid, Input, Button, TextField, FormLabel, Divider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Hobbies = [
  'Reading', 'Traveling', 'Cooking', 'Hiking', 'Painting', 'Dancing', 'Playing musical instruments', 'Photography', 'Gardening', 'Watching movies', 'Playing sports', 'Yoga', 'Fishing', 'Knitting', 'Writing', 'Gaming', 'Cycling', 'Fitness', 'Crafting', 'Volunteering', 'Bird watching', 'Meditation', 'Surfing', 'Skateboarding', 'Learning languages', 'Collecting (e.g., stamps, coins)', 'Astronomy', 'Chess', 'DIY projects', 'Baking'
];

const Interests = [
  'Music', 'Movies', 'Traveling', 'Reading', 'Cooking', 'Sports', 'Fitness', 'Yoga', 'Dancing', 'Hiking', 'Painting', 'Photography', 'Gardening', 'Gaming', 'Cycling', 'Fishing', 'Knitting', 'Writing', 'Crafting', 'Volunteering', 'Meditation', 'Surfing', 'Skateboarding', 'Learning languages', 'Collecting (e.g., stamps, coins)', 'Astronomy', 'Chess', 'DIY projects', 'Baking', 'Fashion', 'Technology', 'Nature', 'Pets', 'Socializing', 'Theater', 'Concerts', 'Adventure sports', 'Wine tasting', 'Cultural activities', 'Blogging', 'Board games', 'Martial arts', 'Shopping', 'Fitness classes', 'Pilates', 'Stand-up comedy', 'Watching TV shows', 'Spirituality', 'Astrology', 'Puzzles'
];

const Qualifications = [
  'High School Diploma or Equivalent (GED)', 'Technical or Vocational Certificate', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate Degree (Ph.D., Ed.D., etc.)', 'Professional Degree (JD, MD, etc.)', 'Certifications and Licenses', 'Trade School Education', 'Military Training', 'Online Courses and MOOCs', 'Language Proficiency Certifications', 'Technical Skills and IT Certifications', 'Soft Skills Training', 'Work Experience and Internships'
];


function getStyles(name, personName, theme) {
  return {
    fontWeight: Hobbies.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

function getInterests(name, interest, theme) {
  return {
    fontWeight: Interests.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

function getQualification(name, qualification, theme) {
  return {
    fontWeight: Qualifications.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}



const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const countryCode = '+91';
  const [age, setAge] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [interests, setInterests] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [multipleImagesUrls, setMultipleImagesUrls] = useState([]);
  const [shortReel, setShortReel] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [dob, setDOB] = useState(null);
  const [smokingHabits, setSmokingHabits] = useState(false);
  const [drinkingHabits, setDrinkingHabits] = useState(false);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    setEmailError(!validateEmail(email));
  };

  const validateMobile = (mobile) => {
    const numberWithoutCountryCode = mobile.replace(countryCode, '');
    const isValid = /^\d{10}$/.test(numberWithoutCountryCode);
    setMobileError(!isValid);
    return isValid;
  };

  const handleMobileBlur = () => {
    if (!validateMobile(phoneNumber)) {
      console.log('Invalid mobile number format');
    } else {
      console.log('Valid mobile number:', phoneNumber);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);

    switch (name) {
      case 'displayName':
        setDisplayName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleHobbies = (event) => {
    const { target: { value } } = event;
    setHobbies(typeof value === 'string' ? value.split(',') : value);
  };

  const handleInterest = (event) => {
    const { target: { value } } = event;
    setInterests(typeof value === 'string' ? value.split(',') : value);
  };

  const handleQualification = (event) => {
    const { target: { value } } = event;
    setQualifications(typeof value === 'string' ? value.split(',') : value);
  };

  const handleProfilePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleUploadClick = () => {
    console.log('Uploading profile photo:', profilePhoto);
    // Handle the upload logic here
  };

  const handleMultipleImage = (event) => {
    const files = Array.from(event.target.files);
    setMultipleImages(prevImages => [...prevImages, ...files]);
  };

  const handleMultipleUpload = () => {
    console.log('Uploading post images:', multipleImages);
    // Handle the upload logic here
  };

  const handleShortReel = (event) => {
    const file = event.target.files[0];
    setShortReel(file);
  };

  const handleShortReelUpload = () => {
    console.log(shortReel);
    // Handle the upload logic here
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('displayName', displayName);
    formData.append('email', email);
    formData.append('location', location);
    formData.append('phoneNumber', phoneNumber);
    formData.append('age', age);
    formData.append('qualifications', qualifications);
    formData.append('hobbies', hobbies);
    formData.append('smokingHabits', smokingHabits);
    formData.append('drinkingHabits', drinkingHabits);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('interests', interests);
    if(profilePhoto){
    formData.append('profilePhoto', profilePhoto);
    }
    formData.append('shortReel', shortReel);

    multipleImages.forEach((image) => {
      formData.append('multipleImages', image);
    });

    try {
      const response =  await axios.post('http://localhost:3001/oauth/register', formData, {
        headers: {
          method:"POST" ,
          enctype:"multipart/form-data"
        },
      });

      if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('accessId', response.data.id);
      }
      alert("First part of registration completed");
      navigate('/reg2');
    } catch (error) {
      console.error('Registration failed', error);
      alert("Registration failed");
    }
  };

  return (
    <div className='form-container' id='reg-form'>
    <Typography>
      "Welcome to our Dating App,<br/> Your journey to find meaningful connections starts here.<br/> Explore, connect, and discover the magic of meeting someone special. Happy matching!"
    </Typography>
    <br /><br />
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          variant='outlined'
          fullWidth
          label='Name'
          type='text'
          onChange={changeHandler}
          value={displayName}
          name='displayName'
          sx={{ m: 1, width: '100%', backgroundColor: 'white' }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          variant='outlined'
          fullWidth
          label='Email'
          type='email'
          onChange={changeHandler}
          onBlur={handleBlur}
          value={email}
          name='email'
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
          sx={{ m: 1, width: '100%', backgroundColor: 'white' }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          variant='outlined'
          fullWidth
          label='Location'
          type='text'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          sx={{ m: 1, width: '100%', backgroundColor: 'white' }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          variant='outlined'
          fullWidth
          label='Mobile Number'
          type='text'
          onChange={changeHandler}
          onBlur={handleMobileBlur}
          value={phoneNumber}
          name='phoneNumber'
          error={mobileError}
          helperText={mobileError ? <span style={{ color: 'red' }}>Mobile number must contain 10 digits</span> : ''}
          sx={{ m: 1, width: '100%', backgroundColor: 'white' }}
          inputProps={{ style: { color: 'black' } }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }} variant='outlined'>
          <InputLabel>Age</InputLabel>
          <Select value={age} onChange={handleChange}>
            <MenuItem value=""></MenuItem>
            {Array.from({ length: 18 }, (_, i) => (
              <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
        <InputLabel >Qualification</InputLabel>
            <Select
              multiple
              value={qualifications}
              onChange={handleQualification}
              input={<OutlinedInput label="Qualification" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Qualifications.map((name) => (
                <MenuItem key={name} value={name} style={getQualification(name, qualifications, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
          <InputLabel>Hobbies</InputLabel>
          <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={hobbies}
              onChange={handleHobbies}
              input={<OutlinedInput label="Hobbies" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Hobbies.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, hobbies, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
          <InputLabel>Interests</InputLabel>
          <Select
              multiple
              value={interests}
              onChange={handleInterest}
              input={<OutlinedInput label="Interests" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {Interests.map((name) => (
                <MenuItem key={name} value={name} style={getInterests(name, interests, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
      </Grid>
     
      <Grid item xs={12} sm={12} md={6}>
        <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={dob}
              onChange={(date) => setDOB(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }} variant='outlined'>
            <InputLabel>Gender</InputLabel>
           <Select
          value={gender}
          label="Gender"
          onChange={(e) => setGender(e.target.value)}>
         <MenuItem value="Men">Men</MenuItem>
         <MenuItem value="Women">Women</MenuItem>
    
         </Select>
          </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
              <Typography sx={{ pt: '10px', pl: 1 }}>Profile Photo</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Input type="file" onChange={handleProfilePhoto} />
                <Button onClick={handleUploadClick} variant="contained" color='primary' disabled={!profilePhoto} sx={{ m: 2, p: 2 }}>
                  Upload
                </Button>
              </Box>
             
            </FormControl>
          
        
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <FormControl sx={{  m: 1 ,width: '100%', backgroundColor: 'white' }}>
                <Typography sx={{ pt: '10px', pl: 1 }}>Share your Images</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                  <Input
                    accept="image/*"
                    id="post-images"
                    type="file"
                    multiple
                    onChange={handleMultipleImage}
                    sx={{ display: 'none' }}
                  />
                  <label htmlFor="post-images">
                    <Button  component="span" >
                      Choose Files
                    </Button>
                  </label>
                  {multipleImages.length > 0 && (
                    <Typography variant="body2" sx={{ m: 1 }}>
                      {multipleImages.length} files selected
                    </Typography>
                  )}
                  <Grid item xs={4} sm ={4} md={4}>
                  <Button variant="contained" color="primary" onClick={handleMultipleUpload} disabled={!multipleImages.length} sx={{  ml: 5 , mb: 1 ,  pt: 1 , display: 'flex', flexWrap: 'wrap'}}>
                    Upload
                  </Button>
                  </Grid>
                </Box>
               
                </FormControl>
            
      </Grid>
      <Grid item xs={4} sm={14} md={6}>
      <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
          <Typography sx={{ pt: '10px', pl: 1 }}>Share your Reel</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            <Input
              accept="video/*"
              id="post-video"
              type="file"
              onChange={handleShortReel}
              sx={{ display: 'none' }}
            />
            <label htmlFor="post-video">
              <Button component="span">
                Choose File
              </Button>
            </label>
            {shortReel && (
              <Typography variant="body2" sx={{ m: 1 }}>
                1 video selected
              </Typography>
            )}
            <Grid item xs={4} sm={4} md={4}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleShortReelUpload} 
                disabled={!shortReel} 
                sx={{ ml: 5, mb: 1, pt: 1, display: 'flex', flexWrap: 'wrap'}}
              >
                Upload
              </Button>
            </Grid>
          </Box>
        
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <FormControl>
            <FormLabel id='radio-group'>Smoking Habits</FormLabel>
            <RadioGroup
              value={smokingHabits}
              onChange={(e) => setSmokingHabits(e.target.value)} 
              name="smokingHabits"
              >
              <div className='radio-group'>
                <FormControlLabel value="yes" control={<Radio sx={{ color: 'white' }} />} label="Yes" sx={{ color: 'white' }} />
                <FormControlLabel value="no" control={<Radio sx={{ color: 'white' }} />} label="No" sx={{ color: 'white' }} />
              </div>
            </RadioGroup>
          </FormControl>
        
          <FormControl>
            <FormLabel id='radio-group'>Drinking Habits</FormLabel>
            <RadioGroup  
             value={drinkingHabits}
             onChange={(e) => setDrinkingHabits(e.target.value)} 
             name="drinkingHabits">
            <div className='radio-group'>
                <FormControlLabel value="yes" control={<Radio sx={{ color: 'white' }} />} label="Yes" sx={{ color: 'white' }} />
                <FormControlLabel value="no" control={<Radio sx={{ color: 'white' }} />} label="No" sx={{ color: 'white' }} />
              </div>
            </RadioGroup>
          </FormControl>
      </Grid>
      </Grid>
      <br/><br/>
      <Divider/>
      <br/>
        <Button id='btn' style={{marginLeft: '350px'}} onClick={handleRegister} >
          Submit
        </Button>
    
  </div>
  );
};

export default Register;
