import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SendIcon from "@mui/icons-material/Send";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import airport from "./../../assets/images/airport.png";
import Columbia from "./../../assets/images/Columbia.png";
import locations from "./../../assets/images/locations.png";
import London from "./../../assets/images/London.png";
import Melbourne from "./../../assets/images/Melbourne.png";
import Paris from "./../../assets/images/Paris.png";
import SriLanka from "./../../assets/images/SriLanka.png";
import SriLanka2 from "./../../assets/images/SriLanka2.png";
import SriLanka3 from "./../../assets/images/SriLanka3.png";
import SriLanka4 from "./../../assets/images/SriLanka4.png";

import vietnamCities from "../../util/publicData";



const FlightSearch = () => {
  const [departure, setDeparture] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [flightDate, setFlightDate] = React.useState(null);
  const Navigate = useNavigate();
  
  const handleSearch = () => {
    Navigate('/booking', {
      state: {
        departure,
        destination,
        flightDate,
      },
    });
  };

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

      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "60vh",
          width: "100vw",
          minWidth: "300px",
          backgroundImage: `url(${airport})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
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
            width: "25%",
            height: "fit-content",
            marginTop: 12,
            marginLeft: 6,
            textAlign: "left",
            zIndex: 1,
          }}
        >
          <Typography variant="h1" sx={{ color: "white" }}>
            Make your travel wishlist, we'll do the rest
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            Special offers to suit your plan
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

        <Grid container spacing={2} alignItems="center" sx={{ p: 2 }}>
          <Grid item xs={12} sm={6} md={4} sx={{ flexGrow: 1 }}>
            <Autocomplete
              value={departure}
              onChange={(event, newValue) => setDeparture(newValue)}
              options={vietnamCities}
              renderInput={(params) => (
                <TextField {...params} label="Điểm đi" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ flexGrow: 1 }}>
            <Autocomplete
              value={destination}
              onChange={(event, newValue) => setDestination(newValue)}
              options={vietnamCities}
              renderInput={(params) => (
                <TextField {...params} label="Điểm đến" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ flexGrow: 1 }}>
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
          </Grid>

          {/* <Grid item xs={12} sm={6} md={2.4} sx={{ flexGrow: 1 }}>
            <Autocomplete
              value={passengerCount}
              onChange={(event, newValue) => setPassengerCount(newValue)}
              options={passengerOptions}
              renderInput={(params) => (
                <TextField {...params} label="Số hành khách" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4} sx={{ flexGrow: 1 }}>
            <Autocomplete
              value={ticketType}
              onChange={(event, newValue) => setTicketType(newValue)}
              options={ticketTypes}
              renderInput={(params) => (
                <TextField {...params} label="Loại vé" />
              )}
            />
          </Grid> */}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button variant="contained" onClick={handleSearch} color="primary">
            <SendIcon />
            <Typography variant="h6">Tìm vé</Typography>
          </Button>
        </Box>
      </Box>

      {/* Slogan Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "85%",
          height: "fit-content",
          marginTop: 3,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "fit-content",
            textAlign: "left",
            zIndex: 1,
          }}
        >
          <Typography variant="h2" sx={{ color: "black", p: 1 }}>
            Let's go places together
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "black", p: 1, marginBottom: 4 }}
          >
            Discover the latest offers and news and start planning your next
            trip with us.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={handleSearch}
          color="primary"
          sx={{
            width: "fit-content",
            alignSelf: "center",
            marginBottom: 2,
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="h6">See all</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "70vh",
          width: "100vw",
          backgroundImage: `url(${locations})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 4,
          marginTop: 2,
          marginBottom: 6,
        }}
      ></Box>

      {/* Popular places */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "85%",
          height: "fit-content",
          marginTop: 3,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "fit-content",
            textAlign: "left",
            zIndex: 1,
          }}
        >
          <Typography variant="h2" sx={{ color: "black", p: 1 }}>
            Fall into travel
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "black", p: 1, marginBottom: 4 }}
          >
            Going somewhere to celebrate this season? Whether you’re going home
            or somewhere to roam, we’ve got
            <br />
            the travel tools to get you to your destination.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={handleSearch}
          color="primary"
          sx={{
            width: "fit-content",
            alignSelf: "center",
            marginBottom: 2,
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="h6">See all</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "70vh",
          width: "85vw",
          borderRadius: 4,
          marginTop: 2,
        }}
      >
        <Grid container spacing={3}>
          {/* Add destination cards here */}
          {[
            {
              name: "Melbourne",
              image: Melbourne,
              description: "An amazing journey",
            },
            { name: "Paris", image: Paris, description: "A Paris Adventure" },
            {
              name: "London",
              image: London,
              description: "London eye adventure",
            },
            {
              name: "Columbia",
              image: Columbia,
              description: "Amazing streets",
            },
          ].map((place) => (
            <Grid item xs={12} sm={6} md={3} key={place.name}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: "50vh",
                  position: "relative",
                  backgroundImage: `url(${place.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    padding: 2,
                    height: "40%",
                    flexDirection: "column",
                    marginTop: 30,
                    zIndex: 3,
                  }}
                >
                  <Typography variant="h2" sx={{ color: "white", mb: 1 }}>
                    {place.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
                    {place.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => console.log(`${place.name} clicked`)}
                    sx={{
                      zIndex: 5,
                    }}
                  >
                    Book Flight
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Not so popular place */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "85%",
          height: "fit-content",
          marginTop: 3,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "fit-content",
            textAlign: "left",
            zIndex: 1,
          }}
        >
          <Typography variant="h2" sx={{ color: "black", p: 1 }}>
            Fall into travel
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "black", p: 1, marginBottom: 4 }}
          >
            Going somewhere to celebrate this season? Whether you’re going home
            or somewhere to roam, we’ve got
            <br />
            the travel tools to get you to your destination.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={handleSearch}
          color="primary"
          sx={{
            width: "fit-content",
            alignSelf: "center",
            marginBottom: 2,
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="h6">See all</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "70vh",
          width: "85vw",
          borderRadius: 4,
          marginBottom: 6,
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
            height: "70vh",
            width: "40vw",
            borderRadius: 4,
            marginBottom: 6,
            backgroundColor: "#8DD3BB",
            justifySelf: "left",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              position: "relative",
              borderRadius: 4,
              marginTop: 3,
              marginLeft: 3,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <Typography variant="h1" sx={{ color: "black", p: 1 }}>
              Backpacking Sri Lanka
            </Typography>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                borderRadius: 4,
                marginRight: 2,
                backgroundColor: "white",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  marginTop: 1,
                  marginLeft: 1,
                  marginRight: 1,
                }}
              >
                From
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "black",
                  marginBottom: 1,
                  marginLeft: 1,
                  marginRight: 1,
                }}
              >
                $700
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h7"
            sx={{
              color: "body1",
              p: 2,
              marginBottom: 4,
              marginTop: 4,
              marginLeft: 2,
              marginRight: 2,
            }}
          >
            Traveling is a unique experience as it's the best way to unplug from
            the pushes and pulls of daily life. It helps us to forget about our
            problems, frustrations, and fears at home. During our journey, we
            experience life in different ways. We explore new places, cultures,
            cuisines, traditions, and ways of living.
          </Typography>

          <Button
            variant="outlined"
            onClick={handleSearch}
            color="primary"
            sx={{
              alignSelf: "center",
              marginBottom: 2,
              marginTop: 15,
              p: 2,
              width: "90%", // Makes the button fill the container
              backgroundColor: "white", // Explicitly sets the text color to white
            }}
          >
            <Typography variant="h6">Book Flight</Typography>
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            padding: 2,
            position: "relative",
            height: "70vh",
            width: "50vw",
            borderRadius: 4,
            justifySelf: "right",
          }}
        >
          {[SriLanka, SriLanka2, SriLanka3, SriLanka4].map((image, index) => (
            <Box
              key={index}
              sx={{
                height: "90%", // Adjust the height as needed
                borderRadius: 2, // Rounded corners for images
                overflow: "hidden", // Ensures content stays within rounded corners
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                borderColor: "#8DD3BB",
                backgroundPosition: "center",
              }}
            />
          ))}
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
