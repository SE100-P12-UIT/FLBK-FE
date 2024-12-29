import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography, Button, Card } from "@mui/material";
import { useSelector } from "react-redux";
import BookingHistory from "./BookingHistory";

const TabSection = () => {
    const tabs = ["Tài khoản", "Lịch sử đặt vé", "Phương thức thanh toán"];
    const [activeTab, setActiveTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const data = useSelector((state) => state.user.user)
    useEffect(() => {
        setuser(data);
        console.log(data);
    }, [data])


    const [user, setuser] = useState({
        name: 'Tuan',
        email: 'tuan@gmail.com',
        password: '********',
        phoneNumber: '0123456789',
        address: {},
        dateOfBirth: '12/02/2004'
    });

    return (
        <Box sx={{ mt: 12, bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2, minWidth: '500px' }}>
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                minWidth='500px'
            >
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab} />
                ))}
            </Tabs>
            <Box sx={{ mt: 3, gap: 4, minWidth: '500px' }}>
                {activeTab === 0 && (
                    <Box>
                        <Typography variant="h4" sx={{ p: 2 }}>
                            Tài khoản
                        </Typography>
                        <Card sx={{ flexDirection: 'column', mx: 3, p: 2, backgroundColor: '#FFFFFF' }}>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ pb: 1, pl: 2 }}>
                                    Họ và tên
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 2 }}>
                                    {user.name}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ pb: 1, pl: 2 }}>
                                    Email
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 2 }}>
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ pb: 1, pl: 2 }}>
                                    Password
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 2 }}>
                                    {user.password || '*******'}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ pb: 1, pl: 2 }}>
                                    Số điện thoại
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 2 }}>
                                    {user.phoneNumber}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ pb: 1, pl: 2 }}>
                                    Địa chỉ
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 2 }}>
                                    {user?.address.street}, {user?.address.town}, {user?.address.district}, {user?.address.province}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ pb: 1, pl: 2 }}>
                                    Ngày sinh
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 2 }}>
                                    {user.dateOfBirth}
                                </Typography>
                            </Box>
                            <Button variant="contained" color="primary">
                                Thay đổi
                            </Button>
                        </Card>
                    </Box>
                )}
                {activeTab === 1 && <BookingHistory />}
                {activeTab === 2 && <Typography variant="h4">Phương thức thanh toán</Typography>}
            </Box>
        </Box>
    );
}

export default TabSection;
