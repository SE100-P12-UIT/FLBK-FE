import {
    Box,
    Button,
    CircularProgress,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReceiptService from "../../../services/receiptService";
import TicketService from "../../../services/ticketService";

const BookingHistory = () => {
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const statusTranslations = {
    Verifying: "Đang xác minh",
    PendingCancel: "Đang chờ hủy",
    Invalid: "Không hợp lệ",
    Canceled: "Đã hủy",
    Success: "Thành công",
  };

  const getStatusInVietnamese = (status) => {
    return statusTranslations[status] || "Không xác định";
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") {
      return "Số tiền không hợp lệ";
    }
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

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
  
    useEffect(() => {
        const fetchHistory = async (userId) => {
            setLoading(true);
            try {
              const data = await ReceiptService.getReceiptsByUserId(userId);
              console.log("API: ", data);
              return data;
            } catch (error) {
              toast.error("Đã có lỗi không xác định xảy ra");
              console.log(error);
            } finally {
              setLoading(false);
            }
          };
          const getHistoryWithTickets = async () => {
            const userHistory = await fetchHistory(userData.id);
            const updatedHistory = await Promise.all(
              userHistory.map(async (receipt) => {
                const tickets = await TicketService.getTicketById(
                  receipt.departureTicket
                );
                return { ...receipt, tickets };
              })
            );
            setHistory(updatedHistory);
          };
    getHistoryWithTickets();
  }, [userData.id,]);

  const handleCancelTicket = async (ticketId) => {
    if (!ticketId) return;

    // Hiển thị xác nhận trước khi hủy vé
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy vé này?");
    if (!isConfirmed) return;

    const fetchHistory = async (userId) => {
        setLoading(true);
        try {
          const data = await ReceiptService.getReceiptsByUserId(userId);
          console.log("API: ", data);
          return data;
        } catch (error) {
          toast.error("Đã có lỗi không xác định xảy ra");
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      const getHistoryWithTickets = async () => {
        const userHistory = await fetchHistory(userData.id);
        const updatedHistory = await Promise.all(
          userHistory.map(async (receipt) => {
            const tickets = await TicketService.getTicketById(
              receipt.departureTicket
            );
            return { ...receipt, tickets };
          })
        );
        setHistory(updatedHistory);
      };
      
    try {
      const result = await TicketService.requestCancelTicketById(ticketId);
      if (result) toast.success("Vé đã được yêu cầu hủy thành công!");
      getHistoryWithTickets();
    } catch (error) {
      if (error === 404) {
        toast.error("Vé không tồn tại hoặc không thể hủy!");
      } else {
        toast.error("Có lỗi xảy ra khi hủy vé. Vui lòng thử lại sau.");
      }
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", minWidth: "500px" }}>
      <Box sx={{ mt: 2, p: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Lịch sử đặt vé / Hủy vé
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {history?.map((receipt) => (
              /* Box ngoài cùng */
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgb(255, 255, 255)",
                  borderRadius: 3,
                  padding: 3,
                  mt: 3,
                  boxShadow: 3,
                }}
              >
                {/* Chứa thông tin của hóa đơn */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6">Thông tin hóa đơn</Typography>
                  <Typography variant="body1">
                    Hóa đơn vào: {formatDateTime(receipt?.createdAt)}
                  </Typography>
                  <Typography variant="body1">
                    Số lượng vé: {receipt?.totalTickets}
                  </Typography>
                  <Typography variant="body1">
                    Thành tiền: {formatCurrency(receipt?.total)}
                  </Typography>
                </Box>

                {/* Chứa danh sách các vé kèm button hủy */}
                {receipt?.tickets?.map((ticket) => (
                  <Box
                    key={ticket.id}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      border: "1px solid #ccc",
                      borderRadius: 3,
                      padding: 2,
                      mt: 1,
                      backgroundColor: "#f9f9f9",
                      justifyContent: "space-between",
                    }}
                  >
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap:1, }}>
                      <Typography variant="body2">
                        Hành khách: {ticket.passenger.name}
                      </Typography>
                      <Typography variant="body2">
                        Chuyến bay: {ticket.flight.flightName}
                      </Typography>
                      <Typography variant="body2">
                        Ghế: {ticket.seatName}
                      </Typography>
                      <Typography variant="body2">
                        Tổng tiền: {formatCurrency((ticket.totalPrice ))}
                      </Typography>
                      <Typography variant="body2">
                        Trạng thái vé: {getStatusInVietnamese(ticket.status)}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                            size="small"
                            disabled={!(ticket.status==="Success")}
                      sx={{
                        borderRadius: 3,
                        height: "fit-content",
                        alignSelf: "center",
                      }}
                      onClick={() => handleCancelTicket(ticket.id)}
                    >
                      Hủy vé
                    </Button>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingHistory;
