import {
    Box, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    TextField, InputAdornment, TablePagination,
    TableContainer,
    Paper, Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react';
import UserService from '../../services/userService';


const CustomerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

    const [data, setData] = useState([]); // State để lưu dữ liệu
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    const [userData, setuserData] = useState({

    });

    const [isEditOpen, setIsEditOpen] = useState(false); // Trạng thái mở hộp thoại sửa chuyến bay
    const [selectedUser, setSelectedUser] = useState(null);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);// Trạng thái mở hộp thoại xóa chuyến bay

    const [value, setValue] = useState();

    // Gọi API 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getAllUsers("user", "asc", rowsPerPage, page + 1); // Thay API đúng vào đây
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
        (item) => item.email && item.email.includes(searchTerm) ||
            item.phoneNumber && item.phoneNumber.includes(searchTerm)
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

    const handleEditDialogOpen = (user) => {
        setSelectedUser(user);
        setuserData({
            id: user.id,
            email: user.email,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            // address: user.address
        });
        setIsEditOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditOpen(false);
    };
    const handleEditUser = () => {
        // Thêm logic xử lý dữ liệu ở đây (ví dụ: gửi lên server)
        console.log('Dữ liệu sửa thông tin khách hàng:', userData);
        handleEditDialogClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuserData({ ...userData, [name]: value });
    };
    //Xóa chuyến bay
    const handleDeleteDialogOpen = (user) => {
        setSelectedUser(user);
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = () => {
        console.log(`Xóa khách hàng có ID: ${selectedUser.id}`);
        // Logic xóa khách hàng ở đây (có thể gọi API xóa từ server)
        setOpenDeleteDialog(false);
    };

    return (
        <Box sx={{}}>
            <Box sx={{ borderBottom: '1px solid #ddd' }}>
                <Typography variant="h4">Danh sách khách hàng</Typography>
                <Typography variant="body2">Toàn bộ danh sách khách hàng sẽ hiển thị ở đây</Typography>
            </Box>
            <Card sx={{ marginBottom: '16px' }}>
                <CardContent sx={{}}>
                    <Typography variant="h4">{data.totalResults}</Typography>
                    <Typography variant="body2">Số lượng khách hàng</Typography>
                </CardContent>
            </Card>
            <TextField
                placeholder="Tìm kiếm theo số điện thoại hoặc email"
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
                <Table sx={{ borderBottom: '1px solid #ddd' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Số thứ tự</TableCell>
                            <TableCell>Tên người dùng</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Căn cước công dân</TableCell>
                            {/* <TableCell>Địa chỉ</TableCell> */}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item, index) => {
                            const ns = new Date(item.dateOfBirth);
                            // Chỉ hiển thị ngày (theo định dạng địa phương, ví dụ: dd/mm/yyyy hoặc mm/dd/yyyy tùy vào cài đặt)
                            const formattedDate = ns.toLocaleString("en");
                            return (<TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phoneNumber}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{formattedDate}</TableCell>
                                <TableCell>{item.citizenId}</TableCell>
                                {/* <TableCell>{item.address.ToString}</TableCell> */}
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

            {/* Dialog sửa khách hàng */}
            <Dialog open={isEditOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Sửa thông tin khách hàng</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Họ và tên"
                        fullWidth
                        margin="normal"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="phoneNumber"
                        label="Số điện thoại"
                        fullWidth
                        margin="normal"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <DatePicker
                        label="Ngày sinh"
                        value={userData.dateOfBirth}
                        onChange={(newValue) => setValue(newValue)}
                    />
                    <TextField
                        name="citizenId"
                        label="Căn cước công dân"
                        fullWidth
                        margin="normal"
                        value={userData.citizenId}
                        onChange={handleInputChange}
                    />
                    {/* <TextField
                        name="address"
                        label="Địa chỉ"
                        fullWidth
                        margin="normal"
                        value={userData.address}
                        onChange={handleInputChange}
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleEditUser} variant="contained" color="primary">
                        Sửa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog xác nhận xóa khách hàng */}
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Xác nhận xóa thông tin khách hàng?</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa khách hàng{selectedUser?.name}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteUser} variant="contained" color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};

export default CustomerList