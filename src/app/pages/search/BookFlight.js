import HeartIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import FlightService from "../../services/flightService"; // Import the FlightService
import vietnamCities from "../../util/publicData";
import BambooAirways from "./../../assets/images/Bamboo.png";
import VietJet from "./../../assets/images/VJet.png";
import VietnamAirlines from "./../../assets/images/VNAir.png";


const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    return "Số tiền không hợp lệ";
  }
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const FlightSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { departure, destination, flightDate} =
    location.state || {};

  const [flights, setFlights] = useState([]); // State to hold flight data
  const [loadingFlights, setLoadingFlights] = useState(true); // State to manage loading for flights
  const [errorFlights, setErrorFlights] = useState(null); // State to manage errors for flights
  // State variables to hold the values
  const [departureValue, setDeparture] = useState(departure || "");
  const [destinationValue, setDestination] = useState(destination || "");
  const [flightDateValue, setFlightDate] = useState(flightDate || "");


  const [selectedAirlines, setSelectedAirlines] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [filters, setFilters] = useState({});

  const handleSearch = () => {
    const getFilteredFlight = async (filters) => {
      try {
        const response = await FlightService.getFilteredFlight(filters.departureAirport, filters.arrivalAirport, filters.departureTime, filters.airline);
        setFilteredFlights(response);
        return response;
      } catch (error) {
        toast.error("Có lỗi không xác định đã xảy ra");
      }
    }
    getFilteredFlight(filters);
  };

  // function normalizeString(str) {
  //   return str
  //     .toLowerCase()
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .replace(/đ/g, "d")
  //     .replace(/[^a-z0-9 ]/g, "")
  //     .trim();
  // }

  const handleAirlineChange = (airline) => {
    setSelectedAirlines(airline);
  };

  // Re-filter flights when filters change
  useEffect(() => {
    const tempFilters = {
      // price: priceRange,
      // time: timeRange,
      airline:selectedAirlines,
      departureAirport: departureValue,
      arrivalAirport: destinationValue,
      departureTime: flightDateValue ? new Date(flightDateValue).toISOString() : "",
      // passengerCount: passengerCountValue,
    };
    console.log("Filters: ", tempFilters);
    setFilters(tempFilters);
  }, [
    flights,
    departureValue,
    destinationValue,
    flightDateValue,

    selectedAirlines,
  ]);


  const getAirlineLogo = (airline) => {
    switch (airline) {
      case "VietnamAirline":
        return VietnamAirlines;
        case "VietNamAirline":
        return VietnamAirlines;
        case "Vietnam Airlines":
        return VietnamAirlines;
        case "VietnamAirlines":
          return VietnamAirlines;
      case "VietJet":
        return VietJet;
      case "BambooAirway":
        return BambooAirways;
      default:
        return null;
    }
  };

  // Function to format time
  // const formatTime = (dateString) => {
  //   const date = new Date(dateString);
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const period = hours >= 12 ? "PM" : "AM";
  //   const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  //   const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two digits
  //   return `${formattedHours}:${formattedMinutes} ${period}`;
  // };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`;
};

  // function formatTimeSlider(value) {
  //   const hours = Math.floor(value / 60);
  //   const minutes = value % 60;
  //   const period = hours >= 12 ? "PM" : "AM";
  //   const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Handle 12-hour format
  //   const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two digits
  //   return `${formattedHours}:${formattedMinutes} ${period}`;
  // }

  const handleBooking = (flight) => {
    // const associatedPlane = planes.find(plane => plane.planeId === flight.planeId);

    navigate("/bkdt", {
      state: {
        flightData: {
          flightData: flight,
          // planeData: associatedPlane
        },
      },
    });
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`; // Example output: "2h 30m"
  };

  // const calculateArrivalTime = (departureTime, duration) => {
  //   const departureDate = new Date(departureTime);
  //   const arrivalDate = new Date(departureDate.getTime() + duration * 60000); // Convert duration from minutes to milliseconds
  //   return arrivalDate;
  // };

  useEffect(() => {
    const fetchFlights = async () => {
      setLoadingFlights(true);
      try {
        const response = await FlightService.getAllFlights("", "asc", 10, 1); // Adjust parameters as needed
        setFlights(response.results || []); // Assuming the response has a results property
        console.log(response.results);
        setLoadingFlights(false);
      } catch (error) {
        setErrorFlights("Không thể tải dữ liệu chuyến bay");
        setLoadingFlights(false);
      }
    };
    fetchFlights();
  }, []);

  if (loadingFlights)
    return <Typography>Đang tải dữ liệu chuyến bay...</Typography>;
  if (errorFlights)
    return <Typography color="error">{errorFlights}</Typography>;
  // if (loadingPlanes) return <Typography>Đang tải dữ liệu máy bay...</Typography>;
  // if (errorPlanes) return <Typography color="error">{errorPlanes}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "300px",
        flexDirection: "column",
        alignItems: "center",
      }}
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
        <Grid container spacing={1} alignItems="center" sx={{ p: 2 }}>
          <Grid item xs={12} sm={3.5} md={3.5}>
            <Autocomplete
              value={departureValue}
              onChange={(event, newValue) => setDeparture(newValue)}
              options={vietnamCities}
              renderInput={(params) => (
                <TextField {...params} label="Điểm đi" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={3.5} md={3.5}>
            <Autocomplete
              value={destinationValue}
              onChange={(event, newValue) => setDestination(newValue)}
              options={vietnamCities}
              renderInput={(params) => (
                <TextField {...params} label="Điểm đến" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={3.5} md={3.5}>
            <TextField
              label="Ngày bay"
              type="date"
              fullWidth
              value={flightDateValue}
              onChange={(e) => setFlightDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* <Grid item xs={12} sm={3} md={2.2}>
            <Autocomplete
              value={passengerCountValue}
              onChange={(event, newValue) => setPassengerCount(newValue)}
              options={passengerOptions}
              renderInput={(params) => (
                <TextField {...params} label="Số hành khách" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={2.2}>
            <Autocomplete
              value={ticketTypeValue}
              onChange={(event, newValue) => setTicketType(newValue)}
              options={ticketTypes}
              renderInput={(params) => (
                <TextField {...params} label="Loại vé" />
              )}
            />
          </Grid> */}

          <Grid item xs={12} sm={1.5} md={1.5}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                color="primary"
              >
                <SearchIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Left Sidebar - Filters */}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "auto",
          width: "85vw",
          borderRadius: 4,
          marginBottom: 6,
          marginTop: 6,
          flexDirection: "row",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
            height: "70vh",
            width: "25vw",
            minWidth:'200px',
            marginBottom: 6,
            justifySelf: "left",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">Bộ lọc</Typography>

          {/* Price Filter */}
          {/* <Box sx={{ width: "70%", p: 2, borderBottom: "1px solid #112211" }}>
            <Typography variant="h6">Giá (VNĐ)</Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={1000000}
              max={12000000}
              sx={{
                color: "#8DD3BB",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#8DD3BB",
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>{priceRange[0]}</Typography>
              <Typography>{priceRange[1]}</Typography>
            </Box>
          </Box> */}

          {/* Time Filter */}
          {/* <Box sx={{ width: "70%", p: 2, borderBottom: "1px solid #112211" }}>
            <Typography variant="h6">Thời gian đi</Typography>
            <Slider
              value={timeRange}
              onChange={(e, newValue) => setTimeRange(newValue)}
              valueLabelDisplay="auto"
              min={timeRange[0]} // Representing 12:00 AM as 0 minutes since midnight
              max={timeRange[1]} // Representing 11:59 PM as 1439 minutes since midnight
              sx={{
                color: "#8DD3BB",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#8DD3BB",
                },
              }}
              valueLabelFormat={(value) => formatTime(value * 60000)} // Formatting for label
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>{formatTimeSlider(timeRange[0])}</Typography>
              <Typography>{formatTimeSlider(timeRange[1])}</Typography>
            </Box>
          </Box> */}

          {/* Flight Filter */}
          <Box sx={{ width: "70%", p: 2, borderBottom: "1px solid #112211" }}>
            <Typography variant="h6">Hãng</Typography>
            <FormGroup>
              {["VietnamAirline", "VietJet", "BambooAirway"].map((airline) => (
                <FormControlLabel
                  key={airline}
                  control={
                    <Radio
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => handleAirlineChange(airline)}
                    />
                  }
                  label={airline}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Right Sidebar - Flights */}
        <Box
          sx={{
            display: "flex",
            height: "auto",
            width: "60vw",
            marginBottom: 6,
            justifyContent: "flex-start",
            flexDirection: "column",
            padding: 2,
          }}
        >
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{
                  borderBottom:
                    index < filteredFlights.length - 1
                      ? "1px solid #ddd"
                      : "none",
                  boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: 4,
                  pb: 2,
                  mb: 2,
                  alignItems: "center",
                  width: "100%",
                  minWidth:'500px',
                }}
              >
                {/* Airline Logo */}
                <Grid item xs={2} sm={2}>
                  <img
                    src={getAirlineLogo(flight?.plane.airline)}
                    alt={flight?.plane.airline}
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                </Grid>

                {/* Flight Details */}
                <Grid item xs={9} sm={9}>
                  <Box sx={{ display: "flex", mt: 1, width: "100%" }}>
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
                        padding: 1, // Optional: add padding
                      }}
                    >
                      <Typography variant="h6">4.2</Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      marginTop={2}
                    >
                      Rất tích cực (54 đánh giá)
                    </Typography>
                    <Typography
                      variant="h2"
                      color="#FF8682"
                      sx={{ marginLeft: "auto" }}
                    >
                    {formatCurrency(flight.price)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                      }}
                    >
                      <Typography variant="h6">
                        Khởi hành:
                      </Typography>
                      <Typography variant="body1">
                        {formatDateTime(flight.departureTime) }
                      </Typography>
                      <Typography variant="h6">
                        Điểm đi:
                      </Typography>
                      <Typography variant="body1">
                        {flight.departureAirport}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                      }}
                    >
                      <Typography variant="h6" color="textSecondary">
                        Thời gian bay:
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {formatDuration(flight.duration)}
                      </Typography>
                      <Typography variant="h6">
                        Điểm đến:
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {flight.arrivalAirport}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      borderTop: "1px solid #ccc",
                      mt: 1,
                      pt: 1,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center",
                        p: 1,
                        border: "2px solid #8DD3BB",
                        borderRadius: 1,
                      }}
                    >
                      <HeartIcon />
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 1, width: "100%", marginLeft: 3 }}
                      onClick={() => handleBooking(flight)}
                    >
                      Đặt vé
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography>Không có chuyến bay nào khớp với yêu cầu của bạn.</Typography>
          )}
        </Box>
      </Box>
      <ScrollToTopButton />
      <Box sx={{ display: "flex", width: "100vw" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default FlightSearch;
