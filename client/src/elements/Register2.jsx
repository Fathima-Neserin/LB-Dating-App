import React, { useState } from 'react'
import Navbar from './Navbar'
import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

const Register2 = () => {

  const [isEmployer, setIsEmployer] = useState(false);
  const [isJobseeker, setIsJobseeker] = useState(false);

  const handleEmployer = (event) => {
    setIsEmployer(event.target.checked);
  };

  const handleJobseeker = (event) => {
    setIsJobseeker(event.target.checked);
    if (event.target.checked) {
      setIsEmployer(false);
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
            />
            <br/><br/>
            <TextField
              placeholder="Designation"
              variant="outlined"
              sx={{ input: { color: 'black', backgroundColor: "white" , padding: " 5px " , width: "400px" , height: "50px"} }}
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <br/><br/>
            <TextField
              placeholder="Location"
              variant="outlined"
              sx={{ input: {color: 'black', backgroundColor: "white", padding: " 5px " , width: "400px" , height: "50px"  } }}
              InputLabelProps={{ style: { color: 'white' } }}
              
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
            />
            <br/><br/>
            <FormControl component="fieldset" sx={{ marginBottom: '10px' }}>
              <FormLabel component="legend" sx={{ color: 'white' , fontSize: "25px" }} >Expertise Level</FormLabel>
              <br/>
              <RadioGroup row aria-label="expertise" name="row-radio-buttons-group">
                <FormControlLabel value="beginner" control={<Radio sx={{ color: 'white' }} />} label="Beginner" sx={{ color: 'white' }} />
                <FormControlLabel value="intermediate" control={<Radio sx={{ color: 'white' }} />} label="Intermediate" sx={{ color: 'white' }} />
                <FormControlLabel value="expert" control={<Radio sx={{ color: 'white' }} />} label="Expert" sx={{ color: 'white' }} />
              </RadioGroup>
            </FormControl>
          </div>
        )}
        <br/><br/><br/><br/>
        <Divider/>
        <br/><br/>
        <Box display="flex" justifyContent="space-between">
          <Link to={'/register'}><Button id='btn'>Back</Button></Link>
          <Link to={'/reg3'}><Button id='btn'>Next</Button></Link>
        </Box>
    </div>
    
    
    </>
  )
}

export default Register2