import React, { useState } from "react";
import {
    Box, TextField, Button, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Paper, Typography
} from "@mui/material";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import ReportService from "../../services/report";
import { toast } from "react-toastify";

const Revenue = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportData, setReportData] = useState([]);

    const handleGenerateReport = async () => {
        console.log(
            "Lập báo cáo từ: " + startDate + " đến " + endDate
        );
        if (startDate <= endDate) {
            try {
                const response = await ReportService.generateFlightReport(startDate, endDate);
                const ticketData = response || [];
                await setReportData(ticketData); // Lưu dữ liệu API vào state
                console.log("Dữ liệu API báo cáo:", response);
            } catch (error) {
                console.log("Lỗi:", error);
                toast.error("Lỗi khi gọi API");
            }
        } else {
            toast.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc");
        }
    };

    const exportToExcel = () => {
        const data = reportData.map((item, index) => ({
            "Số thứ tự": index + 1,
            "Mã chuyến bay": item._id,
            "Tổng số vé bán ra": item.totalTicketsSold,
            "Tổng doanh thu": item.totalRevenue,
            "Tổng số vé hủy": item.totalTicketsCanceled,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        XLSX.writeFile(workbook, "Report.xlsx");
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ borderBottom: "1px solid #ddd", marginBottom: 2 }}>
                <Typography variant="h4">Lập báo cáo</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, maxWidth: 800, alignItems: "center" }}>
                <TextField
                    type="date"
                    label="Ngày bắt đầu"
                    value={startDate}
                    onChange={(e) => setStartDate(dayjs(e.target.value).format("YYYY-MM-DD"))}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1 }}
                />
                <TextField
                    type="date"
                    label="Ngày kết thúc"
                    value={endDate}
                    onChange={(e) => setEndDate(dayjs(e.target.value).format("YYYY-MM-DD"))}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerateReport}
                    sx={{ height: "56px", flex: "none" }}
                >
                    Lập báo cáo
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={exportToExcel}
                    sx={{ height: "56px", flex: "none" }}
                >
                    Xuất Excel
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Số thứ tự</TableCell>
                            <TableCell>Mã chuyến bay</TableCell>
                            <TableCell>Tổng số vé bán ra</TableCell>
                            <TableCell>Tổng doanh thu</TableCell>
                            <TableCell>Tổng số vé hủy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportData.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item._id}</TableCell>
                                <TableCell>{item.totalTicketsSold}</TableCell>
                                <TableCell>{item.totalRevenue}</TableCell>
                                <TableCell>{item.totalTicketsCanceled}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Revenue;