import {
    Box, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    TextField, InputAdornment, TablePagination,
    IconButton,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';



const FlightManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Số dòng trên mỗi trang

    const [data, setData] = useState([]); // State để lưu dữ liệu
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    // Gọi API 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users'); // Thay API đúng vào đây
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json(); // Chuyển đổi dữ liệu thành JSON
                console.log('Dữ liệu từ API:', result);
                setData(result.users || []); // Lưu dữ liệu vào state
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

    const filteredData = data.filter(
        (item) => item.phone && item.phone.includes(searchTerm)
    );

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

    return (
        <Box sx={{}}>
            <Box sx={{ borderBottom: '1px solid #ddd' }}>
                <Typography variant="h4">Danh sách chuyến bay</Typography>
                <Typography variant="body2">Toàn bộ danh sách chuyến bay sẽ hiển thị ở đây</Typography>
            </Box>
            <Card sx={{ marginBottom: '16px' }}>
                <CardContent sx={{ bgcolor: '#DDFAF0' }}>
                    <Typography variant="h4">{data.length}</Typography>
                    <Typography variant="body2">Số lượng chuyến bay</Typography>
                </CardContent>
            </Card>
            <Box mt={2} textAlign="right">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    Thêm chuyến bay
                </Button>
            </Box>
            <Box>
                <TextField
                    placeholder="Tìm kiếm theo..."
                    type="number"
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
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ borderBottom: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã chuyến bay</TableCell>
                            <TableCell>Hãng</TableCell>
                            <TableCell>Điểm đi</TableCell>
                            <TableCell>Điểm đến</TableCell>
                            <TableCell>Thời gian khởi hành</TableCell>
                            <TableCell>Thời gian bay dự kiến</TableCell>
                            <TableCell>Giá vé</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>
                                    <IconButton><EditIcon></EditIcon>
                                    </IconButton>
                                    <IconButton><DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

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
export default FlightManagement