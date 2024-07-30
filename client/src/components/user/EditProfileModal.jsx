import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

const EditProfileModal = ({ open, handleClose, userData, handleSave }) => {

  const [formData, setFormData] = useState({
    displayName: '',
    location: '',
    age: '',
    email: '',
    phoneNumber: '',
    dob: '',
    smokingHabits: false,
    drinkingHabits: false,
    profilePhoto: null,
    ...userData
  });
  useEffect(() => {
    if (userData) {
      // Function to convert DD/MM/YY to YYYY-MM-DD
      const convertDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        const fullYear = year.length === 2
    ? (Number(year) > 50 ? `19${year}` : `20${year}`) // Example: if year > 50, assume 1900s, otherwise 2000s
    : year; // For years already in YYYY format
  return `${fullYear}-${month}-${day}`;
      };
  
      setFormData({
        displayName: userData.displayName || '',
        location: userData.location || '',
        age: userData.age || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        dob: userData.dob ? convertDate(userData.dob) : '', // Convert date format
        smokingHabits: userData.smokingHabits || false,
        drinkingHabits: userData.drinkingHabits || false,
        profilePhoto: userData.profilePhoto || null
      });
    }
  }, [userData]);
  
  

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{color: 'rgb(121, 3, 121'}}>Edit Profile</DialogTitle>
      <DialogContent>
      <Grid container spacing={2}>
      <Grid item xs={12}>
  <Typography>Profile Picture</Typography>
  <Button variant="contained" component="label" style={{marginRight: '10px' , backgroundColor: 'rgb(121, 3,121'}}>
    Edit Profile Picture
    <input
      type="file"
      hidden
      onChange={handleFileChange}
    />
  </Button>
  {formData.profilePhoto && typeof formData.profilePhoto === 'string' && (
    <img src={formData.profilePhoto} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
  )}
  {formData.profilePhoto && formData.profilePhoto instanceof File && <Typography>{formData.profilePhoto.name}</Typography>}
</Grid>
          <Grid item xs={12}>
            <TextField
              label=" Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={handleChange}
             fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    name="smokingHabits"
                    checked={formData.smokingHabits}
                    onChange={handleChange}
                  />
                }
                label="Smokes"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    name="drinkingHabits"
                    checked={formData.drinkingHabits}
                    onChange={handleChange}
                  />
                }
                label="Drinks"
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{justifyContent: 'space-between',  margin: '0px 70px'}}>
        <Button onClick={handleClose} style={{color: 'rgb(121 , 3, 121' , }}>Cancel</Button>
        <Button onClick={handleSubmit} style={{backgroundColor: 'rgb(121,3,121', color: 'white'}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
