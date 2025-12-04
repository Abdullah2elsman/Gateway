import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ConfirmationTrainee,
  fetchClass,
} from "@src/store/reducers/Batches/Classes/ClassesSlice";
import { ToastSuccess } from "@src/util/Toast";

const Confirmation = ({ row }) => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const updateConfirmation = (e, v) => {
    dispatch(
      ConfirmationTrainee({
        class_id: state?.class_id,
        trainee_id: row.id,
        confirmation: v,
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(
          fetchClass({ batch_id: state?.batchId, class_id: state?.class_id })
        );
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Checkbox
        defaultChecked={row?.confirmation}
        onChange={updateConfirmation}
      />
    </div>
  );
};

Confirmation.propTypes = {
  row: PropTypes.object,
};

export default Confirmation;
