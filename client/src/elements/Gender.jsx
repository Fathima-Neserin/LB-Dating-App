import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Gender = () => {
  return (
    <div className='gender-page'>
     <div className='qstn-area'>
        
    <Typography variant='h6' sx={{fontFamily: 'Georgia'}}>Which type of gender are you interested in seeing on this platform?</Typography>
     </div>
     <Button id='gender-btn'>Men</Button><br/><br/>
     <Button id='gender-btn'>Women</Button><br/><br/>
    <Link to={'/userhome'}><Button id='gender-btn'>Both</Button></Link><br/><br/>
    </div>
  )
}

export default Gender