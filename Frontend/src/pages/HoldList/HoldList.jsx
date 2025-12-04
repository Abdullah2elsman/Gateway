import PathName from "@components/Gateway-System/PathName/PathName";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import ActionHoldList from "@src/components/Gateway-System/Table/Actions/ActionHoldList";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import FormTrainee from "@src/components/forms/WaitList/Trainee/FormTrainee";
import { CloumnsHoldList } from "@src/shared/CloumnsTables";
import {
  clearError,
  fetchHoldlist,
  UpdateHoldList,
  DeleteHoldList, // import for delete
} from "@src/store/reducers/HoldList/HoldListSlice";
import checkPermission from "@src/util/CheckPermission";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import styles from "@styles/styles.module.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useOutletContext } from "react-router-dom";
import { clearSelected } from "@src/store/Hook/clearSelection"; // to clear selection after delete
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete"; // global confirm popup

const HoldList = () => {
  const [isOpenEdit, setIsOpenEdit] = useState({ isOpen: false });
  const [branch, setBranch] = useState("");

  // Row selected for delete confirmation
  const [rowToDelete, setRowToDelete] = useState(null);

  const context = useOutletContext();
  const dispatch = useDispatch();

  const { holdList, error, isLoading } = useSelector((state) => state.holdList);

  useEffect(() => {
    dispatch(fetchHoldlist(branch));
  }, [dispatch, branch]);

  const HandlerEdit = (data) => {
    setIsOpenEdit({ isOpen: true, trainee: data });
  };

  const onSubmitEdit = (data) => {
    dispatch(UpdateHoldList({ id: isOpenEdit?.trainee.id, data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchHoldlist(branch));
        setIsOpenEdit({ isOpen: false });
      });
  };

  // Handle delete request from ActionHoldList
  const handleRequestDelete = (row) => {
    setRowToDelete(row);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (!rowToDelete) return;

    dispatch(DeleteHoldList(rowToDelete.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchHoldlist(branch));
        dispatch(clearSelected());
      })
      .finally(() => {
        setRowToDelete(null);
      });
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setRowToDelete(null);
  };

  // Show error message
  useEffect(() => {
    if (error) {
      ToastError(error?.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  if (
    !checkPermission({
      name: "holdlist",
      children: [
        "view_trainees",
        "view_own_trainees",
        "view_trainees_by_branch",
      ],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.containerPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | HoldList`}</title>
      </Helmet>

      {/* Global delete confirmation popup */}
      <ConfirmDelete
        open={!!rowToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <PathName path="HoldList" />
      <div className={styles.containerPage_content}>
        {/* Edit Row Trainee */}
        {checkPermission({
          name: "holdlist",
          children: [
            "update_trainees",
            "update_own_trainees",
            "update_trainees_by_branch",
          ],
        }) && (
          <Modals
            isOpen={isOpenEdit.isOpen}
            handleClose={() => setIsOpenEdit({ isOpen: false })}
          >
            <FormTrainee
              onSubmit={onSubmitEdit}
              isLoading={isLoading}
              edit={true}
              trainee={isOpenEdit?.trainee}
              type="holdlist"
            />
          </Modals>
        )}

        {/* Table Hold List */}
        <div className={styles.table} style={{ marginTop: "80px" }}>
          <AdvancedTable
            columns={CloumnsHoldList()}
            rows={holdList?.trainees || []}
            Actions={
              <ActionHoldList
                HandlerEdit={HandlerEdit}
                onRequestDelete={handleRequestDelete}
              />
            }
            isLoading={isLoading}
            type="holdlist"
            enableRowSelection={true}
            enableRowActions={true}
            setBranch={setBranch}
          />
        </div>
      </div>
    </div>
  );
};

export default HoldList;
