import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SendIcon from "@mui/icons-material/Send";
import {
  Autocomplete,
  Box,
  Button,
  Grid2,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import vietnamCities from "../../util/publicData";
import flight from "./../../assets/images/flight.png";
import homepage from "./../../assets/images/homepage.png";



const Home = () => {
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);

  const [flightDate, setFlightDate] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/booking', {
      state: {
        departure,
        destination,
        flightDate,
  
      },
    });
  };

  return (
    <Box
      sx={{ display: "flex", minWidth:'300px',flexDirection: "column", alignItems: "center" }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "50vh",
          width: "90vw",
          minWidth:'300px',
          backgroundImage: `url(${homepage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 4,
        }}
      >
        {/* Dim Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: 4,
            zIndex: 0,
          }}
        />

        {/* Slogan Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "fit-content",
            marginTop: 12,
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <Typography variant="h1" sx={{ color: "white" }}>
            BAY XA, CHỌN DỄ
            <br />
            CHỈ TRONG MỘT CÚ CLICK!
          </Typography>
          <Typography variant="h3" sx={{ color: "white" }}>
            Đặt vé ngay
          </Typography>
        </Box>
      </Box>

      {/* Flight Booking Section */}
      <Box
        sx={{
          width: "80vw",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
          <FlightTakeoffIcon />
          <Typography variant="h6">Đặt vé</Typography>
        </Box>

        <Grid2 container spacing={2} alignItems="center" sx={{ p: 2 }}>
                  <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1 }}>
                    <Autocomplete
                      value={departure}
                      onChange={(event, newValue) => setDeparture(newValue)}
                      options={vietnamCities}
                      renderInput={(params) => (
                        <TextField {...params} label="Điểm đi" />
                      )}
                    />
                  </Grid2>
        
                  <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1 }}>
                    <Autocomplete
                      value={destination}
                      onChange={(event, newValue) => setDestination(newValue)}
                      options={vietnamCities}
                      renderInput={(params) => (
                        <TextField {...params} label="Điểm đến" />
                      )}
                    />
                  </Grid2>
        
                  <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1 }}>
                    <TextField
                      label="Ngày bay"
                      type="date"
                      fullWidth
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid2>
        
                  {/* <Grid2 item xs={12} sm={6} md={2.4} sx={{ flexGrow: 1 }}>
                    <Autocomplete
                      value={passengerCount}
                      onChange={(event, newValue) => setPassengerCount(newValue)}
                      options={passengerOptions}
                      renderInput={(params) => (
                        <TextField {...params} label="Số hành khách" />
                      )}
                    />
                  </Grid2>
        
                  <Grid2 item xs={12} sm={6} md={2.4} sx={{ flexGrow: 1 }}>
                    <Autocomplete
                      value={ticketType}
                      onChange={(event, newValue) => setTicketType(newValue)}
                      options={ticketTypes}
                      renderInput={(params) => (
                        <TextField {...params} label="Loại vé" />
                      )}
                    />
                  </Grid2> */}
                </Grid2>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button variant="contained" onClick={handleSearch} color="primary">
            <SendIcon />
            <Typography variant="h6">Tìm vé</Typography>
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "fit-content",
          width: "80vw",
          backgroundImage: `url(${flight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 4,
          my: 4,
        }}
      >
        {/* Dim Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: 4,
            zIndex: 0,
          }}
        />
        {/* Slogan Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "fit-content",
            marginTop: 12,
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <Typography variant="h2" sx={{ color: "white", p: 1 }}>
            CHUYẾN BAY
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "white", p: 1, marginBottom: 4 }}
          >
            Tìm kiếm các chuyến bay đến những địa điểm nổi tiếng
          </Typography>
          <Button
            variant="contained"
            onClick={handleSearch}
            color="primary"
            sx={{ width: "fit-content", alignSelf: "center",marginBottom:2, }}
          >
            <SendIcon />
            <Typography variant="h6">Tìm kiếm chuyến bay</Typography>
          </Button>
        </Box>
      </Box>
          <ScrollToTopButton/>
      <Box sx={{ display: "flex", width: "100vw" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
