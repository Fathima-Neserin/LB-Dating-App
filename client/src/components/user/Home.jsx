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

const Home = (props) => {
  const { loading = false } = props;
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
              const profilePhotoUrl = `http://localhost:3001/users/user/${user._id}/profile-photo`;
              const photoResponse = await axios.get(profilePhotoUrl, { responseType: 'json' });
              // const { photoUrl } = photoResponse.data;
              // return { ...user, profilePhoto: photoUrl };
              const { base64Image, contentType } = photoResponse.data;
              setProfilePhoto(`data:${contentType};base64,${base64Image}`);
            } catch (error) {
              console.error('Error fetching profile photo:', error);
              return { ...user, profilePhoto: 'https://via.placeholder.com/140' }; // Fallback URL
            }
          }
          return { ...user, profilePhoto: 'https://via.placeholder.com/140' }; // Fallback URL
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
      <Topbar />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon sx={{ color: 'rgb(121, 3, 121)' }} />}
            style={{ color: 'rgb(121, 3, 121)' }}
          />
        </BottomNavigation>
      </Paper>
      <div className="card-container">
        <Grid container spacing={4}>
          {users.map((user, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ maxWidth: 345, m: 2 }}>
                <CardHeader
                  action={
                    loading ? null : (
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    )
                  }
                  title={user.displayName}
                  subheader={user.email}
                />
                {loadingPhotos ? (
                  <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    image={user.profilePhoto}
                    alt="Profile Photo"
                    onError={(e) => {
                      console.log('Image failed to load:', user.profilePhoto);
                      e.target.src = 'https://via.placeholder.com/140'; // Replace with actual fallback URL
                    }}
                  />
                )}
                <CardContent>
                  {loading ? (
                    <>
                      <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                      <Skeleton animation="wave" height={10} width="80%" />
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Name: {user.displayName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Age: {user.age}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Email: {user.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Hobbies: {user.hobbies.join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Interests: {user.interests.join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Qualification: {user.qualifications.join(', ')}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Home;
