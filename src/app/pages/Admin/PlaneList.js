import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PlaneService from "../../services/planeService";
import PlaneSeatDialog from "./PlaneSeatDialog";

const PlaneList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

  const [data, setData] = useState([]); // State để lưu dữ liệu
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở hộp thoại thêm máy bay
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [planeData, setplaneData] = useState({
    id: "",
    planeName: "",
    maxSeats: "",
    airline: "",
    seats: [],
  });

  const [isSeatDialogOpen, setIsSeatDialogOpen] = useState(false);
  //   const [seatConfiguration, setSeatConfiguration] = useState([]);

  const handleSeatDialogOpen = () => {
    setIsSeatDialogOpen(true);
  };

  const handleSeatDialogClose = () => {
    setIsSeatDialogOpen(false);
  };

  const handleSeatDialogSave = (newSeats) => {
    // setSeatConfiguration(newSeats);
    setplaneData({ ...planeData, seats: newSeats });
    console.log(planeData.seats);
    console.log("Sơ đồ ghế đã lưu:", newSeats);
  };

  const handleAddDialogOpen = () => {
    setIsOpen(true);
  };
  const handleAddDialogClose = () => {
    setplaneData({
      id: "",
      planeName: "",
      maxSeats: "",
      airline: "",
      seats: [],
    });
    setIsOpen(false);
  };

  const handleAddPlane = async () => {
    try {
      const payload = {
        planeName: planeData.planeName,
        maxSeats: planeData.maxSeats,
        airline: planeData.airline,
        seats: planeData.seats,
      };

      await PlaneService.createPlane(payload);

      const response = await PlaneService.getAllPlane();
      if (response) {
        toast.success("Thêm máy bay thành công!");
      }
      setData(response || []);

      handleAddDialogClose();
    } catch (error) {
      console.error("Lỗi khi thêm máy bay:", error);
      toast.error("Không thể thêm máy bay. Vui lòng thử lại!");
    }
  };

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlaneService.getAllPlane();
        console.log("Dữ liệu từ API:", response);
        setData(response || []);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hiển thị trạng thái loading hoặc lỗi
  if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          (item.planeName && item.planeName.includes(searchTerm)) ||
          (item.airline && item.airline.includes(searchTerm))
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

  const handleEditDialogOpen = (plane) => {
    setSelectedPlane(plane);
    setplaneData({
      id: plane.id,
      planeName: plane.planeName,
      maxSeats: plane.maxSeats,
      airline: plane.airline,
      seats: plane.seats,
    });
    setIsEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditOpen(false);
  };

  const handleEditPlane = async () => {
    try {
      const payload = {
        planeName: planeData.planeName,
        maxSeats: planeData.maxSeats,
        airline: planeData.airline,
        seats: planeData.seats,
      };

      const action = await PlaneService.updatePlaneById(
        selectedPlane.id,
        payload
      );

      const response = await PlaneService.getAllPlane();
      if (action) {
        toast.success("Sửa máy bay thành công!");
      }
      setData(response || []);

      // Đóng hộp thoại chỉnh sửa
      handleEditDialogClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin máy bay:", error);
      toast.error("Không thể cập nhật thông tin máy bay. Vui lòng thử lại!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setplaneData({ ...planeData, [name]: value });
  };

  const handleDeleteDialogOpen = (plane) => {
    setSelectedPlane(plane);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedPlane(null);
  };

  const handleDeletePlane = async () => {
    try {
      if (!selectedPlane?.id) return;

      // Gọi API xóa máy bay
      const action = await PlaneService.deletePlaneById(selectedPlane.id);

      console.log(`Đã xóa máy bay có ID: ${selectedPlane.id}`);

      const response = await PlaneService.getAllPlane();
      if (action) {
        toast.success("Xóa máy bay thành công!");
      }
      setData(response || []);

      handleDeleteDialogClose();
    } catch (error) {
      console.error("Lỗi khi xóa máy bay:", error);
      toast.error("Không thể xóa máy bay. Vui lòng thử lại!");
    }
  };

  return (
    <Box sx={{}}>
      <Box sx={{ borderBottom: "1px solid #ddd" }}>
        <Typography variant="h4">Danh sách máy bay</Typography>
        <Typography variant="body2">
          Toàn bộ danh sách máy bay sẽ hiển thị ở đây
        </Typography>
      </Box>
      <Card sx={{ marginBottom: "16px" }}>
        <CardContent sx={{}}>
          <Typography variant="h4">{data.totalResults}</Typography>
          <Typography variant="body2">Số lượng máy bay</Typography>
        </CardContent>
      </Card>
      <Box mt={2} textAlign="right">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDialogOpen}
          startIcon={<AddIcon />}
        >
          Thêm máy bay
        </Button>
      </Box>
      <TextField
        placeholder="Tìm kiếm theo tên máy bay hoặc hãng"
        // type="number"
        // variant="outlined"
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
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ borderBottom: "1px solid #ddd", whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              <TableCell>Số thứ tự</TableCell>
              <TableCell>Tên máy bay</TableCell>
              <TableCell>Hãng</TableCell>
              <TableCell>Số ghế tối đa</TableCell>
              {/* <TableCell>Ghế</TableCell> */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.planeName}</TableCell>
                  <TableCell>{item.airline}</TableCell>
                  <TableCell>{item.maxSeats}</TableCell>
                  {/* <TableCell>{item.seats}</TableCell> */}
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
        count={data?.totalResults || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog thêm máy bay */}

      <Dialog open={isOpen} onClose={handleAddDialogClose} fullScreen>
        <DialogTitle>Thêm máy bay</DialogTitle>
        <DialogContent>
          <TextField
            name="planeName"
            label="Tên máy bay"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Hãng</InputLabel>
            <Select name="airline" onChange={handleInputChange} label="Hãng">
              <MenuItem value="VietJet">VietJet</MenuItem>
              <MenuItem value="VietNamAirline">VietNamAirline</MenuItem>
              <MenuItem value="BambooAirway">BambooAirway</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="maxSeats"
            label="Số ghế tối đa"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={50}
            InputProps={{ inputProps: { min: 1 } }}
            onChange={handleInputChange}
          />
          <Button
            name="seat"
            fullWidth
            margin="auto"
            variant="contained"
            onClick={handleSeatDialogOpen}
          >
            Cấu hình danh sách ghế
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleAddPlane} variant="contained" color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
      <PlaneSeatDialog
        maximumSeats={planeData.maxSeats || 50}
        open={isSeatDialogOpen}
        onClose={handleSeatDialogClose}
        onSave={handleSeatDialogSave}
      />

      {/* Dialog sửa máy bay */}
      <Dialog open={isEditOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Sửa thông tin máy bay</DialogTitle>
        <DialogContent>
          <TextField
            name="planeName"
            label="Tên máy bay"
            fullWidth
            margin="normal"
            value={planeData.planeName || ""}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Hãng</InputLabel>
            <Select
              name="airline"
              value={planeData.airline || ""}
              onChange={handleInputChange}
              label="Hãng"
            >
              <MenuItem value="VietJet">VietJet</MenuItem>
              <MenuItem value="VietNamAirline">VietNamAirline</MenuItem>
              <MenuItem value="other">Khác...</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="maxSeats"
            label="Số ghế tối đa"
            type="number"
            fullWidth
            margin="normal"
            value={planeData.maxSeats || ""}
            InputProps={{ inputProps: { min: 1 } }}
            onChange={handleInputChange}
          />
          <Button fullWidth variant="contained" onClick={handleSeatDialogOpen}>
            Cấu hình danh sách ghế
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleEditPlane} variant="contained" color="primary">
            Sửa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa máy bay */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Xác nhận xóa máy bay?</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn máy bay tên: {selectedPlane?.planeName} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleDeletePlane} variant="contained" color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlaneList;
