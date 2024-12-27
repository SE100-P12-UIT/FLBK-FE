import {
    Box, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    TextField, InputAdornment, TablePagination,
    IconButton, Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, Select, MenuItem,
    TableContainer,
    Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FlightService from '../../services/flightService';

const FlightManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

    const [data, setData] = useState([]); // State để lưu dữ liệu
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở hộp thoại thêm chuyến bay
    const [flightData, setFlightData] = useState({
        flightid: '',
        airline: '',
        departure: '',
        destination: '',
        departureTime: '',
        duration: '',
        price: '',
    });

    const [isEditOpen, setIsEditOpen] = useState(false); // Trạng thái mở hộp thoại sửa chuyến bay
    const [selectedFlight, setSelectedFlight] = useState(null);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);// Trạng thái mở hộp thoại xóa chuyến bay


    // Gọi API 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlightService.getAllFlights("", "asc", rowsPerPage, page + 1) // Thay API đúng vào đây               
                setData(response || []); // Lưu dữ liệu vào state
                setLoading(false); // Tắt trạng thái loading
                console.log("Dữ liệu api chuyến bay:", response);
            } catch (error) {
                setError('Không thể tải dữ liệu');
                setLoading(false);
            }
        };
        fetchData();
    }, [rowsPerPage, page]);

    // Hiển thị trạng thái loading hoặc lỗi
    if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    const filteredData = data.results.filter(
        (item) => item.flightName && item.flightName.includes(searchTerm)
    );

    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý thay đổi số dòng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Xử lý thêm chuyến bay
    const handleAddDialogOpen = () => {
        setIsOpen(true);

    };

    const handleAddFlight = async () => {
        try {
            // Gọi API thêm chuyến bay
            await FlightService.createFlight(flightData);
            //gọi lại api
            const response = await FlightService.getAllFlights("", "asc", rowsPerPage, page + 1);
            setData(response);
            // Đóng hộp thoại
            handleAddDialogClose();
        } catch (error) {
            console.error('Lỗi khi thêm chuyến bay:', error);
            alert('Không thể thêm chuyến bay. Vui lòng thử lại!');
        }
    };

    const handleAddDialogClose = () => {
        setIsOpen(false);
        setFlightData({
            flightid: '',
            airline: '',
            departure: '',
            destination: '',
            departureTime: '',
            duration: '',
            price: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFlightData({ ...flightData, [name]: value });
    };


    const handleEditDialogOpen = (flight) => {
        setSelectedFlight(flight);
        setFlightData({
            flightid: flight.id,
            airline: flight.email,
            departure: flight.departure,
            destination: flight.destination,
            departureTime: flight.departureTime,
            duration: flight.duration,
            price: flight.price,
        });
        setIsEditOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditOpen(false);
    };
    const handleEditFlight = async () => {
        try {
            // Gọi API để cập nhật thông tin người dùng
            const updatedFlight = await FlightService.updateFlightById(flightData.id, {
                name: flightData.name,
                phoneNumber: flightData.phoneNumber,
                email: flightData.email,
                dateOfBirth: flightData.dateOfBirth,
                citizenId: flightData.citizenId,
                // address: userData.address, // Nếu có trường address
            });
            console.log('Thông tin chuyến bay đã cập nhật:', updatedFlight);

            // Cập nhật danh sách chuyên bay trong state
            setData((prevData) => ({
                ...prevData,
                results: prevData.results.map((flight) =>
                    flight.id === flightData.id ? { ...flight, ...updatedFlight } : flight
                ),
            }));

            // Đóng hộp thoại chỉnh sửa
            handleEditDialogClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin chuyến bay:', error);
            alert('Không thể cập nhật thông tin chuyến bay. Vui lòng thử lại!');
        }
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
                results: prevData.results.filter((flight) => flight.id !== selectedFlight.id),
                totalResults: prevData.totalResults - 1, // Giảm tổng số chuyến bay
            }));

            // Đóng hộp thoại
            handleDeleteDialogClose();
        } catch (error) {
            console.error('Lỗi khi xóa chuyến bay:', error);
            alert('Không thể xóa chuyến bay. Vui lòng thử lại!');
        }
    };

    return (
        <Box>
            <Box sx={{ borderBottom: '1px solid #ddd' }}>
                <Typography variant="h4">Danh sách chuyến bay</Typography>
                <Typography variant="body2">Toàn bộ danh sách chuyến bay sẽ hiển thị ở đây</Typography>
            </Box>
            <Card sx={{ marginBottom: '16px' }}>
                <CardContent sx={{}}>
                    <Typography variant="h4">{data.totalResults}</Typography>
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
                    type="number"
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
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ borderBottom: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Số thứ tự</TableCell>
                            <TableCell>Tên chuyến bay</TableCell>
                            <TableCell>Điểm đi</TableCell>
                            <TableCell>Điểm đến</TableCell>
                            <TableCell>Thời gian khởi hành</TableCell>
                            <TableCell>Thời gian bay dự kiến</TableCell>
                            <TableCell>Giá vé</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item, index) => {
                            const dt = new Date(item.departureTime);
                            const formatdeparture = dt.toLocaleString("en-GB")
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.flightName}</TableCell>
                                    <TableCell>{item.route[0].airport} - {item.route[0].location}</TableCell>
                                    <TableCell>{item.route[1].airport} - {item.route[1].location}</TableCell>
                                    <TableCell>{formatdeparture}</TableCell>
                                    <TableCell>{item.duration}</TableCell>
                                    <TableCell>{item?.price.$numberDecimal}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditDialogOpen(item)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => handleDeleteDialogOpen(item)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Dialog thêm chuyến bay */}
            <Dialog open={isOpen} onClose={handleAddDialogClose}>
                <DialogTitle>Thêm chuyến bay</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Hãng máy bay</InputLabel>
                        <Select
                            name="airline"
                            value={flightData.airline}
                            onChange={handleInputChange}
                            label="Hãng máy bay"
                        >
                            <MenuItem value="VietJet">VietJet</MenuItem>
                            <MenuItem value="VietNamAirline">VietNamAirline</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Chọn máy bay</InputLabel>
                        <Select
                            name="plane"
                            value={flightData.planeid}
                            onChange={handleInputChange}
                            label="Chọn máy bay"
                        >
                            <MenuItem value="A313">A313</MenuItem>
                            <MenuItem value="A310">A310</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Điểm đi</InputLabel>
                        <Select
                            name="departure"
                            value={flightData.departure}
                            onChange={handleInputChange}
                            label="Điểm đi"
                        >
                            <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
                            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Điểm đến</InputLabel>
                        <Select
                            name="destination"
                            value={flightData.destination}
                            onChange={handleInputChange}
                            label="Điểm đến"
                        >
                            <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
                            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="departureTime"
                        label="Thời gian khởi hành"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={flightData.departureTime}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="duration"
                        label="Thời gian bay dự kiến (giờ)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={flightData.duration}
                        onChange={handleInputChange}
                        InputProps={{ inputProps: { min: 0.5 } }}
                    />
                    <TextField
                        name="price"
                        label="Giá vé (VNĐ)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={flightData.price}
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Hãng máy bay</InputLabel>
                        <Select
                            name="airline"
                            value={flightData.airline}
                            onChange={handleInputChange}
                            label="Hãng máy bay"
                        >
                            <MenuItem value="VietJet">VietJet</MenuItem>
                            <MenuItem value="VietNamAirline">VietNamAirline</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Điểm đi</InputLabel>
                        <Select
                            name="departure"
                            value={flightData.departure}
                            onChange={handleInputChange}
                            label="Điểm đi"
                        >
                            <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
                            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Điểm đến</InputLabel>
                        <Select
                            name="destination"
                            value={flightData.destination}
                            onChange={handleInputChange}
                            label="Điểm đến"
                        >
                            <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
                            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="departureTime"
                        label="Thời gian khởi hành"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={flightData.departureTime}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="duration"
                        label="Thời gian bay dự kiến (giờ)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={flightData.duration}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="price"
                        label="Giá vé (VNĐ)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={flightData.price}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleEditFlight} variant="contained" color="primary">
                        sửa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog xác nhận xóa chuyến bay */}
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Xác nhận xóa chuyến bay</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa chuyến bay {selectedFlight?.id} - {selectedFlight?.airline}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteFlight} variant="contained" color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FlightManagement;