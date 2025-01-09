import { Box, Button, Card, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../../services/userService";
import BookingHistory from "./BookingHistory";

const TabSection = () => {
    const tabs = ["Tài khoản", "Lịch sử đặt vé"];
    const [activeTab, setActiveTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const convertToDateTimeLocal = (isoString) => {
        // Bỏ phần múi giờ và cắt đến "yyyy-MM-ddThh:mm"
        return isoString.replace(/Z$/, '').slice(0, 10);
    };

    const getDiscountCoefficient = (point) => {
        if (point < 5000000)
            return 1;
        if (point < 10000000)
            return 0.95;
        if (point < 15000000)
            return 0.90;
        if (point < 20000000)
            return 0.85;
        if (point >= 20000000)
            return 0.8;

    };

    const data = useSelector((state) => state.user.user)
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const userData = await UserService.getUserById(data.id);
                console.log("api data: ", userData);
                
                setuser(userData);
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchData();
    }, [data.id])


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
                                    {convertToDateTimeLocal(user.dateOfBirth)}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ pb: 1, pl: 2 }}>
                                    Hiện bạn đã tích được số điểm giảm giá:
                                </Typography>
                                <Typography variant="body2" sx={{ pl: 2 }}>
                                    {Math.round(user?.point) || 0} | Tương đương giảm giá: { Math.round((1 - getDiscountCoefficient(user?.point || 0)) * 100) || 0} %
                                </Typography>
                            </Box>
                            <Button variant="contained" color="primary">
                                Thay đổi
                            </Button>
                        </Card>
                    </Box>
                )}
                {activeTab === 1 && <BookingHistory />}
                {/* {activeTab === 2 && <Typography variant="h4">Phương thức thanh toán</Typography>} */}
            </Box>
        </Box>
    );
}

export default TabSection;
