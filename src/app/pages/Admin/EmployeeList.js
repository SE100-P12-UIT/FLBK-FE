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
import AddIcon from '@mui/icons-material/Add';


const EmployeeList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

    const [data, setData] = useState([]); // State để lưu dữ liệu
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    const [isOpen, setIsOpen] = useState(false); // Trạng thái mở hộp thoại thêm nhân viên
    const [userData, setuserData] = useState({
        id: '',
        email: '',
        password: '',
        name: '',
        role: 'employee',
        dateOfBirth: null,
        phoneNumber: '',

    });

    const handleAddDialogOpen = () => {
        setIsOpen(true);
    };
    const handleAddDialogClose = () => {
        setuserData({
            id: '',
            email: '',
            password: '',
            name: '',
            role: 'employee',
            dateOfBirth: null,
            phoneNumber: '',
        });
        setIsOpen(false);
    };

    const handleAddUser = async () => {
        try {
            // Gọi API thêm người dùng
            await UserService.createUserAccount(userData);
            //gọi lại api
            const response = await UserService.getAllUsers("employee", "asc", rowsPerPage, page + 1);
            setData(response);

            // Đóng hộp thoại
            handleAddDialogClose();
        } catch (error) {
            console.error('Lỗi khi thêm nhân viên:', error);
            alert('Không thể thêm nhân viên. Vui lòng thử lại!');
        }
    };


    const [isEditOpen, setIsEditOpen] = useState(false); // Trạng thái mở hộp thoại sửa nhân viên
    const [selectedUser, setSelectedUser] = useState(null);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);// Trạng thái mở hộp thoại xóa nhân viên

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
        (item) => (item.email && item.email.includes(searchTerm)) ||
            (item.phoneNumber && item.phoneNumber.includes(searchTerm))
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
            role: user.role,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            citizenId: user.citizenId,
            // address: user.address
        });
        setIsEditOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditOpen(false);
    };


    const handleEditUser = async () => {
        try {
            // Gọi API để cập nhật thông tin người dùng
            const updatedUser = await UserService.updateUserById(userData.id, {
                name: userData.name,
                phoneNumber: userData.phoneNumber,
                email: userData.email,
                dateOfBirth: userData.dateOfBirth,
                citizenId: userData.citizenId,
                // address: userData.address, // Nếu có trường address
            });
            console.log('Thông tin người dùng đã cập nhật:', updatedUser);

            // Cập nhật danh sách nhân viên trong state
            setData((prevData) => ({
                ...prevData,
                results: prevData.results.map((user) =>
                    user.id === userData.id ? { ...user, ...updatedUser } : user
                ),
            }));

            // Đóng hộp thoại chỉnh sửa
            handleEditDialogClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin nhân viên:', error);
            alert('Không thể cập nhật thông tin nhân viên. Vui lòng thử lại!');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuserData({ ...userData, [name]: value });
    };
    //Xóa nhân viên
    const handleDeleteDialogOpen = (user) => {
        setSelectedUser(user);
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setSelectedUser(null);
    };


    const handleDeleteUser = async () => {
        try {
            if (!selectedUser?.id) return;

            // Gọi API xóa nhân viên
            await UserService.deleteUserById(selectedUser.id);

            console.log(`Đã xóa nhân viên có ID: ${selectedUser.id}`);

            // Xóa nhân viên khỏi danh sách hiển thị
            setData((prevData) => ({
                ...prevData,
                results: prevData.results.filter((user) => user.id !== selectedUser.id),
                totalResults: prevData.totalResults - 1, // Giảm tổng số nhân viên
            }));

            // Đóng hộp thoại
            handleDeleteDialogClose();
        } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error);
            alert('Không thể xóa nhân viên. Vui lòng thử lại!');
        }
    };

    return (
        <Box sx={{}}>
            <Box sx={{ borderBottom: '1px solid #ddd' }}>
                <Typography variant="h4">Danh sách nhân viên</Typography>
                <Typography variant="body2">Toàn bộ danh sách nhân viên sẽ hiển thị ở đây</Typography>
            </Box>
            <Card sx={{ marginBottom: '16px' }}>
                <CardContent sx={{}}>
                    <Typography variant="h4">{data.totalResults}</Typography>
                    <Typography variant="body2">Số lượng Nhân viên</Typography>
                </CardContent>
            </Card>
            <Box mt={2} textAlign="right">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddDialogOpen}
                    startIcon={<AddIcon />}
                >
                    Thêm nhân viên
                </Button>
            </Box>
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
                <Table sx={{ borderBottom: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Số thứ tự</TableCell>
                            <TableCell>Tên nhân viên</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Căn cước công dân</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item, index) => {
                            const ns = new Date(item.dateOfBirth);
                            // Chỉ hiển thị ngày (theo định dạng địa phương, ví dụ: dd/mm/yyyy hoặc mm/dd/yyyy tùy vào cài đặt)
                            const formattedDate = ns.toLocaleDateString("en-GB");
                            return (<TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phoneNumber}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{formattedDate}</TableCell>
                                <TableCell>{item.citizenId}</TableCell>
                                <TableCell>{item?.address?.street ? `${item.address.street}, ` : ""}
                    {item?.address?.town ? `${item.address.town}, ` : ""}
                    {item?.address?.district
                      ? `${item.address.district}, `
                      : ""}
                    {item?.address?.province || ""}</TableCell>
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

            {/* Dialog thêm nhân viên */}
            <Dialog open={isOpen} onClose={handleAddDialogClose}>
                <DialogTitle>Thêm nhân viên</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Họ và tên"
                        fullWidth
                        margin="normal"
                        // value={userData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="phoneNumber"
                        label="Số điện thoại"
                        fullWidth
                        margin="normal"
                        // value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
                    <DatePicker
                        name="dateOfBirth"
                        label="Ngày sinh"
                        // value={userData.dateOfBirth ? new Date(userData.dateOfBirth) : null}
                        onChange={(newValue) => setuserData({ ...userData, dateOfBirth: newValue })}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: 'normal',
                            },
                        }}
                    />
                    <TextField
                        name="citizenId"
                        label="Căn cước công dân"
                        fullWidth
                        margin="normal"
                        // value={userData.citizenId}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddUser} variant="contained" color="primary">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog sửa nhân viên */}
            <Dialog open={isEditOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Sửa thông tin nhân viên</DialogTitle>
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
                        name="dateOfBirth"
                        label="Ngày sinh"
                        value={userData.dateOfBirth ? new Date(userData.dateOfBirth) : null}
                        onChange={(newValue) => setuserData({ ...userData, dateOfBirth: newValue })}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: 'normal',
                            },
                        }}
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

            {/* Dialog xác nhận xóa nhân viên */}
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Xác nhận xóa thông tin nhân viên?</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa nhân viên tên {selectedUser?.name} ?</Typography>
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
        </Box >
    )
};

export default EmployeeList