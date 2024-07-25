import React, { useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import SmokeFreeOutlinedIcon from '@mui/icons-material/SmokeFreeOutlined';
import LocalBarOutlinedIcon from '@mui/icons-material/LocalBarOutlined';
import NoDrinksOutlinedIcon from '@mui/icons-material/NoDrinksOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const options = [
  'Shortlist',
  'Messages',
  'Sent',
  'Accept',
  "Don't show"
];

const ITEM_HEIGHT = 50;


const Unique = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImages, setShowImages] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImagesButtonClick = () => {
    setShowImages(true);
  };

  const handleReelsButtonClick = () => {
    setShowImages(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
    
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <div style={{ marginTop: '100px', flexShrink: 0 }}>
            <img
              src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'
              alt="Profile Photo"
              style={{
                borderRadius: '50%',
                width: '200px',
                height: '200px',
                cursor: 'pointer'
              }}
              onClick={handleImageClick}
            />
          </div>
          <div className='user-details' style={{ flexGrow: 1 }}>
            <Typography component="p">Fathima Nezrin</Typography><br/>
            <Typography component="p">Wayanad</Typography><br/>
            <Typography component="p">22 years</Typography><br/>
          </div>
          <div>
      <IconButton
        style={{marginTop: "100px"}}
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
          <div style={{ flexBasis: '300px', flexShrink: 0 }}>
            <Card sx={{ maxWidth: '150%', marginTop: 14 }}>
              <CardActionArea>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EmailOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">fathimanezrin@gmail.com</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CallOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">+919961981192</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarMonthOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">08/10/2001</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <SmokeFreeOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                      <NoDrinksOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                      <SmokingRoomsOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                      <LocalBarOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div style={{ flexBasis: '300px', flexShrink: 0 , marginTop: 114}}>
            <Accordion style={{ width: '100%', marginBottom: '10px' }}>
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography style={{ color: 'rgb(121, 3, 121)' }}>Qualification</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxHeight: '200px', overflow: 'auto' }}>
                <ul>
                  <li>PhD in Computer Science</li>
                  <li>MSc in Software Engineering</li>
                  <li>BSc in Computer Science</li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ width: '100%', marginBottom: '10px' }}>
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography style={{ color: 'rgb(121, 3, 121)' }}>Hobbies</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxHeight: '200px', overflow: 'auto' }}>
                <ul>
                  <li>Photography</li>
                  <li>Traveling</li>
                  <li>Reading Books</li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ width: '100%' }}>
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography style={{ color: 'rgb(121, 3, 121)' }}>Interests</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <ul>
                  <li>Machine Learning</li>
                  <li>Artificial Intelligence</li>
                  <li>Web Development</li>
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
       </div>
       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '5px 0', margin: '1px' }}>
        <Button style={{ color: 'rgb(121, 3, 121)' }} onClick={handleImagesButtonClick}>Images</Button>
        <Button style={{ color: 'rgb(121, 3, 121)' }} onClick={handleReelsButtonClick}>Reels</Button>
      </div>
        <div style={{ padding: '10px', borderTop: '1px solid rgb(121, 3, 121)' }}> </div>
          {/* Conditional Images Display Below the Divider */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {showImages ? (
          <>
            <img src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg' alt='Image 1' style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
            <img src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg' alt='Image 2' style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
            <img src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg' alt='Image 3' style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
            <img src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg' alt='Image 4' style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
            <img src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg' alt='Image 5' style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
          </>
        ) : (
          <>
            <video controls width='300' style={{ borderRadius: '8px' }}>
              <source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <video controls width='300' style={{ borderRadius: '8px' }}>
              <source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <video controls width='300' style={{ borderRadius: '8px' }}>
              <source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </>
        )}
      </div>
      
      {/* Modal for profilePhoto */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '300px',
              height: '300px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'
              alt="Profile Photo"
              style={{
                borderRadius: '50%',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Unique;
