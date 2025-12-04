import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { createSessionNote } from "@src/store/reducers/Attendance/Session Note/SessionNoteSlice";
import { ToastSuccess } from "@src/util/Toast";
import { useDispatch } from "react-redux";
import { fetchAttendance } from "@src/store/reducers/Attendance/AttendanceSlice";

const AddSessionNote = ({ class_id, trainee_id, handleClose, isLoading }) => {
  const dispatch = useDispatch();

  const onSubmitAddSessionNote = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      createSessionNote({
        class_id,
        trainee_id,
        session_title: data.get("session_title"),
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchAttendance(class_id));
        handleClose();
      });
  };

  return (
    <Box
      component={"form"}
      onSubmit={onSubmitAddSessionNote}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "30px 0 10px",
      }}
    >
      <Input
        id="session_title"
        label="Session Note"
        placeholder="Add session title"
        required={false}
      />

      <Button type="submit" variant="contained" sx={{ gap: 1 }}>
        {isLoading && <Spinner />} Add Session Note
      </Button>
    </Box>
  );
};

AddSessionNote.propTypes = {
  class_id: PropTypes.number,
  trainee_id: PropTypes.number,
  handleClose: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default AddSessionNote;
