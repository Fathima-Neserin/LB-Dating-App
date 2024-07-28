import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { formatDate } from './utils/dateUtils'; // Import the utility function
import { formatDate } from '../../utils/dateUtils';



const options = [
  'Shortlist',
  'Messages',
  'Sent',
  'Accept',
  "Don't show"
];

const ITEM_HEIGHT = 50;


const Unique = () => {

  const {id} = useParams();

  const [details, setDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImages, setShowImages] = useState(true);
  const [qualifications, setQualifications] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [interests, setInterests] = useState([]);
  const [multipleImages, setImages] = useState([]);
  const [shortReel, setShortReel] = useState('');
  const [showVideos, setShowVideos] = useState(false);


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
    axios.get(`http://localhost:3001/users/${id}/images`)
      .then((res) => {
        setImages(res.data.map(file => `http://localhost:3001/uploads/${file}`)); // Ensure correct URL format
        setShowImages(true);
        setShowVideos(false);
      })
      .catch(err => console.error('Error fetching images:', err));
  };

  const handleReelsButtonClick = () => {
    console.log('Reels button clicked');
    axios.get(`http://localhost:3001/users/${id}/shortReel`, { responseType: 'blob' })
        .then((res) => {
        console.log('Response received:', res);
        const videoUrl = URL.createObjectURL(res.data);
        setShortReel(videoUrl);
        setShowImages(false);
        setShowVideos(true);
      })
      .catch(err => {
        console.error('Error fetching video:', err);
        alert('Failed to load video. Please check the console for details.');
      });
  };
  
  
  
  
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then((res) => {
        const user = res.data; // Use res.data to get user details
  
        if (user._id) {
          try {
            const profilePhotoUrl = `http://localhost:3001/uploads/${user.profilePhoto}`;
            console.log('Profile Photo URL:', profilePhotoUrl);
  
            // Update the user object with the new profile photo URL
            const updatedUser = {
              ...user,
              profilePhoto: profilePhotoUrl,
              dob: formatDate(user.dob), // Format the date of birth
              smokingHabits: user.smokingHabits,
              drinkingHabits: user.drinkingHabits,
            };
  
            setDetails(updatedUser); // Set the details with the updated user object
           // Fetch qualifications
           axios.get(`http://localhost:3001/users/${id}/qualifications`)
           .then((res) => {
             setQualifications(res.data);
           })
            // Fetch user hobbies
          axios.get(`http://localhost:3001/users/${id}/hobbies`)
          .then((res) => {
            setHobbies(res.data);
          })
           // Fetch user interests
           axios.get(`http://localhost:3001/users/${id}/interests`)
           .then((res) => {
             setInterests(res.data);
           })

          } catch (error) {
            console.error('Error processing user data:', error);
          }
        } else {
          console.error('User ID not found in the response data.');
        }
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, [id]); // Add id to the dependency array to run the effect when id changes
  

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
    
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <div style={{ marginTop: '100px', flexShrink: 0 }}>
            <img
              src={details.profilePhoto}
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
            <Typography component="p">{details.displayName}</Typography><br/>
            <Typography component="p">{details.location}</Typography><br/>
            <Typography component="p">{details.age} years</Typography><br/>
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
                      <Typography component="p">{details.email}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CallOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">{details.phoneNumber}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarMonthOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">{details.dob}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        {/* Conditionally render Smoking icon or No Smoking icon based on smokingHabits */}

                    {details.smokingHabits ? (
                      <SmokingRoomsOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                    ) : (
                      <SmokeFreeOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                    )}

                        {/* Conditionally render Drinking icon or No Drinking icon based on drinkingHabits */}
                    {details.drinkingHabits ? (
                      <LocalBarOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                    ) : (
                      <NoDrinksOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                    )}
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div style={{ flexBasis: '300px', flexShrink: 0 , marginTop: 114}}>
            <Accordion style={{ width: '100%', marginBottom: '10px' }}>
              <AccordionSummary style={{flexWrap: 'nowrap'}} expandIcon={<ArrowDropDownIcon style={{maxHeight: '100px' , overflowY: 'auto'}}/>}>
                <Typography style={{ color: 'rgb(121, 3, 121)' }}>Qualification</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxHeight: '200px', overflow: 'auto' }}>
              <ul>
                  {qualifications.length > 0 ? (
                    qualifications.map((qualification, index) => (
                      <li key={index}>{qualification}</li>
                    ))
                  ) : (
                    null
                  )}
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ width: '100%', marginBottom: '10px' }}>
              <AccordionSummary expandIcon={<ArrowDropDownIcon  style={{maxHeight: '200px' , overflowY: 'auto'}}/>}>
                <Typography style={{ color: 'rgb(121, 3, 121)' }}>Hobbies</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxHeight: '200px', overflow: 'auto' }}>
              <ul>
            {hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ width: '100%' }}>
              <AccordionSummary expandIcon={<ArrowDropDownIcon style={{maxHeight: '200px' , overflowY: 'auto'}}/>}>
                <Typography style={{ color: 'rgb(121, 3, 121)' }}>Interests</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <ul>
            {interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
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
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' , margin: '2px 200px'}}>
          {showImages && (
            <div style={{ marginTop: '20px' }}>
              {multipleImages.length > 0 ? (
                multipleImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`image-${index}`}
                    style={{ width: '35%', height: '70%', margin: '10px 5px' }}
                  />
                ))
              ) : (
                null
              )}
            </div>
          )}

          {/* Conditionally render Videos */}
          {showVideos && shortReel && (
        <div style={{ marginTop: '20px' }}>
            <video
             src={shortReel}
             type="video/mp4"
             controls
             style={{ width: '500px', height: '200px', margin: '10px' }}
            />
         </div>
         )}

      
    
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
              src={details.profilePhoto}
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
    </div>
    </>
  );
}

export default Unique;
