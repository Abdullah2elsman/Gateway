import { MenuItem } from "@mui/material";
import checkPermission from "@src/util/CheckPermission";
import PropTypes from "prop-types";

const ActionAttendance = ({
  row,
  closeMenu,
  openTrainerNote,
  openSessionNote,
}) => {

  return (
    <>
      {checkPermission({
        name: "attendance",
        children: [
          "add_session_notes",
          "add_own_session_notes",
          "add_session_notes_by_branch",
        ],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={() => openSessionNote({ trainee_id: row.id })}
        >
          Add session Notes
        </MenuItem>
      )}

      {checkPermission({
        name: "classes",
        children: [
          "add_trainer_note",
          "add_own_trainer_note",
          "add_trainer_note_by_branch",
        ],
      }) && (
        <MenuItem
          onClick={closeMenu}
          sx={{ gap: 1 }}
          onClickCapture={() =>
            openTrainerNote({
              trainee_id: row.id,
              trainer_note: row.trainer_note,
            })
          }
        >
          Add Result
        </MenuItem>
      )}
    </>
  );
};

ActionAttendance.propTypes = {
  row: PropTypes.object,
  closeMenu: PropTypes.func,
  openTrainerNote: PropTypes.func,
  openSessionNote: PropTypes.func,
};

export default ActionAttendance;
