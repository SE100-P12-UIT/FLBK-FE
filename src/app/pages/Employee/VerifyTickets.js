import {
    Box, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    TextField, InputAdornment, TablePagination,
    Button,
    TableContainer,
    Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react';

const apiurl = 'https://dummyjson.com/products' // api 

const VerifyTickets = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

    const [data, setData] = useState([]); // State để lưu dữ liệu
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    // Gọi API 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiurl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json(); // Chuyển đổi dữ liệu thành JSON
                console.log('Dữ liệu từ API:', result);
                setData(result.products || []); // Lưu dữ liệu vào state
                setLoading(false); // Tắt trạng thái loadingSet-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                setError('Không thể tải dữ liệu');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Hiển thị trạng thái loading hoặc lỗi
    if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    const filteredData = Array.isArray(data) ? data.filter(
        (item) => item.title && item.title.includes(searchTerm)
    ) : [];

    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
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

    const handleConfirmClick = () => {
        alert("Button xác nhận đã được nhấn!");
    };

    const handleCancelClick = () => {
        alert("Button từ chối đã được nhấn!");
    };

    return (
        <Box sx={{}}>
            <Box sx={{ borderBottom: '1px solid #ddd' }}>
                <Typography variant="h4">Danh sách vé chờ xác nhận</Typography>
                <Typography variant="body2">Toàn bộ danh sách vé sẽ hiển thị ở đây</Typography>
            </Box>
            <Card sx={{ marginBottom: '16px' }}>
                <CardContent sx={{  }}>
                    <Typography variant="h4">{data.length}</Typography>
                    <Typography variant="body2">Số lượng Vé chờ xác nhận</Typography>
                </CardContent>
            </Card>
            <Box>
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
            </Box>

            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ borderBottom: '1px solid #ddd' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Số thứ tự</TableCell>
                            <TableCell>Tên khách hàng</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Hãng</TableCell>
                            <TableCell>Điểm đi</TableCell>
                            <TableCell>Điểm đến</TableCell>
                            <TableCell>Thời gian khởi hành</TableCell>
                            <TableCell>Tùy chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item, index) => {
                            const createdAt = new Date(item.meta.createdAt);
                            // Chỉ hiển thị ngày (theo định dạng địa phương, ví dụ: dd/mm/yyyy hoặc mm/dd/yyyy tùy vào cài đặt)
                            const formattedDate = createdAt.toLocaleString("en-GB");
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{formattedDate}</TableCell>
                                    <TableCell>{item.meta.updatedAt}</TableCell>
                                    <TableCell>{formattedDate}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="success" size='small' sx={{ width: '100px' }} onClick={handleConfirmClick}>
                                            Xác nhận
                                        </Button>
                                        <Button variant="outlined" color="error" size='small' sx={{ width: '100px' }} onClick={handleCancelClick}>
                                            Từ chối
                                        </Button>
                                    </TableCell>
                                </TableRow>);
                        })}
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
        </Box>
    )
};

export default VerifyTickets