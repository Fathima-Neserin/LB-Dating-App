import React, { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Topbar from './Topbar';
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';



const Home = () => {
  
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true); // New state for photo loading
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const gender = localStorage.getItem('selectedGender') || 'Both';
    let url = 'http://localhost:3001/users';

    if (gender === 'Men') {
      url = 'http://localhost:3001/users/gender/Men';
    } else if (gender === 'Women') {
      url = 'http://localhost:3001/users/gender/Women';
    }

    axios.get(url)
      .then(async (res) => {
        const userPromises = res.data.map(async (user) => {
          if (user._id) {
            try {
              const profilePhotoUrl = `http://localhost:3001/uploads/${user.profilePhoto}`;
              console.log('Profile Photo URL:', profilePhotoUrl);
              return {
                ...user,
                profilePhoto: profilePhotoUrl
              };
            } catch (error) {
              console.error('Error constructing profile photo URL:', error);
              return { ...user, profilePhoto: 'https://via.placeholder.com/50' }; // Fallback URL
            }
          }
          return { ...user, profilePhoto: 'https://via.placeholder.com/50' }; // Fallback URL
        });

        const usersWithPhotos = await Promise.all(userPromises);
        setUsers(usersWithPhotos);
        setLoadingPhotos(false); // Update loading state
        console.log(`Fetched ${gender} users from MongoDB`, usersWithPhotos);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoadingPhotos(false); // Update loading state
      });
  }, []);

  return (
    <>
    <div><Topbar/></div>
     
      <Sidebar/>
      <div className="card-container">
        <Grid container spacing={1}>
          {users.map((user, i) => (
            <Grid item xs={12} sm={6} md={2} key={i}>
              <Link to={`/unique/${user._id}`} className='unique-link'>
              <Card sx={{ maxWidth: 275 , m: 1  }} >
                <CardHeader
                    style={{
                      textAlign: "center",
                      color: 'rgb(121, 3, 121)',
                      overflow: 'hidden', // Ensures content doesn’t overflow
                      textOverflow: 'ellipsis', // Adds ellipsis if text overflows
                      whiteSpace: 'nowrap' // Prevents text from wrapping
                    }}
                  title={user.displayName}
                  subheader={user.location}
                />
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', height: '180px', overflow: 'hidden' }}>
                  <img
                    height="100"
                     src={user.profilePhoto}
                    alt="Profile Photo"
                    style={{
                      borderRadius: '50%', 
                      objectFit: 'cover',  
                      width: '100%',      
                      height: '80%',
                      padding: " 2px 25px"  ,
                      whiteSpace: 'nowrap'    
                    }}
                    onError={(e) => {
                      const imageUrl = `http://localhost:3001/uploads/${user.profilePhoto}`;
                          console.log('Image URL:', imageUrl);

                      console.log('Image failed to load:', user.profilePhoto);
                      e.target.src = 'https://via.placeholder.com/50%'; // Replace with actual fallback URL
                    }}
                  />
              
                </div>
                <CardContent style={{textAlign: "center"}} >
                 
                    <>
                      <Typography variant="body2" color="text.secondary" noWrap >
                        Qualification: {user.qualifications.join(', ')}
                      </Typography>
                    </>
                  
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Home;
