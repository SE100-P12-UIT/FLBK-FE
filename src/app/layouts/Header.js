import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useNavigate } from "react-router-dom";
import SignIn from "../pages/Authentication/SignIn/SignIn";

const Header = () => {
  const Navigate = useNavigate();
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
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* Left Section: Icon Button + Text */}
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: 8 }}>
          <IconButton color="inherit">
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

        {/* Right Section: Login and Register Buttons */}
        <Box sx={{ marginRight: 8 }}>
          <Button
            variant="outlined"
            onClick={()=>Navigate("signin")}
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
          <Button
            variant="contained"
            onClick={() => Navigate("signup")}>
            Đăng ký
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
