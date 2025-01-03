import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FlightIcon from "@mui/icons-material/Flight";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TimerIcon from "@mui/icons-material/Timer";
import WifiIcon from "@mui/icons-material/Wifi";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  Radio,
  TextField,
  Typography
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RealPlane from "./../../assets/images/RealPlane.png";
import RealPlaneBamboo from "./../../assets/images/RealPlaneBamboo.png";
import RealPlaneVNAir from "./../../assets/images/RealPlaneVNAir.png";
import RealPlaneVJet from "./../../assets/images/RealPlaneVietJet.png";

import { useEffect } from "react";
import { toast } from "react-toastify";
import TicketService from "../../services/ticketService";
import TicketTypeService from "../../services/ticketTypeService";
import BambooAirways from "./../../assets/images/Bamboo.png";
import VietJet from "./../../assets/images/VJet.png";
import VietnamAirlines from "./../../assets/images/VNAir.png";

function BookingDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightData /* , planeData */ } = location.state || {}; // Comment because of unnecessary data without usage will cause error in deployment
  const userData = JSON.parse(localStorage.getItem("userInfo")); // Thông tin người đặt vé - dùng cho payload
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState([
    { title: "Ông", name: "", dateOfBirth: null },
  ]);
  const [seatType, setSeatType] = useState("common");
  const [coefficient, setCoefficient] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log("Passengers Data: ", passengers);

  const passengerOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const titleOptions = ["Ông", "Bà", "Anh", "Chị"];

  const formatDateTime = (dateString) => {
    if (!dateString) return null;

    const dateObj = new Date(dateString); // Chuyển chuỗi thành đối tượng Date

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    // Định dạng ngày giờ theo kiểu DD-MM-YYYY HH:mm:ss
    return `Ngày ${day}-${month}-${year} vào lúc ${hours} giờ ${minutes} phút ${seconds} giây`;
  };

  const handlePassengerCountChange = (count) => {
    setPassengerCount(count);
    const updatedPassengers = [...passengers];

    if (count > passengers.length) {
      // Thêm các box mới nếu count tăng
      for (let i = passengers.length; i < count; i++) {
        updatedPassengers.push({ title: "Ông", name: "", dateOfBirth: null });
      }
    } else {
      // Cắt bớt box nếu count giảm
      updatedPassengers.length = count;
    }

    setPassengers(updatedPassengers);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = passengers.map((p, i) => {
      if (i === index) {
        const updatedField =
          field === "dateOfBirth" ? value /* formatDate(value) */ : value;
        return { ...p, [field]: updatedField };
      }
      return p;
    });
    setPassengers(updatedPassengers);
  };

  // Calculate total price
  const basePrice = parseFloat(flightData?.flightData.price || "240");

  const total = basePrice * coefficient * passengerCount;

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") {
      return "Số tiền không hợp lệ";
    }
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two digits
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
      case "VietnamAirline":
        return RealPlaneVNAir;
      case "VietJet":
        return RealPlaneVJet;
      case "BambooAirway":
        return RealPlaneBamboo;
      default:
        return null;
    }
  };

  // Call API Ticket Types
  useEffect(() => {
    const fetchTicketType = async (ticketTypeName) => {
      setLoading(true);
      try {
        const data =
          await TicketTypeService.getTicketTypeByName(ticketTypeName);
        return data.coefficient.$numberDecimal;
      } catch (error) {
        toast.error("Đã có lỗi không xác định xảy ra");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const getCoefficient = async () => {
      const ticketCoefficient = await fetchTicketType(seatType);
      setCoefficient(ticketCoefficient);
    };
    getCoefficient();
  }, [seatType]);

  // Call API Ticket Booking
  const createTicket = async (payload) => {
    setLoading(true);
    try {
      const response = await TicketService.createTicket(payload);
      if (response) toast.success("Đặt vé thành công");
      navigate("/user/profile");
      return response;
    } catch (error) {
      toast.error("Đặt vé thất bại");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get Params and Processing Payload Funtion here
  const ticketPayload = () => {
    const payload = {
      userId: userData.id,
      passenger: passengers,
      departureFlight: {
        flightName: flightData.flightData.flightName,

        departureAirport: flightData.flightData.departureAirport,
        arrivalAirport: flightData.flightData.arrivalAirport,
        departureTime: flightData.flightData.departureTime,
        seatType: seatType,
        totalPrice: total,
      },
    };
    return payload;
  };

  // Validation
  const validatePassengers = (passengers) => {
    const errors = [];

    passengers.forEach((passenger, index) => {
      const { title, name, dateOfBirth } = passenger;

      // Validate title
      if (!title) {
        errors.push(`Hành khách số ${index + 1}: Cần phải có danh xưng.`);
      }

      // Validate name
      if (!name) {
        errors.push(`Hành khách số ${index + 1}: Cần phải điền tên.`);
      } else if (
        !/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂĐƠƯÇỲÝỴỶỸẾỀỂỄỆÌÍĨỌÕÙỤỦỨỪỮỰỴýỳỷỹ\s]+$/u.test(
          name
        )
      ) {
        errors.push(
          `Hành khách số ${index + 1}: Tên khách hàng không được chứa các kí tự đặc biệt`
        );
      }

      // Validate date of birth
      if (!dateOfBirth) {
        errors.push(`Hành khách số ${index + 1}: Cần phải điền ngày sinh.`);
      }
    });

    return errors;
  };

  // Handle Function calling the two function above
  const handleSubmit = () => {
    const errors = validatePassengers(passengers);

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));

      return;
    }
    const payload = ticketPayload();
    createTicket(payload);
  };

  return (
    <Box sx={{ p: 3, margin: "0 auto" }}>
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
            sx={{ color: "#112211" }}
          >
            Tìm chuyến bay
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/booking"
            sx={{ color: "#112211" }}
          >
            Đặt vé
          </Link>
          <Typography color="text.primary">
            {flightData?.flightData.plane.airline}{" "}
            {flightData?.flightData.plane.planeName}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center" },
        }}
      >
        {/* Flight Details Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            borderRadius: 2,
            p: 3,
            width: "50vw",
            minWidth: "400px",
            boxShadow: "0px 4px 16px rgba(17, 34, 17, 0.05)",
          }}
        >
          {/* Route and Price */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {flightData?.flightData.plane.airline +
                  " " +
                  flightData?.flightData.plane.planeName || ""}
              </Typography>
              <Typography variant="caption">
                Khởi hành:{" "}
                {formatDateTime(flightData?.flightData.departureTime) || "N/A"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" color="#FF8682" fontWeight="bold">
                {formatCurrency(flightData?.flightData.price) || ""}
              </Typography>
              <Typography variant="body">
                {formatDuration(flightData?.flightData.duration) || "2h 28m"}
              </Typography>
            </Box>
          </Box>

          {/* Airline Info and Amenities */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: "1px solid #8DD3BB",
                borderRadius: 1,
                padding: "8px 16px",
              }}
            >
              <img
                src={
                  getAirlineLogo(flightData?.flightData.plane.airline) ||
                  RealPlane
                }
                alt={flightData?.flightData.airline}
                width={40}
                height={40}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {flightData?.flightData.plane.airline ||
                    "Emirates A380 Airbus"}
                </Typography>
                <Typography variant="caption">
                  {flightData?.flightData.flightName || "Airbus A320"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FlightIcon sx={{ transform: "rotate(90deg)" }} />
              <WifiIcon />
              <TimerIcon />
              <FastfoodIcon />
              <AirlineSeatReclineNormalIcon />
            </Box>
          </Box>

          {/* Flight Times */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6">
                {formatTime(flightData?.flightData.departureTime) || "12:00 pm"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flightData?.flightData.departureAirport || "Newark(EWR)"}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: 2,
                  flex: 1,
                  bgcolor: "#D9D9D9",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 24,
                    height: 24,
                    bgcolor: "#D9D9D9",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <FlightIcon
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: "50%",
                    transform: "translateX(-50%) rotate(90deg)",
                    color: "#112211",
                    zIndex: 1,
                    fontSize: 50,
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="h6">
                {formatTime(
                  calculateArrivalTime(
                    flightData?.flightData.departureTime,
                    flightData?.flightData.duration
                  )
                ) || "12:00 pm"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flightData?.flightData.arrivalAirport || "Newark(EWR)"}
              </Typography>
            </Box>
          </Box>

          {/* Seat Type Options */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                bgcolor: seatType === "common" ? "#8DD3BB" : "#F4F6F5",
                p: 2,
                borderRadius: 1,
                mb: 2,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onClick={() => setSeatType("common")}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Radio
                  checked={seatType === "common"}
                  onChange={() => setSeatType("common")}
                  value="full"
                  sx={{
                    color: seatType === "common" ? "white" : "inherit",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: seatType === "common" ? "#112211" : "inherit",
                  }}
                >
                  Ghế Thường
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ color: seatType === "common" ? "#112211" : "inherit" }}
              ></Typography>
            </Box>

            <Box
              sx={{
                bgcolor: seatType === "business" ? "#8DD3BB" : "#F4F6F5",
                p: 2,
                borderRadius: 1,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onClick={() => setSeatType("business")}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Radio
                  checked={seatType === "business"}
                  onChange={() => setSeatType("business")}
                  value="partial"
                  sx={{
                    color: seatType === "business" ? "white" : "inherit",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: seatType === "business" ? "#112211" : "inherit",
                  }}
                >
                  Ghế Thương gia
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: seatType === "business" ? "#112211" : "inherit",
                }}
              ></Typography>
            </Box>
          </Box>

          <Divider></Divider>

          {/* Passenger Info Section */}
          <Box sx={{ display: "flex", flexDirection: "column", my: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Thông tin hành khách
            </Typography>

            <Box>
              <Autocomplete
                value={passengerCount}
                onChange={(event, newValue) => {
                  if (newValue !== null) handlePassengerCountChange(newValue);
                }}
                options={passengerOptions}
                sx={{
                  my: 3,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Số hành khách" />
                )}
              />
            </Box>

            {passengers.map((passenger, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ alignItems: "flex-start" }}>
                  Hành khách số {index + 1}:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "16px",
                    flexDirection: "column",
                  }}
                >
                  <Autocomplete
                    value={passenger.title}
                    onChange={(event, newValue) => {
                      if (newValue !== null)
                        handleInputChange(index, "title", newValue);
                    }}
                    options={titleOptions}
                    sx={{ flexGrow: 1 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Title" />
                    )}
                  />
                  <TextField
                    label="Name"
                    value={passenger.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                  <TextField
                    label="Date of Birth"
                    value={
                      passenger.dateOfBirth /* displayDate(passenger.dateOfBirth) */
                    }
                    onChange={(e) =>
                      handleInputChange(index, "dateOfBirth", e.target.value)
                    }
                    size="small"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ flexGrow: 1 }}
                  />
                </Box>
              </Box>
            ))}
            <Box></Box>
          </Box>
        </Box>

        {/* Combined Summary and Price Details Box */}
        {passengerCount > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "white",
              minWidth: "400px",
              borderRadius: 2,
              p: 3,
              boxShadow: "0px 4px 16px rgba(17, 34, 17, 0.05)",
            }}
          >
            {/* Flight Summary Section */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    getAirlineImg(flightData?.flightData.plane.airline) ||
                    RealPlane
                  }
                  alt="Aircraft"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                {/* <Typography variant="h6">Economy</Typography> */}
                <Typography variant="subtitle1">
                  {flightData?.flightData.plane.airline +
                    " " +
                    flightData?.flightData.plane.planeName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      borderRadius: 1,
                      border: "2px solid #8DD3BB",
                      padding: "2px 8px",
                    }}
                  >
                    <Typography variant="subtitle2">4.2</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Rất tích cực (54 đánh giá)
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Price Details Section */}
            <Typography variant="h6" mb={2}>
              Chi tiết hóa đơn
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Giá vé</Typography>
              <Typography>{formatCurrency(flightData?.flightData.price)}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Số lượng</Typography>
              <Typography>{passengerCount}</Typography>
            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Thuế và phí</Typography>
              <Typography>{flightData?.flightData.price * 0.15}</Typography>
            </Box> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                pt: 2,
                borderTop: "1px solid #E7E8E7",
              }}
            >
              <Typography fontWeight="bold">Tổng</Typography>
              <Typography fontWeight="bold">
                {loading ? ". . ." : formatCurrency(total || 0) }
              </Typography>
            </Box>

            {/* Book Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleSubmit()}
              disabled={loading}
              sx={{
                bgcolor: "#8DD3BB",
                color: "#112211",
                mt: 3,
                "&:hover": {
                  bgcolor: "#7CC3AB",
                },
              }}
            >
              Đặt vé
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BookingDetail;
