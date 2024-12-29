import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileCard = () => {
    const data = useSelector((state) => state.user.user)
    return (
        <Box
            sx={{
                position: "relative",
                background: "linear-gradient(to right, #f97316, #ec4899)",
                height: '30vh',
                borderRadius: 2,
                minWidth: '500px',
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    justifyItems: "center",
                    bottom: -80,
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                }}
            >
                <Avatar
                    src="/avatar.jpg"
                    alt="User"
                    sx={{
                        width: 80,
                        height: 80,
                        border: "4px solid white",
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        color: "Black",
                        fontWeight: "bold",
                        mt: 1,
                    }}
                >
                    {data.name}
                </Typography>
            </Box>
        </Box>
    );
}

export default ProfileCard;
