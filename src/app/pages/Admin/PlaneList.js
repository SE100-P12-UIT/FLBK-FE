import {
    Box, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    TextField, InputAdornment, TablePagination,
    TableContainer,
    Paper, Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import UserService from '../../services/userService';

const PlaneList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

    const [data, setData] = useState([]); // State để lưu dữ liệu
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở hộp thoại thêm máy bay
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [planeData, setplaneData] = useState({
        id: '',
        planeName: '',
        maxSeat: '',
        airline: '',
        seat: []
    });

    const handleAddDialogOpen = () => {
        setIsOpen(true);
    };
    const handleAddDialogClose = () => {
        setplaneData({
            id: '',
            planeName: '',
            maxSeat: '',
            airline: '',
            seat: []
        });
        setIsOpen(false);
    };

    const handleAddPlane = async () => {
        // try {
        //     // Gọi API thêm máy bay
        //     // await UserService.createUserAccount(planeData);
        //     //gọi lại api
        const response = await UserService.getAllUsers();
        setData(response);

        // Đóng hộp thoại
        handleAddDialogClose();
        // } catch (error) {
        //     console.error('Lỗi khi thêm máy bay:', error);
        //     alert('Không thể thêm máy bay. Vui lòng thử lại!');
        // }
    };

    const [isEditOpen, setIsEditOpen] = useState(false); // Trạng thái mở hộp thoại sửa máy bay

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);// Trạng thái mở hộp thoại xóa máy bay

    // Gọi API 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getAllUsers("employee", "asc", rowsPerPage, page + 1); // Thay API đúng vào đây
                console.log('Dữ liệu từ API:', response);
                setData(response || []); // Lưu dữ liệu vào state
                setLoading(false); // Tắt trạng thái loadingSet-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                setError('Không thể tải dữ liệu');
                setLoading(false);
            }
        };
        fetchData();
    }, [rowsPerPage, page]);


    // Hiển thị trạng thái loading hoặc lỗi
    if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    const filteredData = Array.isArray(data.results) ? data.results.filter(
        (item) => (item.name && item.name.includes(searchTerm)) ||
            (item.airline && item.airline.includes(searchTerm))
    ) : [];

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
            maxSeat: plane.maxSeat,
            airline: plane.airline,
            seat: plane.seat
        });
        setIsEditOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditOpen(false);
    };


    const handleEditPlane = async () => {
        // try {
        //     // Gọi API để cập nhật thông tin máy bay
        //     const updatedUser = await UserService.updateUserById(userData.id, {
        //         name: userData.name,
        //         phoneNumber: userData.phoneNumber,
        //         email: userData.email,
        //         dateOfBirth: userData.dateOfBirth,
        //         citizenId: userData.citizenId,
        //         // address: userData.address, // Nếu có trường address
        //     });
        //     console.log('Thông tin máy bay đã cập nhật:', updatedUser);

        //     // Cập nhật danh sách máy bay trong state
        //     setData((prevData) => ({
        //         ...prevData,
        //         results: prevData.results.map((user) =>
        //             user.id === userData.id ? { ...user, ...updatedUser } : user
        //         ),
        //     }));

        // Đóng hộp thoại chỉnh sửa
        handleEditDialogClose();
        // } catch (error) {
        //     console.error('Lỗi khi cập nhật thông tin máy bay:', error);
        //     alert('Không thể cập nhật thông tin máy bay. Vui lòng thử lại!');
        // }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setplaneData({ ...planeData, [name]: value });
    };
    //Xóa máy bay
    const handleDeleteDialogOpen = (plane) => {
        setSelectedPlane(plane);
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setSelectedPlane(null);
    };


    const handleDeletePlane = async () => {
        // try {
        //     if (!selectedUser?.id) return;

        //     // Gọi API xóa máy bay
        //     await UserService.deleteUserById(selectedUser.id);

        //     console.log(`Đã xóa máy bay có ID: ${selectedUser.id}`);

        //     // Xóa máy bay khỏi danh sách hiển thị
        //     setData((prevData) => ({
        //         ...prevData,
        //         results: prevData.results.filter((user) => user.id !== selectedUser.id),
        //         totalResults: prevData.totalResults - 1, // Giảm tổng số máy bay
        //     }));

        // Đóng hộp thoại
        handleDeleteDialogClose();
        // } catch (error) {
        //     console.error('Lỗi khi xóa máy bay:', error);
        //     alert('Không thể xóa máy bay. Vui lòng thử lại!');
        // }
    };

    return (
        <Box sx={{}}>
            <Box sx={{ borderBottom: '1px solid #ddd' }}>
                <Typography variant="h4">Danh sách máy bay</Typography>
                <Typography variant="body2">Toàn bộ danh sách máy bay sẽ hiển thị ở đây</Typography>
            </Box>
            <Card sx={{ marginBottom: '16px' }}>
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
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }} >
                <Table sx={{ borderBottom: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Số thứ tự</TableCell>
                            <TableCell>Tên máy bay</TableCell>
                            <TableCell>Hãng</TableCell>
                            <TableCell>Số ghế tối đa</TableCell>
                            <TableCell>Ghế</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item, index) => {
                            return (<TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.airline}</TableCell>
                                <TableCell>{item.maxSeat}</TableCell>
                                <TableCell>{item.seat}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditDialogOpen(item)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeleteDialogOpen(item)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={data.totalResults}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Dialog thêm máy bay */}
            <Dialog open={isOpen} onClose={handleAddDialogClose}>
                <DialogTitle>Thêm máy bay</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Tên máy bay"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Hãng</InputLabel>
                        <Select
                            name="airline"
                            onChange={handleInputChange}
                            label="Hãng"
                        >
                            <MenuItem value="VietJet">VietJet</MenuItem>
                            <MenuItem value="VietNamAirline">VietNamAirline</MenuItem>
                            <MenuItem value="other">Khác...</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="maxSeat"
                        label="Số ghế tối đa"
                        type="number"
                        fullWidth
                        margin="normal"
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="seat"
                        label="Danh sách ghế"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
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

            {/* Dialog sửa máy bay */}
            <Dialog open={isEditOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Sửa thông tin máy bay</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Tên máy bay"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="airline"
                        label="Hãng"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="maxSeat"
                        label="Số ghế tối đa"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="seat"
                        label="Danh sách ghế"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
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
                    <Typography>Bạn có chắc chắn muốn máy bay tên: {selectedPlane?.name} ?</Typography>
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
        </Box >
    )
};

export default PlaneList