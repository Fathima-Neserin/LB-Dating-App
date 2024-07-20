import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Typography, InputLabel, MenuItem, FormControl, Select, Box, Chip, RadioGroup, FormControlLabel, Radio, FormLabel, Grid, Input, Button, Divider, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { textAlign } from '@mui/system';

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

  const countryCode = '+91';
  const [age, setAge] = useState();
  const [hobbies, setHobbies] = useState([]);
  const [interests, setInterest] = useState([]);
  const [qualifications, setQualification] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [multipleImagesUrls, setMultipleImagesUrls] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+91')
  const [dob, setDOB] = useState(null);
  const [smokingHabits, setSmokingHabits] = useState(false);
  const [drinkingHabits, setDrinkingHabits] = useState(false);
  const [gender, setGender] = useState('')


  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

  }

  const handleBlur = () => {
    setEmailError(!validateEmail(email));
  };

  const validateMobile = (mobile) => {
    // Remove country code from the mobile number
    const numberWithoutCountryCode = mobile.replace(countryCode, '');
    // Check if the remaining number has exactly 10 digits
    const isValid = /^\d{10}$/.test(numberWithoutCountryCode);
    // Set mobileError state based on validation result
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
  
    // Update state based on the name of the input field
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

  const handleValue = (event) => {
    const { target: { value } } = event;
    setHobbies(typeof value === 'string' ? value.split(',') : value);
  };

  const handleInterest = (event) => {
    const { target: { value } } = event;
    setInterest(typeof value === 'string' ? value.split(',') : value);
  };

  const handleQualification = (event) => {
    const { target: { value } } = event;
    setQualification(typeof value === 'string' ? value.split(',') : value);
  };

  const handleProfilePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setProfilePhotoUrl(URL.createObjectURL(file));    }
  };

  const handleUploadClick = () => {
    // Handle file upload logic here, e.g., upload to server
    console.log('Uploading profile photo:', profilePhoto);
  };

  const handleMultipleImage = (event) => {
    const files = Array.from(event.target.files);
    setMultipleImages(prevImages => [...prevImages, ...files]);
    
    const urls = files.map(file => URL.createObjectURL(file));
    setMultipleImagesUrls(prevUrls => [...prevUrls, ...urls]);
  };

  const handleMultipleUpload = () => {
    // Handle file upload logic here, e.g., upload to server
    console.log('Uploading profile photo:', profilePhoto);
    console.log('Uploading post images:', multipleImages);
  };

  const handleShortReel = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  const handleShortReelUpload = () => {
    // Your upload logic for video here
    console.log(videoFile);
  };
  const theme = useTheme();

  

  useEffect(() => {
    const formData = {
      displayName,
      email,
      phoneNumber,
      gender,
      age,
      hobbies,
      interests,
      qualifications,
      dob: dob ? dob.toISOString() : null,  // Convert Date to ISO string
      smokingHabits,
      drinkingHabits,
      profilePhotoUrl,
      videoUrl,
      multipleImagesUrls
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [displayName,email,phoneNumber, gender,age,dob, hobbies, interests,qualifications, smokingHabits, drinkingHabits, profilePhotoUrl, multipleImagesUrls, videoUrl]);

 

  return (
    <div className='form-container' id='reg-form'>
      <Typography>
        "Welcome to our Dating App,<br/> Your journey to finding meaningful connections starts here.<br/> Explore, connect, and discover the magic of meeting someone special. Happy matching!"
      </Typography>
      <br /><br />
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={6}>
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
        sx={{ my: 2 ,  m: 1, width: '100%', backgroundColor: 'white'}}
      />
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
        sx={{ my: 2, m: 1, width: '100%', backgroundColor: 'white' }}
        inputProps={{ style: { color: 'black' } }}
       
     />
         

          <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }} variant='outlined'>
            <InputLabel>Age</InputLabel>
            <Select value={age} onChange={handleChange}>
              <MenuItem value=""></MenuItem>
              {Array.from({ length: 18 }, (_, i) => (
                <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
              ))}
            </Select>
            </FormControl>

            <br/>
         
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
          <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
            <InputLabel id="demo-multiple-name-label">Hobbies</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={hobbies}
              onChange={handleValue}
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

        {/* Right Column */}
        <Grid item xs={6}>
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={(newValue) => setDOB(newValue)}
                sx={{m: 1, width: '100%' , backgroundColor: 'white' }}
              />
            </LocalizationProvider>
          </div>
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
          <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
            <InputLabel id="demo-multiple-name-label">Interests</InputLabel>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: '100%', backgroundColor: 'white' }}>
                <Typography sx={{ pt: '10px', pl: 1 }}>Profile Photo</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Input type="file" onChange={handleProfilePhoto} />
                  <Button onClick={handleUploadClick} variant="contained" color='primary' disabled={!profilePhoto} sx={{ m: 2, p: 2 }}>
                    Upload
                  </Button>
                </Box>
                {profilePhotoUrl && (
                  <Box sx={{ m: 1 , p :1 }}>
                    <Typography variant="body2">Selected file:</Typography>
                    <img src={profilePhotoUrl} alt="Profile Photo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </Box>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, width: '210%', backgroundColor: 'white' }}>
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
                {multipleImagesUrls.length > 0 && (
                  <Box sx={{ m: 1 }}>
                    <Typography variant="body2">Selected files:</Typography>
                    {multipleImagesUrls.map((url, index) => (
                      <img key={index} src={url} alt={`Post Image ${index + 1},`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
                    ))}
                   </Box> 
                )}</FormControl>
            
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        
        <Grid item xs={6}>
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
            {videoFile && (
              <Typography variant="body2" sx={{ m: 1 }}>
                1 video selected
              </Typography>
            )}
            <Grid item xs={4} sm={4} md={4}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleShortReelUpload} 
                disabled={!videoFile} 
                sx={{ ml: 5, mb: 1, pt: 1, display: 'flex', flexWrap: 'wrap'}}
              >
                Upload
              </Button>
            </Grid>
          </Box>
          {videoUrl && (
            <Box sx={{ m: 1 }}>
              <Typography variant="body2">Selected video:</Typography>
              <video 
                controls
                src={videoUrl} 
                alt="Selected Video" 
                style={{ maxWidth: '300px', maxHeight: '300px', marginRight: '10px' }} 
              />
            </Box>
          )}
        </FormControl>
      </Grid>
      </Grid>
      <br/>
      <Divider/>
      <br/>
      <Link to={'/reg2'}><Button id='btn' style={{margin: " 5px 350px" }} >Next</Button></Link>
    </div>
  );
};

export default Register;
