import React from 'react';
import { createTheme, ThemeProvider, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import homepage from '../../assets/images/homepage.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        justifyContent: 'center',
          minWidth:'100vw',
          minHeight: '100vh',
          bgcolor: 'background.default',
              color: 'primary.dark',
              backgroundImage: `url(${homepage})`,
              backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
          <Typography variant="h1" sx={{
              marginBottom: 2,
              color: 'primary.light',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
          }}>
          404 - Không tìm thấy trang
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          Trở về trang chủ
        </Button>
      </Box>
  );
};

export default NotFoundPage;
