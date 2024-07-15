import React, { useEffect } from 'react';
import Navbar from '../../elements/Navbar';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const googleId = urlParams.get('googleId');

    if (accessToken && googleId) {
      // Optionally store tokens or user data in session storage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('googleId', googleId);
    } else if (state && state.phoneNumber) {
      // Optionally store phoneNumber or OTP data in session storage
      sessionStorage.setItem('phoneNumber', state.phoneNumber);
    }

    // Navigate to dashboard page regardless of authentication method
    navigate('/dashboard');
    

  }, [state, navigate]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <Typography style={{ marginTop: '10%' }}>Welcome to Dashboard</Typography>
    </>
  );
};

export default Dashboard;
