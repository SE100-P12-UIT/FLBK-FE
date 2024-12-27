import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const ProfileCard = () => {
    return (
        <Box
            sx={{
                position: "relative",
                background: "linear-gradient(to right, #f97316, #ec4899)",
                height: 192,
                borderRadius: 2,
                minWidth: '500px'
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: -40,
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
                        color: "white",
                        fontWeight: "bold",
                        mt: 1,
                    }}
                >
                    zoraneko
                </Typography>
            </Box>
        </Box>
    );
}

export default ProfileCard;
