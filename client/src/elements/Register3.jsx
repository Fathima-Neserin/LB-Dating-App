import React, { useState } from 'react'
import Navbar from './Navbar'
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const Register3 = () => {

  const [shortTerm, setShortTerm] = useState(false);
  const [longTerm, setLongTerm] = useState(false);

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


  return (
    <>
    <div>
        <Navbar/>
    </div>
    <div className='form-container' id='reg-form'>
    <Typography variant='h4' style={{color: "white" , marginLeft: "3%" , paddingBottom: "3% " ,  paddingTop: "10% "}}>
     Relationship:
    </Typography>
    <FormGroup>
  <FormControlLabel control={<Checkbox sx={{color: "white"}}  />} label="Short Term Relationship" sx={{color: "white"}} checked={shortTerm}  onChange={handleShortTerm}/>
  <FormControlLabel  control={<Checkbox sx={{color: "white"}} />} label="Long Term Relationship"sx={{color: "white"}} checked={longTerm} onChange={handleLongTerm} />
   </FormGroup>
   <br/><br/><br/><br/>
   <Box sx={{ margin: '15px 100px', color: 'crimson', padding: "5% " , width: "50%" , height: "60%", fontSize: 25  }}>
          {shortTerm && (
            <span>Wishing you a fun journey on our Dating App!</span>
          )}
          {longTerm && (
            <span>Wishing you happiness on your journey with our Matrimony service!</span>
          )}
        </Box>
        <br/><br/><br/>
        <Divider/>
        <br/><br/>
        <Box display="flex" justifyContent="space-between">
          <Link to={'/reg2'}><Button id='btn'>Back</Button></Link>
          <Link to={'/dashboard'}><Button id='reg-btn'>Register</Button></Link>
        </Box>
    </div>
    
    </>
  )
}

export default Register3