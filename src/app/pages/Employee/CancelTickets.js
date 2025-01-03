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
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import TicketService from "../../services/ticketService";
import { toast } from "react-toastify";
import YesNoModal from "../../components/YesNoModal";

const CancelTickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng trên mỗi trang

  const [data, setData] = useState([]); // State để lưu dữ liệu
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const fetchData = async () => {
    try {
      const response = await TicketService.getTicketByStatus("PendingCancel");
      console.log("Dữ liệu từ API:", response);
      setData(response || []); // Lưu dữ liệu vào state
      setLoading(false); // Tắt trạng thái loadingSet-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setError("Không thể tải dữ liệu");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return null;

    // Chuyển chuỗi thành đối tượng Date
    const dateObj = new Date(dateString);

    // Lấy ngày, tháng, năm, giờ, phút, giây
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    // Định dạng lại thành "DD-MM-YYYY HH:mm:ss"
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Hiển thị trạng thái loading hoặc lỗi
  if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const filteredData = Array.isArray(data)
    ? data.filter(
        (item) =>
          item.passenger.name && item.passenger.name.includes(searchTerm)
      )
    : [];

  /*  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ); */

  // Xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý thay đổi số dòng trên mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleConfirmClick = async (ticketId) => {
    try {
      const response =
        await TicketService.acceptRequestCancelTicketById(ticketId);
      if (response) {
        toast.success("Xác nhận yêu cầu hủy vé thành công! Vé đã được hủy");
        fetchData();
      }

      setConfirmModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi không xác định");
    }
  };
  const handleCancelClick = async (ticketId) => {
    // try {
    //     const response = await TicketService.(ticketId);
    //     if (response) toast.success("Từ chối yêu cầu hủy vé thành công! Vé đã không được hủy");
    //     setDeclineModalOpen(false);
    // } catch (error) {
    //     console.log(error);
    //     toast.error("Lỗi không xác định");
    // }
  };

  return (
    <Box sx={{}}>
      <Box sx={{ borderBottom: "1px solid #ddd" }}>
        <Typography variant="h4">Danh sách vé chờ hủy</Typography>
        <Typography variant="body2">
          Toàn bộ danh sách vé sẽ hiển thị ở đây
        </Typography>
      </Box>
      <Card sx={{ marginBottom: "16px" }}>
        <CardContent sx={{}}>
          <Typography variant="h4">{data.length}</Typography>
          <Typography variant="body2">Số lượng Vé chờ hủy</Typography>
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

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ borderBottom: "1px solid #ddd" }}>
          <TableHead>
            <TableRow>
              <TableCell>Số thứ tự</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              {/* <TableCell>Số điện thoại</TableCell>
                                          <TableCell>Email</TableCell> */}
              <TableCell>Ghế</TableCell>
              <TableCell>Mã chuyến bay</TableCell>
              <TableCell>Điểm đi</TableCell>
              <TableCell>Điểm đến</TableCell>
              <TableCell>Thời gian khởi hành</TableCell>
              <TableCell>Tùy chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => {
              /* const createdAt = new Date(item.meta.createdAt); */
              // Chỉ hiển thị ngày (theo định dạng địa phương, ví dụ: dd/mm/yyyy hoặc mm/dd/yyyy tùy vào cài đặt)
              /* const formattedDate = createdAt.toLocaleString("en-GB"); */
              return (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.passenger.name}</TableCell>
                  {/* <TableCell>{item.title}</TableCell>
                                                      <TableCell>{item.title}</TableCell> */}
                  <TableCell>{item.seatName}</TableCell>
                  <TableCell>{item.flight.flightName}</TableCell>
                  <TableCell>{item.flight.departureAirport}</TableCell>
                  <TableCell>{item.flight.arrivalAirport}</TableCell>
                  <TableCell>
                    {formatDateTime(item.flight.departureTime)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ minWidth: "120px", width: "auto", m: 0.5, p: 0.5 }}
                      onClick={() => {
                        setSelectedId(item.id);
                        setConfirmModalOpen(true);
                      }}
                    >
                      Xác nhận
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ minWidth: "120px", width: "auto", m: 0.5, p: 0.5 }}
                      onClick={() => {
                        setSelectedId(item.id);
                        setDeclineModalOpen(true);
                      }}
                    >
                      Từ chối
                    </Button>
                  </TableCell>
                </TableRow>
              );
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

      <YesNoModal
        title="Xác nhận"
        content="Xác nhận yêu cầu hủy vé này?"
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        onYes={() => handleConfirmClick(selectedId)}
        onNo={() => setConfirmModalOpen(false)}
      />
      <YesNoModal
        title="Từ chối"
        content="Từ chối yêu cầu hủy vé này?"
        open={declineModalOpen}
        setOpen={setDeclineModalOpen}
        onYes={() => handleCancelClick(selectedId)}
        onNo={() => setDeclineModalOpen(false)}
      />
    </Box>
  );
};

export default CancelTickets;
