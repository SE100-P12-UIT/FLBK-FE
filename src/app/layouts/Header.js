import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "./../assets/icon/Logo.svg";
import { toast } from "react-toastify";
import { userLogout } from "../stores/actions/authActions";
import LogoutIcon from "@mui/icons-material/Logout";
import YesNoModal from "../components/YesNoModal";
import { useState } from "react";

const Header = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(userLogout()).unwrap();
      if (resultAction) {
        toast.success("Đăng xuất thành công");
        Navigate("/signin");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      console.error("Failed to logout:", error);
    }
  };

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
          <IconButton href="/home">
            <img src={Logo} alt="Logo"></img>
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
        {!isAuthenticated ? (
          <Box sx={{ m: "auto" }}>
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
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", m: "auto" }}>
            <IconButton
              href="/user/profile"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
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

            <IconButton onClick={() => setOpenLogoutModal(true)} color="inherit">
              <LogoutIcon />
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
                Đăng xuất
              </Typography>
            </IconButton>
          </Box>
        )}
      </Toolbar>
      <YesNoModal
        title="Đăng xuất"
        content="Bạn có chắc chắn muốn đăng xuất?"
        open={openLogoutModal}
        setOpen={setOpenLogoutModal}
        onYes={handleLogout}
        onNo={() => setOpenLogoutModal(false)}
      />
    </AppBar>
  );
};

export default Header;
