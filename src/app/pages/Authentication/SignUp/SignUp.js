import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpCard from './SignUpCard';
import SignupStatic1 from "../../../assets/images/SignupStatic1.png";

export default function SignUp() {

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      justifyContent: 'center',
  gap: { xs: 8, sm: 12 },
    }}>
      <Stack
        direction="column"
        component="main"
        width="100vw"
        height="100vh"
        sx={[
          {
            justifyContent: 'space-between',
          },
          (theme) => ({
            backgroundImage: 'radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundSize: 'cover',
            ...theme.applyStyles('dark', {
              backgroundImage: 'radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            }),
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 12, sm: 20 },
            p: 1,
            margin:'auto',
          }}
        >
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: { xs: 'auto', md: '100%' },
              maxWidth: '300px',
              width: { xs: 'auto', md: '100%' },
              margin: '0 auto',
            }}
          >
            <img
              src={SignupStatic1}
              alt="map"
              style={{
                maxWidth: '100%',
  height: 'auto',
  objectFit: 'contain',
                borderRadius:2,
              }}
            />
          </Box>
          
          <SignUpCard />
        </Stack>
      </Stack>
    </Box>
  );
}
