import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TicketTypeService from "../../services/ticketTypeService";

const FlightConfig = () => {
  const [minDuration, setMinDuration] = useState(0); //Min flight duration
  const [ticketTypes, setTicketTypes] = useState([]); // Ticket types list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [isEditOpen, setIsEditOpen] = useState(false); // Edit dialog state
  const [currentTicketType, setCurrentTicketType] = useState({}); // Current ticket type being edited

  // Fetch ticket types on component load
  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const response = await TicketTypeService.getTicketTypes();
        console.log("Fetched Ticket Types:", response);
        setTicketTypes(response.results || []); // Assuming `results` contains the array
        setMinDuration(45); // Example default value for minimum flight duration
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };

    fetchTicketTypes();
  }, []);

  const handleEditOpen = (ticket) => {
    setCurrentTicketType(ticket);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setCurrentTicketType({});
  };

  const handleEditSave = async () => {
    try {
      const updatedTicketType = await TicketTypeService.updateTicketTypeById(
        currentTicketType._id,
        { coefficient: currentTicketType.coefficient }
      );
      setTicketTypes((prev) =>
        prev.map((ticket) =>
          ticket._id === updatedTicketType._id ? updatedTicketType : ticket
        )
      );
      handleEditClose();
    } catch (error) {
      console.error("Cập nhật hệ số bị lỗi", error);
      alert("Cập nhật hệ số bị lỗi. Xin vui lòng thử lại.");
    }
  };

  const handleSave = () => {
    if (minDuration < 20) {
      alert("Thời gian tối thiểu không thể dưới 20 phút."); // Alert if below 20 minutes
      return;
    }
    console.log("Saved:", minDuration);
    // Add your save logic here
  };

  if (loading) return <Typography>Đang tải dữ liệu...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Box sx={{ borderBottom: "1px solid #ddd", marginBottom: 2 }}>
        <Typography variant="h4">Quản lý các quy định</Typography>
        <Typography variant="body2">
          Chỉnh sửa quy định về thời gian bay tối thiểu và hệ số của hạng vé tại đây.
        </Typography>
      </Box>

      {/* Minimum Flight Duration */}
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6">Thời gian bay tối thiểu</Typography>
          <TextField
            type="number"
            value={minDuration}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              // Ensure the value is not below 20
              if (value >= 0) {
                setMinDuration(value);
              }
            }}
            label="Thời gian tối thiểu (minutes)"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </CardContent>
      </Card>

      {/* Ticket Type Coefficients */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Hệ số của hạng vé
          </Typography>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Loại vé</TableCell>
                    <TableCell>Hệ số vé</TableCell>
                    <TableCell>Điều chỉnh</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(ticketTypes) &&
                    ticketTypes.map((ticket) => (
                        <TableRow key={ticket.id}>
                        <TableCell>{ticket.typeName}</TableCell>
                        <TableCell>{ticket.coefficient.$numberDecimal}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => handleEditOpen(ticket)}>
                            <EditIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
      </CardContent>
      </Card>

      {/* Edit Coefficient Dialog */}
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Coefficient</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Hệ số"
            value={currentTicketType.coefficient || ""}
            onChange={(e) =>
              setCurrentTicketType({
                ...currentTicketType,
                coefficient: parseFloat(e.target.value),
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlightConfig;
