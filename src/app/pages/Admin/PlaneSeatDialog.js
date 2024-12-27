import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import EconomyIcon from "@mui/icons-material/Chair";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PlaneSeatDialog = ({ maximumSeats, open, onClose, onSave }) => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(4);
  const [seats, setSeats] = useState([]);

  const handleGenerateSeats = () => {
    const newSeats = [];
    if (rows < 1 || cols < 1) {
      toast.error("Số hàng và số cột phải lớn hơn 0");
      return;
    }
    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < cols; col++) {
        const seatName = `${row + 1}${String.fromCharCode(65 + col)}`;
        rowSeats.push({
          seatName,
          seatType: "common",
          disable: false,
        });
      }
      newSeats.push(rowSeats);
    }
    setSeats(newSeats);
  };

  const getEnabledSeatCount = () => {
    return seats.flat().filter((seat) => !seat.disable).length;
  };

  const toggleDisableSeat = (rowIndex, colIndex) => {
    const updatedSeats = [...seats];
    updatedSeats[rowIndex][colIndex].disable =
      !updatedSeats[rowIndex][colIndex].disable;

    if (getEnabledSeatCount() > maximumSeats) {
      toast.warning(
        `Số ghế khả dụng hiện tại đang được vượt quá ${maximumSeats}`
      );
    } else {
      toast.clearWaitingQueue();
      toast.dismiss();
    }

    setSeats(updatedSeats);
  };

  const toggleSeatType = (rowIndex, colIndex) => {
    const updatedSeats = [...seats];
    updatedSeats[rowIndex][colIndex].seatType =
      updatedSeats[rowIndex][colIndex].seatType === "business"
        ? "common"
        : "business";
    setSeats(updatedSeats);
  };

  const setRowSeatType = (rowIndex, seatType) => {
    const updatedSeats = [...seats];
    updatedSeats[rowIndex] = updatedSeats[rowIndex].map((seat) => ({
      ...seat,
      seatType,
    }));
    setSeats(updatedSeats);
  };

  const handleSave = () => {
    const enabledSeatCount = getEnabledSeatCount();
    if (enabledSeatCount > maximumSeats) {
      toast.error(
        `Số ghế khả dụng (${enabledSeatCount}) vượt quá giới hạn tối đa (${maximumSeats}).`
      );
      return;
    }
    onSave(seats.flat());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen fullWidth>
      <DialogTitle>Thiết lập sơ đồ ghế</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          gap={2}
          mb={4}
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <TextField
            label="Số hàng"
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 1 } }}
          />
          <TextField
            label="Số cột"
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 1 } }}
          />
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            startIcon={<AddIcon sx={{}} />}
            sx={{
              minWidth: "250px",
            }}
            onClick={handleGenerateSeats}
          >
            <Typography variant="h6" textTransform="none">
              Tạo sơ đồ ghế
            </Typography>
          </Button>
        </Box>
        <Box>
          {seats.map((rowSeats, rowIndex) => (
            <Box
              key={rowIndex}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              gap={1}
              mb={2}
            >
              <Grid2 container spacing={1} sx={{ justifyContent: "center" }}>
                {rowSeats.map((seat, colIndex) => (
                  <Grid2
                    item
                    key={seat.seatName}
                    xs={12 / cols}
                    sx={{
                      maxWidth: "150px",
                      minWidth: "150px",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={1}
                      p={1}
                      border="1px solid #ddd"
                      borderRadius="8px"
                      bgcolor={seat.disable ? "#f5f5f5" : "#fff"}
                      sx={{
                        minWidth: "100px",
                        maxWidth: "200px",
                        minHeight: "50px",
                        maxHeight: "100px",
                      }}
                    >
                      <Typography variant="body2" align="center" marginX="auto">
                        {seat.seatName}
                      </Typography>
                      <IconButton
                        color={
                          seat.seatType === "business" ? "primary" : "default"
                        }
                        onClick={() => toggleSeatType(rowIndex, colIndex)}
                      >
                        {seat.seatType === "business" ? (
                          <BusinessIcon />
                        ) : (
                          <EconomyIcon />
                        )}
                      </IconButton>
                      <IconButton
                        color={seat.disable ? "error" : "default"}
                        onClick={() => toggleDisableSeat(rowIndex, colIndex)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  rowGap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    minWidth: "100px",
                    p: 1,
                  }}
                  onClick={() => setRowSeatType(rowIndex, "business")}
                >
                  <Typography variant="caption" textTransform="none">
                    Thương gia
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  sx={{
                    minWidth: "100px",
                    p: 1,
                  }}
                  onClick={() => setRowSeatType(rowIndex, "common")}
                >
                  <Typography
                    width="fit-content"
                    variant="caption"
                    textTransform="none"
                  >
                    Thường
                  </Typography>
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaneSeatDialog;
