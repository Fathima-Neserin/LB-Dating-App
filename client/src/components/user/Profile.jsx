import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import LocalBarOutlinedIcon from '@mui/icons-material/LocalBarOutlined';
import SmokeFreeOutlinedIcon from '@mui/icons-material/SmokeFreeOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NoDrinksOutlinedIcon from '@mui/icons-material/NoDrinksOutlined';
import axios from 'axios';
import { formatDate } from '../../utils/dateUtils';
import EditProfileModal from './EditProfileModal';



const Profile = () => {  
    
  const [user,setUser] = useState({});

  const [showImages, setShowImages] = useState(true);
  const [qualifications, setQualifications] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [interests, setInterests] = useState([]);
  const [multipleImages, setImages] = useState([]);
  const [shortReel, setShortReel] = useState('');
  const [showVideos, setShowVideos] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // Retrieve userId from sessionStorage
  const userId = localStorage.getItem('accessID');
  const token = localStorage.getItem('Token');

  const handleImagesButtonClick = () => {
    axios.get(`http://localhost:3001/users/${userId}/images`)
      .then((res) => {
        setImages(res.data.map(file => `http://localhost:3001/uploads/${file}`)); // Ensure correct URL format
        setShowImages(true);
        setShowVideos(false);
      })
      .catch(err => console.error('Error fetching images:', err));
  };

  
  const handleReelsButtonClick = () => {
    console.log('Reels button clicked');
    axios.get(`http://localhost:3001/users/${userId}/shortReel`, { responseType: 'blob' })
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

    const token = localStorage.getItem('Token');
    const userId = localStorage.getItem('accessID');
    console.log('Retrieved token:', token);

    if (!token) {
      console.error('No token found in session storage');
      return;
    }
  
    axios.get(`http://localhost:3001/users/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include token if required
      }
    })
      .then((res) => {
        console.log('User data:', res.data);

        const { user } = res.data;
       if (user) {
          try {
            const profilePhotoUrl = `http://localhost:3001/uploads/${user.profilePhoto}`;
            console.log('Profile Photo URL:', profilePhotoUrl);
  
            const updatedUser = {
              ...user,
              profilePhoto: profilePhotoUrl,
              dob: formatDate(user.dob),
              smokingHabits: user.smokingHabits,
              drinkingHabits: user.drinkingHabits,
            };
  
            setUser(updatedUser);
  
            // Fetch additional data
            axios.get(`http://localhost:3001/users/${userId}/qualifications`, {
              headers: { Authorization: `Bearer ${token}` } // Include token if required
            }).then((res) => {
              setQualifications(res.data);
            }).catch(err => console.error('Error fetching qualifications:', err));
  
            axios.get(`http://localhost:3001/users/${userId}/hobbies`, {
              headers: { Authorization: `Bearer ${token}` } // Include token if required
            }).then((res) => {
              setHobbies(res.data);
            }).catch(err => console.error('Error fetching hobbies:', err));
  
            axios.get(`http://localhost:3001/users/${userId}/interests`, {
              headers: { Authorization: `Bearer ${token}` } // Include token if required
            }).then((res) => {
              setInterests(res.data);
            }).catch(err => console.error('Error fetching interests:', err));
  
          } catch (error) {
            console.error('Error processing user data:', error);
          }
        } else {
          console.error('User ID not found in the response data.');
        }
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, [userId, token]); // Add token to dependency array if used

  
  const handleEditProfile = (updatedData) => {
    // Assuming userId and token are defined and available in the component's scope
    axios.put(`http://localhost:3001/users/edit/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if(res.data.message ==='User details updated successfully'){
          alert(res.data.message)   
          setUser(res.data.user);
          // window.location.reload(true);

        }
         
      })
      .catch(err => console.error('Error updating user data:', err));
  };
  

  return (
    <>
     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar/>
    
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <div style={{ marginTop: '100px', flexShrink: 0 }}>
            <img
              src={user.profilePhoto}
              alt="Profile Photo"
              style={{
                borderRadius: '50%',
                width: '200px',
                height: '200px',
                cursor: 'pointer'
              }}
            />
          </div>
          <div className='user-details' style={{ flexGrow: 1 }}>
            <Typography component="p">{user.displayName}</Typography><br/>
            <Typography component="p">{user.location}</Typography><br/>
            <Typography component="p">{user.age} years</Typography><br/>
          </div>
          <div>
            <br/><br/><br/>
     <div style={{marginTop: '350px'}}>
        <Button style={{backgroundColor: 'rgb(121, 3,121)', color:'white', width: '280px'}} onClick={() => setModalOpen(true)}>Edit Profile</Button>
     </div>
    </div>
          <div style={{ flexBasis: '300px', flexShrink: 0 }}>
            <Card sx={{ maxWidth: '150%', marginTop: 14 }}>
              <CardActionArea>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EmailOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">{user.email}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' , width: '60px'}}>
                      <CallOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">{user.phoneNumber}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarMonthOutlinedIcon style={{ marginRight: '10px', color: 'rgb(121, 3, 121)' }} />
                      <Typography component="p">{user.dob}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        {/* Conditionally render Smoking icon or No Smoking icon based on smokingHabits */}

                    {user.smokingHabits ? (
                      <SmokingRoomsOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                    ) : (
                      <SmokeFreeOutlinedIcon style={{ color: 'rgb(121, 3, 121)', margin: '0px 8px' }} />
                    )}

                        {/* Conditionally render Drinking icon or No Drinking icon based on drinkingHabits */}
                    {user.drinkingHabits ? (
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
        
        </div>
        </div>
        <EditProfileModal
        open={isModalOpen}
        handleClose={() => setModalOpen(false)}
        userData={user}
        handleSave={handleEditProfile}
      />
    </>
  )
}

export default Profile
