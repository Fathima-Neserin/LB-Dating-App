import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import InputBase from '@mui/material/InputBase';


const Topbar = ({onSearch}) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const TopbarContainer = styled(AppBar)(() => ({
    backgroundColor: 'white',
    color: 'rgb(121, 3, 121)',
    height: '100px',
  }));

  const Title = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    textAlign: 'left',
    margin: '25px',
    fontSize: '2rem',
    fontFamily: 'Georgia, Times New Roman, Times, serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4rem',
    },
    marginLeft: '200px', // Add margin-left to ensure visibility
  }));

  const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    marginLeft: 'auto',
    paddingLeft: '14%',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }));

  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'rgb(121,3,121)',
  border:  'solid 1px rgb(121,3,121)',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

  return (
    <Box>
      <TopbarContainer>
        <Toolbar>
          <Title variant="h4">
            Dating App
          </Title>
         
          <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <Button onClick={handleSearch} style={{ marginLeft: '10px' }}>
            <SearchIcon  style={{color: 'rgb(121,3,121)'}}/>
            </Button>
           
             
          
         
        </Toolbar>
      </TopbarContainer>
    </Box>
  );
}

export default Topbar;
