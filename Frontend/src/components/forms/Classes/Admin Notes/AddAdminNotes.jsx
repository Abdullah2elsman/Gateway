import { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Input from "@src/components/Gateway-System/Inputs/Input";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import {
  AddNewAdminNotes,
  clearError,
  GetAllAdminNotes,
} from "@src/store/reducers/Batches/Classes/Move/MoveClassSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { fetchClass } from "@src/store/reducers/Batches/Classes/ClassesSlice";

const AddAdminNotes = ({
  batch_id,
  class_id,
  trainee_id,
  admin_note,
  handleClose,
}) => {
  const dispatch = useDispatch();

  const { viewAdminNotes, isLoading, error } = useSelector(
    (state) => state.moveClass
  );

  useEffect(() => {
    dispatch(GetAllAdminNotes({ class_id, trainee_id }));
  }, [dispatch, class_id, trainee_id]);

  const onSubmitAddAdminNotes = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    dispatch(
      AddNewAdminNotes({
        class_id,
        trainee_id,
        admin_note: data.get("admin_note"),
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchClass({ batch_id, class_id }));
        handleClose();
      });
  };

  useEffect(() => {
    if (error) {
      ToastError(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [dispatch, error]);

  return (
    <Box
      component={"form"}
      onSubmit={onSubmitAddAdminNotes}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "30px 0 10px",
      }}
    >
      <Input
        id="admin_note"
        label="Admin Note"
        placeholder="Add admin note"
        defaultValue={admin_note || ""}
      />

      <Button type="submit" variant="contained" sx={{ gap: 1 }}>
        {isLoading && <Spinner />} Add Admin Note
      </Button>
    </Box>
  );
};

AddAdminNotes.propTypes = {
  batch_id: PropTypes.number.isRequired,
  class_id: PropTypes.number.isRequired,
  trainee_id: PropTypes.number,
  admin_note: PropTypes.string,
  handleClose: PropTypes.func,
};

export default AddAdminNotes;
