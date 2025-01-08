import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  TablePagination,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FlightService from "../../services/flightService";
import PlaneService from "../../services/planeService";
import { toast } from "react-toastify";
import vietnamCities from "../../util/publicData";

const FlightManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

  const [data, setData] = useState({}); // State để lưu dữ liệu
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở hộp thoại thêm chuyến bay
  const [flightData, setFlightData] = useState({
    id: "",
    planeId: "",
    flightName: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    duration: "",
    price: "",
    planeName: "",
    airline: "",
    seats: [],
  });

  const [isEditOpen, setIsEditOpen] = useState(false); // Trạng thái mở hộp thoại sửa chuyến bay
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Trạng thái mở hộp thoại xóa chuyến bay

  const [plane, setPlane] = useState([]);

  // Gọi API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FlightService.getAllFlights(
          "",
          "asc",
          rowsPerPage,
          page + 1
        ); // API lấy chuyến bay
        setData(response || {}); // Lưu dữ liệu vào state
        setLoading(false); // Tắt trạng thái loading
        console.log("Dữ liệu api chuyến bay:", response);
      } catch (error) {
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };
    fetchData();
  }, [rowsPerPage, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlaneService.getAllPlane("", "asc", 10, 1); // Api lấy máy bay
        setPlane(response.results || []); // Lưu dữ liệu vào state
        setLoading(false); // Tắt trạng thái loading
        console.log("Dữ liệu api máy bay:", response.results);
      } catch (error) {
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };
    fetchData();
  }, [isOpen]);

  // Hiển thị trạng thái loading hoặc lỗi
  if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const filteredData = data.results
    ? data.results.filter(
        (item) => item.flightName && item.flightName.includes(searchTerm)
      )
    : [];

  // Xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số dòng trên mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePreAddFlight = async () => {
    try {
      const plane = await PlaneService.getPlaneById(flightData.planeId);
      console.log(flightData);
      const finalPlane = plane?.seats
        .filter((seat) => !seat.disable) // Lọc các object có disable === false
        .map(({ disable, ...seat }) => ({
          ...seat,
          isAvailable: true, // Thêm trường isAvailable với giá trị true
        }));
      return finalPlane;
    } catch (error) {
      console.error("Lỗi khi thêm ghế:", error);
      toast.error("Không thể thêm chuyến bay. Vui lòng thử lại!");
    }
  };

  // Xử lý thêm chuyến bay
  const handleAddDialogOpen = () => {
    setIsOpen(true);
  };

  const handleAddFlight = async () => {
    const seatsFinal = await handlePreAddFlight();
    try {
      // Gọi API thêm chuyến bay
      const payLoad = {
        planeId: flightData.planeId,
        flightName: flightData.flightName,
        departureAirport: flightData.departureAirport,
        arrivalAirport: flightData.arrivalAirport,
        departureTime: flightData.departureTime,
        duration: flightData.duration,
        price: flightData.price,
        seats: seatsFinal,
        plane: {
          planeName: flightData.planeName,
          airline: flightData.airline,
        },
      };
      console.log(payLoad);
      const createFlight = await FlightService.createFlight(payLoad);
      console.log(createFlight);
      if (createFlight.status === 201) {
        //gọi lại api
        const response = await FlightService.getAllFlights(
          "",
          "asc",
          rowsPerPage,
          page + 1
        );
        setData(response || {});
        console.log(response);
        toast.success("Thêm chuyến bay thành công");
      }
      handleAddDialogClose(); // Đóng hộp thoại
    } catch (error) {
      console.error("Lỗi khi thêm chuyến bay:", error);
      toast.error("Không thể thêm chuyến bay. Vui lòng thử lại!");
    }
  };

  const handleAddDialogClose = () => {
    setIsOpen(false);
    setFlightData({
      id: "",
      planeId: "",
      flightName: "",
      departureAirport: "",
      arrivalAirport: "",
      departureTime: "",
      duration: "",
      price: "",
      seats: [],
      planeName: "",
      airline: "",
    });
  };

  const fetchSeatsByPlaneId = async (planeId) => {
    try {
      const plane = await PlaneService.getPlaneById(planeId);
      return plane || {};
    } catch (error) {
      console.error("Lỗi khi lấy danh sách ghế:", error);
      toast.error("Không thể lấy danh sách ghế. Vui lòng thử lại!");
      return [];
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "planeId") {
      const planeget = await fetchSeatsByPlaneId(value);
      setFlightData({
        ...flightData,
        [name]: value,
        seats: planeget.seats,
        airline: planeget.airline,
        planeName: planeget.planeName,
      });
    } else {
      setFlightData({ ...flightData, [name]: value });
    }
  };

  const handleEditDialogOpen = (flight) => {
    setSelectedFlight(flight);
    setFlightData({
      id: flight.id,
      flightName: flight.flightName,
      planeId: flight.planeId,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      departureTime: flight.departureTime,
      duration: flight.duration,
      price: flight.price,
      seats: flight.seats,
      planeName: flight.plane.planeName,
      airline: flight.plane.airline,
    });
    setIsEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditOpen(false);
  };
  const handleEditFlight = async () => {
    const seatsFinal = await handlePreAddFlight();
    try {
      // Gọi API để cập nhật thông tin người dùng
      const updatedFlight = await FlightService.updateFlightById(
        flightData.id,
        {
          flightName: flightData.flightName,
          departureAirport: flightData.departureAirport,
          planeId: flightData.planeId,
          arrivalAirport: flightData.arrivalAirport,
          departureTime: flightData.departureTime,
          duration: flightData.duration,
          price: flightData.price,
          seats: seatsFinal,
          plane: {
            airline: flightData.airline,
            planeName: flightData.planeName,
          },
        }
      );
      console.log("Thông tin chuyến bay đã cập nhật:", updatedFlight);

      // Cập nhật danh sách chuyên bay trong state
      setData((prevData) => ({
        ...prevData,
        results: prevData.results?.map((flight) =>
          flight.id === flightData.id ? { ...flight, ...updatedFlight } : flight
        ),
      }));
      // Đóng hộp thoại chỉnh sửa
      handleEditDialogClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin chuyến bay:", error);
      toast.error("Không thể cập nhật thông tin chuyến bay. Vui lòng thử lại!");
    }
  };

  const convertToDateTimeLocal = (isoString) => {
    // Bỏ phần múi giờ và cắt đến "yyyy-MM-ddThh:mm"
    return isoString ? isoString.replace(/Z$/, "").slice(0, 16) : "";
  };

  //Xóa chuyến bay
  const handleDeleteDialogOpen = (flight) => {
    setSelectedFlight(flight);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedFlight(null);
  };

  const handleDeleteFlight = async () => {
    try {
      if (!selectedFlight?.id) return;

      // Gọi API xóa chuyến bay
      await FlightService.deleteFlightById(selectedFlight.id);

      console.log(`Đã xóa chuyến có ID: ${selectedFlight.id}`);

      // Xóa chuyến bay khỏi danh sách hiển thị
      setData((prevData) => ({
        ...prevData,
        results: prevData?.results.filter(
          (flight) => flight.id !== selectedFlight.id
        ),
        totalResults: prevData.totalResults - 1, // Giảm tổng số chuyến bay
      }));

      // Đóng hộp thoại
      handleDeleteDialogClose();
    } catch (error) {
      console.error("Lỗi khi xóa chuyến bay:", error);
      alert("Không thể xóa chuyến bay. Vui lòng thử lại!");
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JS bắt đầu từ 0
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`;
  };

  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid #ddd" }}>
        <Typography variant="h4">Danh sách chuyến bay</Typography>
        <Typography variant="body2">
          Toàn bộ danh sách chuyến bay sẽ hiển thị ở đây
        </Typography>
      </Box>
      <Card sx={{ marginBottom: "16px" }}>
        <CardContent sx={{}}>
          <Typography variant="h4">{data?.totalResults}</Typography>
          <Typography variant="body2">Số lượng chuyến bay</Typography>
        </CardContent>
      </Card>
      <Box mt={2} textAlign="right">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDialogOpen}
          startIcon={<AddIcon />}
        >
          Thêm chuyến bay
        </Button>
      </Box>
      <Box>
        <TextField
          placeholder="Tìm kiếm theo..."
          // type="number"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ borderBottom: "1px solid #ddd", whiteSpace: "break-spaces" }}>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên chuyến bay</TableCell>
              <TableCell>Điểm đi</TableCell>
              <TableCell>Điểm đến</TableCell>
              <TableCell>Thời gian khởi hành</TableCell>
              <TableCell>Thời gian bay {"\n"}dự kiến</TableCell>
              <TableCell>Giá vé</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.flightName}</TableCell>
                  <TableCell>{item?.departureAirport}</TableCell>
                  <TableCell>{item?.arrivalAirport}</TableCell>
                  <TableCell>
                    {formatDateTime(
                      convertToDateTimeLocal(item?.departureTime)
                    )}
                  </TableCell>
                  <TableCell>{item?.duration}</TableCell>
                  <TableCell>{item?.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditDialogOpen(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteDialogOpen(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.totalResults}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog thêm chuyến bay */}
      <Dialog open={isOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Thêm chuyến bay</DialogTitle>
        <DialogContent>
          <TextField
            name="flightName"
            label="Tên chuyến bay"
            fullWidth
            margin="normal"
            // value={flightData.flightName}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Chọn máy bay</InputLabel>
            <Select
              name="planeId"
              // value={flightData.planeId}
              onChange={handleInputChange}
              label="Chọn máy bay"
            >
              {plane?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item?.planeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Điểm đi</InputLabel>
            <Select
              name="departureAirport"
              // value={flightData.departureAirport}
              onChange={handleInputChange}
              label="Điểm đi"
            >
              {vietnamCities?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Điểm đến</InputLabel>
            <Select
              name="arrivalAirport"
              // value={flightData.arrivalAirport}
              onChange={handleInputChange}
              label="Điểm đến"
            >
              {vietnamCities?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="departureTime"
            label="Thời gian khởi hành"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            // value={flightData.departureTime}
            onChange={handleInputChange}
          />
          <TextField
            name="duration"
            label="Thời gian bay dự kiến (phút)"
            type="number"
            fullWidth
            margin="normal"
            // value={flightData.duration}
            onChange={handleInputChange}
            InputProps={{ inputProps: { min: 30 } }}
          />
          <TextField
            name="price"
            label="Giá vé (VNĐ)"
            type="number"
            fullWidth
            margin="normal"
            // value={flightData.price}
            onChange={handleInputChange}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleAddFlight} variant="contained" color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog sửa chuyến bay */}
      <Dialog open={isEditOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Sửa chuyến bay</DialogTitle>
        <DialogContent>
          <TextField
            name="flightName"
            label="Tên chuyến bay"
            fullWidth
            margin="normal"
            value={flightData?.flightName}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Chọn máy bay</InputLabel>
            <Select
              name="planeId"
              value={flightData?.planeId}
              onChange={handleInputChange}
              label="Chọn máy bay"
            >
              {plane?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.planeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Điểm đi</InputLabel>
            <Select
              name="departureAirport"
              value={flightData?.departureAirport}
              onChange={handleInputChange}
              label="Điểm đi"
            >
              {vietnamCities?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Điểm đến</InputLabel>
            <Select
              name="arrivalAirport"
              value={flightData?.arrivalAirport}
              onChange={handleInputChange}
              label="Điểm đến"
            >
              {vietnamCities?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="departureTime"
            label="Thời gian khởi hành"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={convertToDateTimeLocal(flightData.departureTime)}
            onChange={handleInputChange}
          />
          <TextField
            name="duration"
            label="Thời gian bay dự kiến (phút)"
            type="number"
            fullWidth
            margin="normal"
            value={flightData?.duration}
            onChange={handleInputChange}
            InputProps={{ inputProps: { min: 30 } }}
          />
          <TextField
            name="price"
            label="Giá vé (VNĐ)"
            type="number"
            fullWidth
            margin="normal"
            value={flightData?.price}
            onChange={handleInputChange}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={handleEditFlight}
            variant="contained"
            color="primary"
          >
            sửa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa chuyến bay */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Xác nhận xóa chuyến bay</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa chuyến bay - {selectedFlight?.flightName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={handleDeleteFlight}
            variant="contained"
            color="error"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlightManagement;
