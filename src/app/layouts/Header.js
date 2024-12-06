import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography, Box } from '@mui/material';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

const Header = () => {
  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: 'transparent', 
        boxShadow: 'none', 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section: Icon Button + Text */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft:8, }}>
          <IconButton color="inherit" >
            <AirplaneTicketIcon />
            <Typography variant="h6" sx={{ ml: 1, textShadow: `
          2px 2px 4px white, 
          -2px -2px 4px white, 
          2px -2px 4px white, 
          -2px 2px 4px white`, }}>
            Tìm chuyến bay
          </Typography>
          </IconButton>
          
        </Box>

        {/* Right Section: Login and Register Buttons */}
        <Box sx={{marginRight:8}}>
          <Button variant='outlined' sx={{ marginRight: 2,textShadow: `
          2px 2px 4px white, 
          -2px -2px 4px white, 
          2px -2px 4px white, 
          -2px 2px 4px white`, }}>
            Đăng nhập
          </Button>
          <Button variant='contained'>
            Đăng ký
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;