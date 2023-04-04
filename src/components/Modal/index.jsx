import * as React from "react";
import Box from "@mui/material/Box";
// import Dialog from '@mui/material/Dialog';
import Modal from "@mui/material/Modal";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ openModal, children }) {
  

  return (
    <Modal open={openModal}>
      <Box className="box">{children}</Box>
    </Modal>
  );
}

export default BasicModal;
