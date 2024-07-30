import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import { Divider, ListItemIcon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const drawerWidth = 203;

function Sidebar() {

  const navigate = useNavigate();

  const listData = [{
    page:'Home',
    link:'/userhome',
    icon:<HomeIcon/>
   },
   { 
    page:'Matches',
    link:'/matches',
    icon:<FavoriteIcon/>
  },
//   {
//    page:'Rented Books',
//    link:'/Rented',
//    icon:<BookmarksOutlinedIcon/>
//   },
   {
    page: 'Profile',
    link:'/profile/:id',
    icon:<PersonIcon/>
    },
    {
    page: 'Signout',
     link: '/',
     icon:<ExitToAppSharpIcon/>
}];
  
const handleLogout = () => {
  
  localStorage.removeItem('Token');
  localStorage.removeItem('accessID');
  localStorage.removeItem('selectedGender');
  // Redirect to login page
    navigate('/');

}

  const drawer = (
    <div className='drawer'>
      <img className='title-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEXBXGuVuGI0Pqf98iARToYVS23D82bUzMHLKwEq8NJwGnozyd8JmsOX_ikne7_xzYyc&usqp=CAU' />
  
      <Toolbar/>
      <List>
        
        {listData.map((val, i) => (
          
          <ListItem key={i} >
            <Link to={val.link} className='side-link' >
            <ListItemButton className='side-text' onClick={val.page === 'Signout' ? handleLogout : null}>
              <ListItemIcon style={{color:'rgb(121, 3, 121)'}}>{val.icon}</ListItemIcon>
              <ListItemText style={{color: 'rgb(121, 3, 121)'}} primary={val.page} />
            </ListItemButton>
           
            </Link>
          </ListItem>
      ))}
      </List>
    </div>
  );
  return (
    <div className='container'>
    
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
          className='drawer'
        >
          {drawer}
        </Drawer>
        </Box>
         </div>
)}
export default Sidebar;