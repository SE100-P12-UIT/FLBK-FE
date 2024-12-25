import {
    Autocomplete,
    Box,
    Checkbox,
    FormGroup, 
    FormControlLabel, 
    Slider,
    Button,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import Header from "../../layouts/Header";
  import Footer from "../../layouts/Footer";
  import Emirates from "./../../assets/images/Emirates.png";
  import FlyDubai from "./../../assets/images/FlyDubai.png";
  import Qatar from "./../../assets/images/Qatar.png";
  import Etihad from "./../../assets/images/Etihad.png";
  import Melbourne from "./../../assets/images/Melbourne.png";
  import Paris from "./../../assets/images/Paris.png";
  import London from "./../../assets/images/London.png";
  import Columbia from "./../../assets/images/Columbia.png";
  import SriLanka from "./../../assets/images/SriLanka.png";
  import SriLanka2 from "./../../assets/images/SriLanka2.png";
  import SriLanka3 from "./../../assets/images/SriLanka3.png";
  import SriLanka4 from "./../../assets/images/SriLanka4.png";
  import SendIcon from "@mui/icons-material/Send";
  import HeartIcon from "@mui/icons-material/FavoriteBorder";
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import ExpandLessIcon from '@mui/icons-material/ExpandLess';
  import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
  import ScrollToTopButton from "../../components/ScrollToTopButton";
  
  const vietnamCities = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Dương",
    "Bình Định",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
  ];
  
  // List of ticket types
  const ticketTypes = ["Economy", "Business", "First Class"];
  
  // List of passenger options
  const passengerOptions = [
    "1 Passenger",
    "2 Passengers",
    "3 Passengers",
    "4 Passengers",
    "5+ Passengers",
  ];

  //List of flights
  const flights = [
    {
      airlineLogo: Emirates,
      airlineName: 'Emirates',
      rating: '4.2',
      reviews: 'Very Good (54 reviews)',
      price: '$104',
      departure: '12:00 pm',
      arrival: '1:28 pm',
      stops: 'Non stop',
      duration: '2h 28m',
      route1: 'Emirates',
      route2: 'EWR-BNA',
    },
    {
      airlineLogo: FlyDubai,
      airlineName: 'FlyDubai',
      rating: '4.2',
      reviews: 'Very Good (54 reviews)',
      price: '$104',
      departure: '12:00 pm',
      arrival: '1:28 pm',
      stops: 'Non stop',
      duration: '2h 28m',
      route1: 'FlyDubai',
      route2: 'EWR-BNA',
    },
    {
      airlineLogo: Qatar,
      airlineName: 'Qatar Airways',
      rating: '4.2',
      reviews: 'Very Good (54 reviews)',
      price: '$104/night',
      departure: '12:00 pm',
      arrival: '1:28 pm',
      stops: 'Non stop',
      duration: '2h 28m',
      route1: 'Qatar',
      route2: 'EWR-BNA',
    },
    {
      airlineLogo: Etihad,
      airlineName: 'Qatar Airways',
      rating: '4.2',
      reviews: 'Very Good (54 reviews)',
      price: '$104/night',
      departure: '12:00 pm',
      arrival: '1:28 pm',
      stops: 'Non stop',
      duration: '2h 28m',
      route1: 'Etihad',
      route2: 'EWR-BNA',
    }
  ];
  
  const FlightSearch = () => {
    const [departure, setDeparture] = React.useState(null);
    const [destination, setDestination] = React.useState(null);
    const [ticketType, setTicketType] = React.useState(null);
    const [passengerCount, setPassengerCount] = React.useState(null);
    const [priceRange, setPriceRange] = React.useState([50, 1200]);
    const [timeRange, setTimeRange] = React.useState([1, 1436]);
  
    const handleSearch = () => {
      alert("Searching flights...");
    };

    // Helper function to convert minutes to time format
    function formatTime(value) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Handle 12-hour format
      return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
  
    return (
      <Box
        sx={{ display: "flex", minWidth:'300px',flexDirection: "column", alignItems: "center" }}
      >
        <Header />
        {/* Flight Booking Section */}
        <Box
          sx={{
            width: "80vw",
            marginTop: 6,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
            <FlightTakeoffIcon />
            <Typography variant="h6">Đặt vé</Typography>
          </Box>
  
          <Grid container spacing={2} alignItems="center" sx={{ p: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                value={departure}
                onChange={(event, newValue) => setDeparture(newValue)}
                options={vietnamCities}
                renderInput={(params) => (
                  <TextField {...params} label="Điểm đi" />
                )}
              />
            </Grid>
  
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                value={destination}
                onChange={(event, newValue) => setDestination(newValue)}
                options={vietnamCities}
                renderInput={(params) => (
                  <TextField {...params} label="Điểm đến" />
                )}
              />
            </Grid>
  
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                value={passengerCount}
                onChange={(event, newValue) => setPassengerCount(newValue)}
                options={passengerOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Số hành khách" />
                )}
              />
            </Grid>
  
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                value={ticketType}
                onChange={(event, newValue) => setTicketType(newValue)}
                options={ticketTypes}
                renderInput={(params) => (
                  <TextField {...params} label="Loại vé" />
                )}
              />
            </Grid>
          </Grid>
  
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button variant="contained" onClick={handleSearch} color="primary">
            <SendIcon />
            <Typography variant="h6">Tìm vé</Typography>
          </Button>
        </Box>
        </Box>

      {/* Left Sidebar - Filters */}
      <Box sx={{
          display: "flex",
          position: "relative",
          height: "auto",
          width: "85vw",
          borderRadius: 4,
          marginBottom: 6,
          marginTop: 6,
          flexDirection: "row",
          gap: 2,
      }}>
      
      <Box sx={{ 
          display: "flex",
          position: "relative",
          height: "70vh",
          width: "25vw",
          marginBottom: 6,
          justifySelf: "left",
          flexDirection: "column", }}>
        <Typography variant="h5">Bộ lọc</Typography>
        
        {/* Price Filter */}
        <Box sx={{ width: "70%", p: 2, borderBottom: '1px solid #112211' }}>
          <Typography variant="h6">Giá</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={50}
            max={1200}
            sx={{ 
              color: '#8DD3BB',
              '& .MuiSlider-thumb': {
                backgroundColor: '#8DD3BB',
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>${priceRange[0]}</Typography>
            <Typography>${priceRange[1]}</Typography>
          </Box>
        </Box>

        {/* Time Filter */}
        <Box sx={{ width: "70%", p: 2, borderBottom: '1px solid #112211' }}>
          <Typography variant="h6">Thời gian đi</Typography>
          <Slider
            value={timeRange}
            onChange={(e, newValue) => setTimeRange(newValue)}
            valueLabelDisplay="auto"
            min={1} // Representing 12:00 AM as 0 minutes since midnight
            max={1436} // Representing 11:59 PM as 1439 minutes since midnight
            sx={{
              color: '#8DD3BB',
              '& .MuiSlider-thumb': {
                backgroundColor: '#8DD3BB',
              },
            }}
            valueLabelFormat={(value) => formatTime(value)} // Formatting for label
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{formatTime(timeRange[0])}</Typography>
            <Typography>{formatTime(timeRange[1])}</Typography>
          </Box>
        </Box>

        {/* Flight Filter */}
        <Box sx={{ width: "70%", p: 2, borderBottom: '1px solid #112211' }}>
          <Typography variant="h6">Hãng</Typography>
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox />} 
              label="Emirates" 
            />
            <FormControlLabel 
              control={<Checkbox />} 
              label="Fly Dubai" 
            />
            <FormControlLabel 
              control={<Checkbox />} 
              label="Qatar" 
            />
            <FormControlLabel 
              control={<Checkbox />} 
              label="Etihad" 
            />
          </FormGroup>
        </Box>
        </Box>

          {/* Right Sidebar - Flights */}
        <Box sx={{
          display: "flex",
          height: "auto",
          width: "60vw",
          marginBottom: 6,
          justifyContent: "flex-start",
          flexDirection: "column",
          padding: 2,
        }}
        >
          {flights.map((flight, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{
            borderBottom: index < flights.length - 1 ? '1px solid #ddd' : 'none',
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: 4,
            pb: 2,
            mb: 2,
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* Airline Logo */}
          <Grid item xs={2} sm={2}>
            <img
              src={flight.airlineLogo}
              alt={flight.airlineName}
              style={{ width: '100%', objectFit: 'contain' }}
            />
          </Grid>

          {/* Flight Details */}
          <Grid item xs={9} sm={9}>
          <Box sx={{ display: 'flex', mt: 1, width: '100%' }}>
            <Box
            sx={{
              display: "inline-flex",
              position: "relative",
              borderRadius: 4,
              marginRight: 2,
              border: "2px solid #8DD3BB",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,  // Optional: add padding
            }}
          >
                <Typography variant="h6">{flight.rating}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" marginTop={2}>
              {flight.reviews}
            </Typography>
            <Typography variant="h2" color="#FF8682" sx={{ marginLeft: 'auto' }}>
              {flight.price}
            </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Checkbox />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Typography variant="h6">
                  {flight.departure} - {flight.arrival}
                </Typography>
                <Typography variant="body2">{flight.route1}</Typography>
              </Box>
              <Typography variant="body1" color="textSecondary">
              {flight.stops}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Typography variant="h6" color="textSecondary">
                {flight.duration}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {flight.route2}
                </Typography>
              </Box>
              
            </Box>
            <Box sx={{ borderTop: '1px solid #ccc', mt: 1, pt: 1, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ alignItems: 'center', p: 1, border: "2px solid #8DD3BB", borderRadius: 1}}>
              <HeartIcon/>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1, width: '100%', marginLeft: 3 }}
            >
              Đặt vé
            </Button>
            </Box>
            
          </Grid>
        </Grid>
      ))}
        </Box>
        </Box>
          <ScrollToTopButton/>
      <Box sx={{ display: "flex", width: "100vw" }}>
        <Footer />
      </Box>
    </Box>
  );
};
  
  export default FlightSearch;
  