import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import * as React from "react";
import LoginStatic1 from "../../../assets/images/LoginStatic1.png";
import SignInCard from "./SignInCard";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Logo from "../../../assets/icon/Logo.svg";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const Navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
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
          <Box sx={{ display: "flex", alignItems: "center", m: "auto" }}>
            <IconButton onClick={()=>Navigate("/home")}>
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
        </Toolbar>
      </AppBar>
      <Stack
        direction="column"
        component="main"
        width="100vw"
        height="100vh"
        sx={[
          {
            justifyContent: "space-between",
          },
          (theme) => ({
            backgroundImage:
              "radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
            backgroundSize: "cover",
            ...theme.applyStyles("dark", {
              backgroundImage:
                "radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
            }),
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 12, sm: 20 },
            p: 1,
            margin: "auto",
          }}
        >
          <SignInCard />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: { xs: "auto", md: "100%" },
              maxWidth: "300px",
              width: "100%",
            }}
          >
            <img
              src={LoginStatic1}
              alt="map"
              style={{
                width: "120%",
                height: "120%",
                objectFit: "scale-down",
                borderRadius: 2,
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
