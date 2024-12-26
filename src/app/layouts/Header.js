import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Icon,
} from "@mui/material";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useNavigate } from "react-router-dom";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import Logo from "./../assets/icon/Logo.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";

const Header = () => {
  const Navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        minWidth: "400px",
      }}
    >
      <Toolbar
        sx={{
          justifyContent:"space-between",
          flexDirection: { xs: "column", sm: "row" },
          p: 2,
        }}
      >
        {/* Left Section: Icon Button + Text */}
        <Box sx={{ display: "flex", alignItems: "center", m: "auto" }}>
          <IconButton href="/search" color="inherit">
            <AirplaneTicketIcon />
            <Typography
              variant="h6"
              sx={{
                ml: 1,
                color: "#000000",
                textShadow: `
          2px 2px 4px white, 
          -2px -2px 4px white, 
          2px -2px 4px white, 
          -2px 2px 4px white`,
              }}
            >
              Tìm chuyến bay
            </Typography>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 2,
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton href="/home" >

            <img src={Logo}></img>
            <Typography
            variant="h1"
            sx={{
              color: "#000000",
            }}
          >
            FLBK
          </Typography>
          </IconButton>
          
        </Box>

        {/* Right Section: Login and Register Buttons */}
        {(!isAuthenticated) ? (<Box sx={{ m: "auto" }}>
          <Button
            variant="outlined"
            onClick={() => Navigate("/signin")}
            sx={{
              marginRight: 2,
              color: "#000000",
              textShadow: `
          2px 2px 4px white, 
          -2px -2px 4px white, 
          2px -2px 4px white, 
          -2px 2px 4px white`,
            }}
          >
            Đăng nhập
          </Button>
          <Button variant="contained" onClick={() => Navigate("/signup")}>
            Đăng ký
          </Button>
        </Box>) : (
            <Box sx={{ display: "flex", alignItems: "center", m: "auto" }}>
            <IconButton href="/user/profile" color="inherit">
              <AccountCircleIcon />
              <Typography
                variant="h6"
                sx={{
                  ml: 1,
                  color: "#000000",
                  textShadow: `
            2px 2px 4px white, 
            -2px -2px 4px white, 
            2px -2px 4px white, 
            -2px 2px 4px white`,
                }}
              >
                Hồ sơ
              </Typography>
            </IconButton>
          </Box>
            
            
        )}
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
