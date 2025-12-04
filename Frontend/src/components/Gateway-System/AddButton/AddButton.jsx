import styles from "./AddButton.module.css";
import { Button } from "@mui/material";
import propTypes from "prop-types";

const AddButton = ({ title, name, openAddModal, style, padding }) => {
  return (
    <div className={styles.button} style={{ padding }}>
      <Button
        title={title}
        variant="contained"
        onClick={openAddModal}
        style={style}
      >
        {name}
      </Button>
    </div>
  );
};

AddButton.propTypes = {
  title: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  openAddModal: propTypes.func,
  style: propTypes.object,
  padding: propTypes.any,
};

export default AddButton;
