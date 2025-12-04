import styles from "./Modals.module.css";
import propTypes from "prop-types";
import { Box, IconButton, Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

const Modals = ({ isOpen, handleClose, children, zIndex }) => {
  useEffect(() => {
    if (isOpen) {
      document.querySelector(".content").classList.add("fixed");
    } else {
      document.querySelector(".content").classList.remove("fixed");
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition={true}
      className={styles.modal}
      style={{ zIndex }}
    >
      <Box className={styles.modalContent}>
        <IconButton className={styles.close} onClick={handleClose}>
          <IoMdClose className={styles.icon} />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

Modals.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
  zIndex: propTypes.any,
};

export default Modals;
