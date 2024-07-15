import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Navbar = () => {
  const NavbarContainer = styled(AppBar)(() => ({
    backgroundColor: 'black',
    height: '75px',
  
  }));

  const Img = styled('img')(({ theme }) => ({
    width: '100px',
    height: '70px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px',
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    textAlign: 'left',
    margin: '5px 10px',
    fontSize: '2rem',
    fontFamily: 'Georgia, Times New Roman, Times, serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  }));

  const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    marginLeft: '600px',
    paddingLeft: '14%',
    fontFamily: 'Georgia, Times New Roman, Times, serif',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }));

  const LinkStyled = styled(Link)({
    fontFamily: 'Georgia, Times New Roman, Times, serif',
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'black',
      backgroundColor: 'azure',
    },
  });

  return (
    <Box>
      <NavbarContainer>
        <Toolbar>
          <Img
            src='https://www.savings.com.au/contentAsset/image/dd68d8e1-8ee8-4d70-9702-86be43711e84/fileAsset/filter/Webp/webp_q/50'
          />
          <Title variant="h4">
            Dating App
          </Title>
          <Header>
            <Button>
              <LinkStyled to={'/'}>Signup</LinkStyled>

            </Button>
          </Header>
        </Toolbar>
      </NavbarContainer>
    </Box>
  );
}

export default Navbar;
