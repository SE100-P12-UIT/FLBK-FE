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
  TableContainer,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
// import axios from 'axios';

// const data1 = [
//     { id: '#0001', name: 'Minh Tuấn', phone: '0123456789', email: 'tuan@example.com' },
//     { id: '#0002', name: 'Thái Tuấn', phone: '0976865145', email: 'tthai@example.com' },
//     { id: '#0003', name: 'Anh Thư', phone: '0875154251', email: 'anhthu12@example.com' },
//     { id: '#0004', name: 'Minh Tuấn', phone: '0123456789', email: 'tuan@example.com' },
//     { id: '#0005', name: 'Thái Tuấn', phone: '0976865145', email: 'tthai@example.com' },
//     { id: '#0006', name: 'Anh Thư', phone: '0875154251', email: 'anhthu12@example.com' },
//     { id: '#0007', name: 'Minh Tuấn', phone: '0123456789', email: 'tuan@example.com' },
//     { id: '#0008', name: 'Thái Tuấn', phone: '0976865145', email: 'tthai@example.com' },
//     { id: '#0009', name: 'Anh Thư', phone: '0875154251', email: 'anhthu12@example.com' },
//     { id: '#0010', name: 'Minh Tuấn', phone: '0123456789', email: 'tuan@example.com' },
//     { id: '#0011', name: 'Thái Tuấn', phone: '0976865145', email: 'tthai@example.com' },
//     { id: '#0012', name: 'Anh Thư', phone: '0875154251', email: 'anhthu12@example.com' },
// ]; // đổi data nếu call API

const apiurl = "https://dummyjson.com/users";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số dòng trên mỗi trang

  const [data, setData] = useState([]); // State để lưu dữ liệu
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Gọi API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiurl); // Thay API đúng vào đây
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Chuyển đổi dữ liệu thành JSON
        console.log("Dữ liệu từ API:", result);
        setData(result.users || []); // Lưu dữ liệu vào state
        setData(result.users || []); // Lưu dữ liệu vào state
        setLoading(false); // Tắt trạng thái loadingSet-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
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
      <Box sx={{ borderBottom: "1px solid #ddd" }}>
        <Typography variant="h4">Danh sách khách hàng</Typography>
        <Typography variant="body2">
          Toàn bộ danh sách khách hàng sẽ hiển thị ở đây
        </Typography>
      </Box>
      <Card sx={{ marginBottom: "16px" }}>
        <CardContent sx={{}}>
          <Typography variant="h4">{data.length}</Typography>
          <Typography variant="body2">Số lượng khách hàng</Typography>
        </CardContent>
      </Card>
      <TextField
        placeholder="Tìm kiếm theo số điện thoại"
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
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ borderBottom: "1px solid #ddd" }}>
          <TableHead>
            <TableRow>
              <TableCell>Số thứ tự</TableCell>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
              </TableRow>
            ))}
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
  );
};

export default CustomerList;
