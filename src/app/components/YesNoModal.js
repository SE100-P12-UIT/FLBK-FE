import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          borderRadius: "8px",
          paddingX: 4,
          paddingY: 3,
          backgroundColor: "#8DD3BB",
          border: "none",
          zIndex: 3,
        }}
      >
        <Typography id="yes-no-modal-title" variant="h5" component="h2">
          {title}
        </Typography>
        <Typography id="yes-no-modal-description" variant="body1" sx={{ mt: 1 }}>
          {content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onYes}
                      sx={{
                          borderColor: "#FF8682",
                          borderWidth: 3,
                          
             }}
          >
            <Typography variant="h6" textTransform={"initial"}>
              Có
            </Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={onNo}
            sx={{
                borderColor: "#112211",
                borderWidth:3,
              
            }}
          >
            <Typography variant="h6" textTransform={"initial"} >
              Không
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default YesNoModal;
