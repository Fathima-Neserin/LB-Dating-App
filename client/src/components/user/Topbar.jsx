import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Topbar = () => {
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

  return (
    <Box>
      <TopbarContainer>
        <Toolbar>
          <Title variant="h4">
            Dating App
          </Title>
          <Header>
            <Button>
              {/* <LinkStyled to={'/profile'}> <PersonIcon /></LinkStyled>
              <LinkStyled to={'/'}><ExitToAppIcon/></LinkStyled> */}
            </Button>
          </Header>
        </Toolbar>
      </TopbarContainer>
    </Box>
  );
}

export default Topbar;
