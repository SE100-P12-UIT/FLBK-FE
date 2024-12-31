import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FlightIcon from '@mui/icons-material/Flight';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TimerIcon from '@mui/icons-material/Timer';
import WifiIcon from '@mui/icons-material/Wifi';
import { Box, Breadcrumbs, Button, Link, Radio, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RealPlane from "./../../assets/images/RealPlane.png";
import RealPlaneVNAir from "./../../assets/images/RealPlaneVNAir.png";
import RealPlaneVJet from "./../../assets/images/RealPlaneVietJet.png";
import RealPlaneBamboo from "./../../assets/images/RealPlaneBamboo.png";

import VietnamAirlines from "./../../assets/images/VNAir.png";
import VietJet from "./../../assets/images/VJet.png";
import BambooAirways from "./../../assets/images/Bamboo.png";

function BookingDetail() {
  const location = useLocation();
  const { flightData/* , planeData */ } = location.state || {}; // Comment because of unnecessary data without usage will cause error in deployment
  console.log("Flight Data:", flightData); 
  const [paymentOption, setPaymentOption] = useState('full');

  // Calculate total price
  const basePrice = parseFloat(flightData?.flightData.price || "240");
  const tax = basePrice * 0.15;
  const total = basePrice + tax;

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`; // Example output: "2h 30m"
  };

  const calculateArrivalTime = (departureTime, duration) => {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(departureDate.getTime() + duration * 60000); // Convert duration from minutes to milliseconds
    return arrivalDate;
  };

  const getAirlineLogo = (airline) => {
    switch (airline) {
      case "Vietnam Airlines":
        return VietnamAirlines;
      case "VietJet":
        return VietJet;
      case "Bamboo Airways":
        return BambooAirways;
      default:
        return null;
    }
  };

  const getAirlineImg = (airline) => {
    switch (airline) {
      case "Vietnam Airlines":
        return RealPlaneVNAir;
      case "VietJet":
        return RealPlaneVJet;
      case "Bamboo Airways":
        return RealPlaneBamboo;
      default:
        return null;
    }
  };

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
            href="/search"
            sx={{ color: '#112211' }}
          >
            Search flight
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/booking"
            sx={{ color: '#112211' }}
          >
            Booking flight
          </Link>
          <Typography color="text.primary">
            booking {flightData?.planeData.airline} {flightData?.planeData.planeName}
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
              <Typography variant="subtitle1" fontWeight="bold">{flightData?.planeData.airline + " " + flightData?.planeData.planeName || "Unknown"}</Typography>
              <Typography variant="caption">Departure: {flightData?.flightData.departureTime || "N/A"}</Typography>
            </Box>
            <Box>
              <Typography variant="h5" color="#FF8682" fontWeight="bold">${flightData?.flightData.price || "240"}</Typography>
              <Typography variant="body">{formatDuration(flightData?.flightData.duration) || "2h 28m"}</Typography>
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
              <img src={getAirlineLogo(flightData?.planeData.airline) || RealPlane}
              alt={flightData?.planeData.airline} width={40} height={40} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">{flightData?.planeData.airline || "Emirates A380 Airbus"}</Typography>
                <Typography variant="caption">{flightData?.flightData.flightName || "Airbus A320"}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <FlightIcon sx={{transform: 'rotate(90deg)'}}/>
              <WifiIcon />
              <TimerIcon/>
              <FastfoodIcon />
              <AirlineSeatReclineNormalIcon />
            </Box>
          </Box>

          {/* Flight Times */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6">{formatTime(flightData?.flightData.departureTime) || "12:00 pm"}</Typography>
              <Typography variant="caption" color="text.secondary">{flightData?.flightData.departureAirport || "Newark(EWR)"}</Typography>
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
              <Typography variant="h6">{formatTime(calculateArrivalTime(flightData?.flightData.departureTime, flightData?.flightData.duration)) || "12:00 pm"}</Typography>
              <Typography variant="caption" color="text.secondary">{flightData?.flightData.arrivalAirport || "Newark(EWR)"}</Typography>
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
                Pay ${total} now and the rest (${total * 1 / 3}) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees.
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
              src={getAirlineImg(flightData?.planeData.airline) ||RealPlane} 
              alt="Aircraft"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Economy</Typography>
            <Typography variant="subtitle1">{flightData?.planeData.airline + " " + flightData?.planeData.planeName}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Box sx={{
                display: "inline-flex",
                borderRadius: 1,
                border: "2px solid #8DD3BB",
                padding: "2px 8px"
              }}>
                <Typography variant="subtitle2">4.2</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Very good (54 reviews)
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Price Details Section */}
        <Typography variant="h6" mb={2}>Chi tiết hóa đơn</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Giá vé</Typography>
          <Typography>{flightData?.flightData.price}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Số lượng</Typography>
          <Typography>1</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Thuế và phí</Typography>
          <Typography>{flightData?.flightData.price * 0.15}</Typography>
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
              ${parseFloat(total || 0)}
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