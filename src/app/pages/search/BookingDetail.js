import { Box, createTheme, Typography, Radio, Button, Breadcrumbs, Link } from '@mui/material';
import * as React from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import TimerIcon from '@mui/icons-material/Timer';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RealPlane from "./../../assets/images/RealPlane.png";
import FlightIcon from '@mui/icons-material/Flight';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function BookingDetail() {
  const location = useLocation();
  const flightData = location.state?.flightData;
  const [paymentOption, setPaymentOption] = useState('full');

  // Calculate total price
  const basePrice = parseFloat(flightData?.price || "240");
  const tax = basePrice;
  const total = basePrice + tax;

  return (
    <Box sx={{ p: 3, maxWidth: '1000px', margin: '0 auto' }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            href="/turkey"
            sx={{ color: '#112211' }}
          >
            Turkey
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/turkey/istanbul"
            sx={{ color: '#112211' }}
          >
            Istanbul
          </Link>
          <Typography color="text.primary">
            CVK Park Bosphorus Hotel Istanbul
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Flight Details Box */}
        <Box sx={{ 
          bgcolor: 'white', 
          borderRadius: 2,
          p: 3,
          flex: '1.5',
          boxShadow: '0px 4px 16px rgba(17, 34, 17, 0.05)'
        }}>
          {/* Route and Price */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{flightData?.aircraft || "EWR-BNA"}</Typography>
              <Typography variant="caption">Return Wed, Dec 8</Typography>
            </Box>
            <Box>
              <Typography variant="h5" color="#FF8682" fontWeight="bold">${flightData?.price || "240"}</Typography>
              <Typography variant="caption">{flightData?.duration || "2h 28m"}</Typography>
            </Box>
          </Box>

          {/* Airline Info and Amenities */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              border: '1px solid #8DD3BB',
              borderRadius: 1,
              padding: '8px 16px'
            }}>
              <img src={flightData?.airlineLogo || "/emirates.png"} alt={flightData?.airline || "Emirates"} width={40} height={40} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">{flightData?.route1 || "Emirates A380 Airbus"}</Typography>
                <Typography variant="caption">{flightData?.aircraftType || "Airbus A320"}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <FlightIcon sx={{transform: 'rotate(180deg)'}}/>
              <WifiIcon />
              <TimerIcon/>
              <FastfoodIcon />
              <AirlineSeatReclineNormalIcon />
            </Box>
          </Box>

          {/* Flight Times */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6">{flightData?.departureTime || "12:00 pm"}</Typography>
              <Typography variant="caption" color="text.secondary">{flightData?.departureLocation || "Newark(EWR)"}</Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ 
                height: 2, 
                flex: 1, 
                bgcolor: '#D9D9D9',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 24,
                  height: 24,
                  bgcolor: '#D9D9D9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }}>
                <FlightIcon sx={{ 
                  position: 'absolute',
                  top: -20,
                  left: '50%',
                  transform: 'translateX(-50%) rotate(90deg)',
                  color: '#112211',
                  zIndex: 1,
                  fontSize: 50
                }} />
              </Box>
            </Box>
            <Box>
              <Typography variant="h6">{flightData?.arrivalTime || "12:00 pm"}</Typography>
              <Typography variant="caption" color="text.secondary">{flightData?.arrivalLocation || "Newark(EWR)"}</Typography>
            </Box>
          </Box>

          {/* Payment Options */}
          <Box sx={{ mb: 3 }}>
            <Box 
              sx={{ 
                bgcolor: paymentOption === 'full' ? '#8DD3BB' : '#F4F6F5', 
                p: 2, 
                borderRadius: 1, 
                mb: 2,
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={() => setPaymentOption('full')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Radio 
                  checked={paymentOption === 'full'}
                  onChange={() => setPaymentOption('full')}
                  value="full"
                  sx={{
                    color: paymentOption === 'full' ? 'white' : 'inherit',
                    '&.Mui-checked': {
                      color: 'white',
                    }
                  }}
                />
                <Typography sx={{ color: paymentOption === 'full' ? '#112211' : 'inherit' }}>
                  Pay in full
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: paymentOption === 'full' ? '#112211' : 'inherit' }}>
                Pay the total and you are all set
              </Typography>
            </Box>

            <Box 
              sx={{ 
                bgcolor: paymentOption === 'partial' ? '#8DD3BB' : '#F4F6F5', 
                p: 2, 
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={() => setPaymentOption('partial')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Radio 
                  checked={paymentOption === 'partial'}
                  onChange={() => setPaymentOption('partial')}
                  value="partial"
                  sx={{
                    color: paymentOption === 'partial' ? 'white' : 'inherit',
                    '&.Mui-checked': {
                      color: 'white',
                    }
                  }}
                />
                <Typography sx={{ color: paymentOption === 'partial' ? '#112211' : 'inherit' }}>
                  Pay part now, part later
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: paymentOption === 'partial' ? '#112211' : 'inherit' }}>
                Pay $207.43 now and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Combined Summary and Price Details Box */}
        <Box sx={{ 
          bgcolor: 'white', 
          borderRadius: 2,
          p: 3,
          flex: '1',
          boxShadow: '0px 4px 16px rgba(17, 34, 17, 0.05)'
        }}>
          {/* Flight Summary Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: 2, overflow: 'hidden' }}>
            <img 
              src={RealPlane} 
              alt="Aircraft"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Economy</Typography>
            <Typography variant="subtitle1">{flightData?.airlineName} A380 Airbus</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Box sx={{
                display: "inline-flex",
                borderRadius: 1,
                border: "2px solid #8DD3BB",
                padding: "2px 8px"
              }}>
                <Typography variant="subtitle2">{flightData?.rating}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {flightData?.reviews}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Price Details Section */}
        <Typography variant="h6" mb={2}>Chi tiết hóa đơn</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Giá vé</Typography>
          <Typography>{flightData?.price}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Số lượng</Typography>
          <Typography>1</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Thuế và phí</Typography>
          <Typography>{flightData?.price}</Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 2,
          pt: 2,
          borderTop: '1px solid #E7E8E7'
        }}>
          <Typography fontWeight="bold">Tổng</Typography>
          <Typography fontWeight="bold">
            ${parseFloat(flightData?.price?.replace('$', '') || 0) * 2}
          </Typography>
        </Box>

        {/* Book Button */}
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            bgcolor: '#8DD3BB',
            color: '#112211',
            mt: 3,
            '&:hover': {
              bgcolor: '#7CC3AB'
            }
          }}
        >
          Đặt vé
        </Button>
      </Box>
    </Box>
    </Box>
  );
}

export default BookingDetail;