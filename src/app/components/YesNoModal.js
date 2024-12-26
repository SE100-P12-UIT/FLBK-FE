import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';


const YesNoModal = ({ title, content, open, setOpen, onYes, onNo }) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="yes-no-modal-title"
            aria-describedby="yes-no-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    borderRadius: '8px',
                    paddingX: 4,
                    paddingY: 3,
                    backgroundColor: "#8DD3BB",
                    border: 'none',
                    zIndex:3,
                }}
            >
                <Typography id="yes-no-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="yes-no-modal-description" sx={{ mt: 1 }}>
                    {content}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'right', mt: 5, gap: 2 }}>
                    <Button variant="contained" onClick={onYes} sx={{ backgroundColor: "#FF8682" }}>
                        <Typography textTransform={'initial'} color={"#FFFFFF"}>
                            Có
                        </Typography>
                    </Button>
                    <Button variant="contained" onClick={onNo} sx={{ backgroundColor: "#112211" }}>
                        <Typography textTransform={'initial'} color={"#FFFFFF"}>
                            Không
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default YesNoModal;
