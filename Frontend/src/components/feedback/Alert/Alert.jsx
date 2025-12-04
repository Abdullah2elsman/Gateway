import { Button } from "@mui/material";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import PropTypes from "prop-types";

const Alert = ({
  isOpen,
  zIndex,
  Continue,
  Cancel,
  isLoading,
  message,
  // ✅ نصوص أزرار قابلة للتغيير مع قيم افتراضية زي القديم
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
}) => {
  return (
    <Modals isOpen={isOpen} handleClose={Cancel} zIndex={zIndex}>
      <div style={{ paddingTop: "30px" }}>
        <p>
          {message ||
            "The selected class has more than 10 trainees. Do you want to continue?"}
        </p>
        <div style={{ textAlign: "right", paddingTop: "30px" }}>
          <Button
            variant="contained"
            color="error"
            style={{ marginRight: "10px" }}
            onClick={Cancel}
          >
            {cancelLabel}
          </Button>
          <Button variant="contained" onClick={Continue} sx={{ gap: 1 }}>
            {isLoading && <Spinner />} {confirmLabel}
          </Button>
        </div>
      </div>
    </Modals>
  );
};

Alert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  Continue: PropTypes.func.isRequired,
  Cancel: PropTypes.func.isRequired,
  zIndex: PropTypes.any,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  // ✅ جديد
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default Alert;
