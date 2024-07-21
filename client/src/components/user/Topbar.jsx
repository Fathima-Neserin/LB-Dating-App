import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';




const Topbar = () => {
    const TopbarContainer = styled(AppBar)(() => ({
      backgroundColor: 'whitesmoke',
      color: 'rgb(121, 3, 121)',
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
        fontSize: '4rem',
      },
    }));
  
    const Header = styled('div')(({ theme }) => ({
      display: 'flex',
      marginLeft: '600px',
      paddingLeft: '14%',
      // fontFamily: 'Georgia, Times New Roman, Times, serif',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    }));
  
    const LinkStyled = styled(Link)({
      marginRight: "20%",
      padding: '5px',
      fontFamily: 'Georgia, Times New Roman, Times, serif',
      textDecoration: 'none',
      fontSize: 30,
      color: 'rgb(121, 3, 121)',
      '&:hover': {
        color: 'white',
        backgroundColor: 'rgb(121, 3, 121)',
      },
    });
  
    return (
      <Box>
        <TopbarContainer>
          <Toolbar>
            <Img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAEXBXGuVuGI0Pqf98iARToYVS23D82bUzMHLKwEq8NJwGnozyd8JmsOX_ikne7_xzYyc&usqp=CAU'
            />
            <Title variant="h4">
              Dating App
            </Title>
            <Header>
              <Button>
              
                <LinkStyled to={'/profile'}> <PersonIcon /></LinkStyled>
                <LinkStyled to={'/'}><ExitToAppIcon/></LinkStyled>
  
  
              </Button>
            </Header>
          </Toolbar>
        </TopbarContainer>
      </Box>
    );
  }
  
  export default Topbar;
  