import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "@src/util/Toast";
import { bulkMoveBlackToWaitList } from "@src/store/reducers/BlackList/Move/MoveBlackListSlice";
import {
  bulkDeleteBlackList,
  fetchBlackList,
} from "@src/store/reducers/BlackList/BlackListSlice";
import checkPermission from "@src/util/CheckPermission";
import { clearSelected } from "@src/store/Hook/clearSelection";
import { useNavigate } from "react-router-dom";

const MoveBlackList = ({ styles, selected }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onBulkMoveBlackToWaitList = () => {
    dispatch(bulkMoveBlackToWaitList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBlackList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  const bulkDelete = () => {
    dispatch(bulkDeleteBlackList({ trainees: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBlackList());
        dispatch(clearSelected());
        navigation(0);
      });
  };

  return (
    <>
      {checkPermission({
        name: "blacklist",
        children: ["move_to_wait", "move_to_wait_by_branch"],
      }) && (
          <Button
            variant="contained"
            className={styles}
            onClick={onBulkMoveBlackToWaitList}
          >
            Move to WaitList All
          </Button>
        )}
      {checkPermission({
        name: "blacklist",
        children: [
          "delete_trainees",
          "delete_own_trainees",
          "delete_trainees_by_branch",
        ],
      }) && (
          <Button variant="contained" className={styles} onClick={bulkDelete}>
            Delete All
          </Button>
        )}
    </>
  );
};

MoveBlackList.propTypes = {
  styles: PropTypes.string,
  selected: PropTypes.array,
};

export default MoveBlackList;
