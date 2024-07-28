import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';

const Register2 = () => {

  const [isEmployer, setIsEmployer] = useState(false);
  const [isJobseeker, setIsJobseeker] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [expertiseLevel, setExpertiseLevel] = useState('');

  const navigate = useNavigate();

  const handleEmployer = (event) => {
    setIsEmployer(event.target.checked);
  };

  const handleJobseeker = (event) => {
    setIsJobseeker(event.target.checked);
    if (event.target.checked) {
      setIsEmployer(false);
    }
  };
  
  const handleRegister2 = async (e) => {
    e.preventDefault();
  
    const form2Data = {
      isEmployer,
      isJobseeker,
      companyName,
      designation,
      companyLocation,
      jobTitle,
      expertiseLevel
    };
  
    const accessToken = localStorage.getItem('accessToken');
    const accessId = localStorage.getItem('accessId');
  
    if (!accessId) {
      alert('User ID is missing.');
      return;
    }
  
    try {
      const response = await axios.put(
        'http://localhost:3001/oauth/register2',
        form2Data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
  
      if (response.data.message === "Employment details updated successfully") {
        alert(response.data.message);
        navigate('/reg3');
      } else {
        alert('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Error occurred while updating employment details.');
    }
  };
  
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className='form-container' id='reg-form'>
    <Typography variant='h4' style={{color: "white" , marginLeft: "3%" , paddingBottom: "3% " ,  paddingTop: "10% "}}>
     Employment:
    </Typography>
    <FormGroup>
  <FormControlLabel control={<Checkbox sx={{color: "white"}}  />} label="Employee/Employer" sx={{color: "white"}} checked={isEmployer}  onChange={handleEmployer} />
  <FormControlLabel  control={<Checkbox sx={{color: "white"}} />} label="Jobseeker"sx={{color: "white"}}  checked={isJobseeker} onChange={handleJobseeker}/>
   </FormGroup>
   {isEmployer && (
          <div style={{ marginTop: '20px', color: 'white' }}>
            <TextField
              placeholder="Company Name"
              variant="outlined"
              sx={{ input: {color: 'black', backgroundColor: "white" ,  padding: " 5px " , width: "400px" , height: "50px"  } }}
              InputLabelProps={{ style: { color: 'white' } }}
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />
            <br/><br/>
            <TextField
              placeholder="Designation"
              variant="outlined"
              sx={{ input: { color: 'black', backgroundColor: "white" , padding: " 5px " , width: "400px" , height: "50px"} }}
              InputLabelProps={{ style: { color: 'white' } }}
              onChange={(e) => setDesignation(e.target.value)}
              value={designation}
            />
            <br/><br/>
            <TextField
              placeholder="Location"
              variant="outlined"
              sx={{ input: {color: 'black', backgroundColor: "white", padding: " 5px " , width: "400px" , height: "50px"  } }}
              InputLabelProps={{ style: { color: 'white' } }}
              onChange={(e) => setCompanyLocation(e.target.value)}
              value={companyLocation}
            />
          </div>
        )}
         {isJobseeker && (
          <div style={{ marginTop: '20px', color: 'white' }}>
            <TextField
              placeholder="Jobtitle"
              variant="outlined"
              sx={{ input: {color: 'black', backgroundColor: "white", padding: " 5px " , width: "400px" , height: "50px"  } }}
              InputLabelProps={{ style: { color: 'white' } }}
              onChange={(e) => setJobTitle(e.target.value)}
              value={jobTitle}
            />
            <br/><br/>
            <FormControl component="fieldset" sx={{ marginBottom: '10px' }}>
              <FormLabel component="legend" sx={{ color: 'white' , fontSize: "25px" }} >Expertise Level</FormLabel>
              <br/>
              <RadioGroup
                row
                aria-label="expertise"
                name="row-radio-buttons-group"
                value={expertiseLevel}
                onChange={(e) => setExpertiseLevel(e.target.value)}
              >
                <FormControlLabel
                  value="beginner"
                  control={<Radio sx={{ color: 'white' }} />}
                  label="Beginner"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  value="intermediate"
                  control={<Radio sx={{ color: 'white' }} />}
                  label="Intermediate"
                  sx={{ color: 'white' }}
                />
                <FormControlLabel
                  value="expert"
                  control={<Radio sx={{ color: 'white' }} />}
                  label="Expert"
                  sx={{ color: 'white' }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        )}
        <br/><br/><br/><br/>
        <Divider/>
        <br/><br/>
          <Button id='btn' style={{marginLeft: '350px'}} onClick={handleRegister2}>Submit</Button>
        
    </div>
    
    
    </>
  )
}

export default Register2