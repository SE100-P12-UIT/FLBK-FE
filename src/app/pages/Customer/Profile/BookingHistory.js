import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    Grid,
} from "@mui/material";

const BookingHistory = () => {
    const bookings = [
        {
            id: 1,
            airline: "Emirates",
            departure: "Newark (EWR)",
            arrival: "Newark (EWR)",
            departureTime: "12:00 pm",
            arrivalTime: "6:00 pm",
            date: "Dec 22",
            gate: "C12",
            seat: "12B",
        },
        {
            id: 2,
            airline: "Emirates",
            departure: "Newark (EWR)",
            arrival: "Newark (EWR)",
            departureTime: "12:00 pm",
            arrivalTime: "6:00 pm",
            date: "Dec 22",
            gate: "C12",
            seat: "12B",
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh", minWidth: '500px' }}>
            <Box sx={{ mt: 2, p: 2 }}>
                <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        Lịch sử đặt vé / Hủy vé
                    </Typography>
                    <Grid container spacing={2} >
                        {bookings.map((booking) => (
                            <Grid item xs={12} key={booking.id}>
                                <Card sx={{ boxShadow: 3 }}>
                                    <CardContent sx={{}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2}>
                                                <Avatar
                                                    src="/emirates-logo.jpg"
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="h6">{booking.airline}</Typography>
                                                <Typography variant="body2">
                                                    {booking.departure} → {booking.arrival}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {booking.date}, {booking.departureTime} -{" "}
                                                    {booking.arrivalTime}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="body2" textAlign="left">
                                                    Gate: {booking.gate}
                                                </Typography>
                                                <Typography variant="body2" textAlign="left">
                                                    Seat: {booking.seat}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} >
                                                <Typography textAlign="right" minWidth='40px'>
                                                    <Button variant="outlined">Hủy vé</Button>
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default BookingHistory;
