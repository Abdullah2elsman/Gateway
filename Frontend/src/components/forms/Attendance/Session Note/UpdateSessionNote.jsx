import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import { useDispatch } from "react-redux";
import {
  fetchSessionNote,
  updateSessionNote,
} from "@src/store/reducers/Attendance/Session Note/SessionNoteSlice";
import { ToastSuccess } from "@src/util/Toast";

const UpdateSessionNote = ({ class_id, trainee_id, session, handleClose }) => {
  const dispatch = useDispatch();

  const handlerSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      updateSessionNote({
        session_id: session.id,
        session_title: data.get("session_title"),
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchSessionNote({ class_id, trainee_id }));
        handleClose();
      });
  };

  return (
    <Box
      component={"form"}
      onSubmit={handlerSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
        margin: "10px 0",
      }}
    >
      <Input
        id="session_title"
        required={false}
        defaultValue={session?.session_title}
      />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
};

UpdateSessionNote.propTypes = {
  session: PropTypes.object.isRequired,
  class_id: PropTypes.number,
  trainee_id: PropTypes.number,
  handleClose: PropTypes.func,
};

export default UpdateSessionNote;
