import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import * as React from "react";
import SignupStatic1 from "../../../assets/images/SignupStatic1.png";
import SignUpCard from "./SignUpCard";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Logo from "../../../assets/icon/Logo.svg";

export default function SignUp() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // justifyContent: "center",
        // gap: { xs: 8, sm: 12 },
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
            alignItems: "center",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", m: "auto" }}>
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
        </Toolbar>
      </AppBar>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 4, sm: 6 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          flexGrow: 1,
          padding: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: "400px" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={SignupStatic1}
            alt="Static Illustration"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 2,
            maxWidth: { xs: "100%", md: "100%" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SignUpCard />
        </Box>
          
        
      </Stack>
    </Box>
  );
}
