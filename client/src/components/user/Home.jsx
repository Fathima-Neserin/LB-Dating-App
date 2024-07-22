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

const Home = (props) => {
  const { loading = false } = props;

  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then((res) => {
        setUsers(res.data);
        console.log("Fetched all users from MongoDB", res.data);
      })
      .catch((error) => {
        console.log(error);
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
                {loading ? (
                  <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    src={`http://localhost:3001/uploads/${user.profilePhoto || ''}`}
                    alt="Profile Photo"
                    onError={(e) => {
                      console.log('Image failed to load:', `http://localhost:3001/uploads/${user.profilePhoto || ''}`);
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
                        Hobbies: {user.hobbies}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Interests: {user.interests}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="p">
                        Qualification: {user.qualifications}
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
