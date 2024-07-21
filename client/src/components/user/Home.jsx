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
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import axios from 'axios';

const Home = (props) => {
  const { loading = false } = props;

  const [value, setValue] = useState(0);
  const [users, setUser] = useState([]);

 useEffect(()=>{
      
  axios.get('http://localhost:3001/users')
  .then((res)=>{
    setUser(res.data)
    console.log("Fetched all users from mongodB")
  

  })
  .catch((error)=>{
    console.log(error)
  })
 },[])

  return (
    <>
      <div>
        <Topbar />
      </div>
      <div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon sx={{ color: 'rgb(121, 3, 121)' }} />}
              style={{ color: 'rgb(121, 3, 121)' }}
            />
            {/* <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} /> */}
          </BottomNavigation>
        </Paper>
        <div className="card-container">
          <Grid container spacing={4}>
            {users.map((value, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ maxWidth: 345, m: 2 }}>
                  <CardHeader
                    avatar={
                      loading ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                      ) : (
                        <Avatar alt="Profile Photo" src={value.profilePhotoUrl} />
                      )
                    }
                    action={
                      loading ? null : (
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      )
                    }
                    title={value.displayName}
                    subheader={value.email}
                  />
                  {loading ? (
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                  ) : (
                    <CardMedia
                      component="img"
                      height="140"
                      src={value.profilePhotoUrl || 'https://via.placeholder.com/140'}
                      alt="Profile Photo"
                      onError={(e) => {
                        console.log('Image failed to load:', users.profilePhotoUrl);
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
                          Name: {value.displayName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p">
                          Age: {value.age}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p">
                          Email: {value.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p">
                          Hobbies: {value.hobbies}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p">
                          Interests: {value.interests}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p">
                          Qualification: {value.qualifications}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

// Home.propTypes = {
//   loading: PropTypes.bool,
// };

export default Home;
