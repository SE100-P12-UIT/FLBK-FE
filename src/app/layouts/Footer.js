import React from 'react';
import { Box, Typography, Grid, Link, SvgIcon, IconButton } from '@mui/material';
import Logo from './../assets/icon/Logo.svg';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {
  return (
    <Box sx={{display:'flex',width:'100%', backgroundColor: '#8DD3BB', p:4, color: '#000' }}>
      <Grid container spacing={1}>
        {/* Logo Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <img src={Logo} alt="FLBK Logo" style={{ width: '48px', height: 'auto', marginBottom: '16px' }} />
          <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            FLBK
          </Typography>
          </Box>
        
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <IconButton href="#" sx={{ color: 'inherit' }}>
              <FacebookIcon/>
            </IconButton>
            <IconButton href="#" sx={{ color: 'inherit' }}>
              <XIcon/>
            </IconButton>
            <IconButton href="#" sx={{ color: 'inherit' }}>
              <YouTubeIcon/>
            </IconButton>
            <IconButton href="#" sx={{ color: 'inherit' }}>
              <InstagramIcon/>
            </IconButton>
          </Box>
        </Grid>

        {/* Important Information */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Thông tin cần thiết
          </Typography>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Thanh toán giao và nhận
          </Link>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Điều khoản sử dụng
          </Link>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Chính sách bảo mật
          </Link>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Giấy tờ tùy thân
          </Link>
        </Grid>

        {/* Booking Information */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Thông tin đặt chỗ
          </Typography>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Hướng dẫn đặt chỗ
          </Link>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Quản lý đặt chỗ
          </Link>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Kênh thanh toán
          </Link>
        </Grid>

        {/* Services */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Các dịch vụ
          </Typography>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Dịch vụ trên chuyến bay
          </Link>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Dịch vụ hành lý
          </Link>
          <Link href="#" underline="hover" sx={{ display: 'block', color: 'inherit' }}>
            Hàng hóa
          </Link>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Liên hệ
          </Typography>
          <Typography>Email: abcd@gmail.com</Typography>
          <Typography>Tel: 0987654321</Typography>
          <Typography>Fanpage: ________________</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;