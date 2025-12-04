import { useEffect, useState } from "react";
import styles from "@styles/styles.module.css";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import AddButton from "@src/components/Gateway-System/AddButton/AddButton";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import PendingTest from "@src/components/forms/PendingTest/PendingTest";
import { CloumnsPendingTestList } from "@src/shared/CloumnsTables";
import ActionPendingTest from "@src/components/Gateway-System/Table/Actions/ActionPendingTest";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createPendingTest,
  fetchPendingTestList,
  updatePendingTest,
  deletePendingTest, // used for delete action
} from "@src/store/reducers/PendingTestList/PendingTestSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import FormAssignLevel from "@src/components/forms/PendingTest/Assign/FormAssignLevel";
import FormAssignTrainer from "@src/components/forms/PendingTest/Assign/FormAssignTrainer";
import { Navigate, useOutletContext } from "react-router-dom";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";
import { clearSelected } from "@src/store/Hook/clearSelection"; // clear table selection after delete
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete"; // global delete confirmation dialog

const PendingTestList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState({ isOpen: false });
  const [assgin_level, setIsOpenAssignLevel] = useState({ isOpen: false });
  const [assgin_trainer, setIsOpenAssignTrainer] = useState({ isOpen: false });
  const [branch, setBranch] = useState("");

  // Row selected for delete confirmation
  const [rowToDelete, setRowToDelete] = useState(null);

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { pendingTestList, error, isLoading } = useSelector(
    (state) => state.pendingTestList
  );

  const HandlerEdit = (value) => {
    setIsOpenEdit({ isOpen: true, trainee: value });
  };

  useEffect(() => {
    dispatch(fetchPendingTestList(branch));
  }, [dispatch, branch]);

  const onSubmitEdit = (data) => {
    dispatch(updatePendingTest({ id: isOpenEdit?.trainee.id, data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList(branch));
        setIsOpenEdit({ isOpen: false });
      });
  };

  const onSubmit = (data) => {
    dispatch(createPendingTest(data))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList(branch));
        setIsOpen(false);
      });
  };

  // Handle delete request from row actions
  const handleRequestDelete = (row) => {
    setRowToDelete(row);
  };

  // Confirm delete action (called from ConfirmDelete)
  const handleConfirmDelete = () => {
    if (!rowToDelete) return;

    dispatch(deletePendingTest(rowToDelete.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPendingTestList(branch));
        dispatch(clearSelected());
      })
      .finally(() => {
        setRowToDelete(null);
      });
  };

  // Cancel delete action (close dialog)
  const handleCancelDelete = () => {
    setRowToDelete(null);
  };

  // Show Error
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
      name: "pendinglist",
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
        <title>{`${context} | Pending Test List`}</title>
      </Helmet>

      {/* Global delete confirmation dialog */}
      <ConfirmDelete
        open={!!rowToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <PathName path="Pending Test List" />
      <div className={styles.containerPage_content}>
        {checkPermission({
          name: "pendinglist",
          children: ["create_trainees", "create_trainees_by_branch"],
        }) && (
          <>
            <AddButton
              title="Add Pending Test"
              name="Add Pending Test"
              openAddModal={() => setIsOpen(true)}
            />

            {/* Add Pending Test */}
            <Modals isOpen={isOpen} handleClose={() => setIsOpen(false)}>
              <PendingTest onSubmit={onSubmit} isLoading={isLoading} />
            </Modals>
          </>
        )}

        {/* Add Assign Level */}
        {checkPermission({
          name: "pendinglist",
          children: ["assign_level", "assign_level_by_branch"],
        }) && (
          <Modals
            isOpen={assgin_level.isOpen}
            handleClose={() =>
              setIsOpenAssignLevel({
                isOpen: false,
              })
            }
          >
            <FormAssignLevel
              closeModal={() =>
                setIsOpenAssignLevel({
                  isOpen: false,
                })
              }
              trainee_id={assgin_level?.assignLevel_id}
            />
          </Modals>
        )}

        {/* Add Assign Trainer */}
        {checkPermission({
          name: "pendinglist",
          children: ["assign_trainer", "assign_trainer_by_branch"],
        }) && (
          <Modals
            isOpen={assgin_trainer.isOpen}
            handleClose={() =>
              setIsOpenAssignTrainer({
                isOpen: false,
              })
            }
          >
            <FormAssignTrainer
              closeModal={() =>
                setIsOpenAssignTrainer({
                  isOpen: false,
                })
              }
              trainee={assgin_trainer?.assignTrainer_id}
            />
          </Modals>
        )}

        {/* Edit Pending Test */}
        {checkPermission({
          name: "pendinglist",
          children: [
            "update_trainees",
            "update_own_trainees",
            "update_trainees_by_branch",
          ],
        }) && (
          <Modals
            isOpen={isOpenEdit?.isOpen}
            handleClose={() => setIsOpenEdit({ isOpen: false })}
          >
            <PendingTest
              onSubmit={onSubmitEdit}
              isLoading={isLoading}
              edit={true}
              data={isOpenEdit?.trainee}
            />
          </Modals>
        )}

        {/* Table Pending Test */}
        <div className={styles.table}>
          <AdvancedTable
            columns={CloumnsPendingTestList()}
            rows={pendingTestList?.trainees || []}
            type="pendingTest"
            Actions={
              <ActionPendingTest
                HandlerEdit={HandlerEdit}
                openAssignLevel={(id) =>
                  setIsOpenAssignLevel({ isOpen: true, assignLevel_id: id })
                }
                openAssignTrainer={(trainee) =>
                  setIsOpenAssignTrainer({
                    isOpen: true,
                    assignTrainer_id: trainee,
                  })
                }
                onRequestDelete={handleRequestDelete}
              />
            }
            isLoading={isLoading}
            enableRowSelection={true}
            enableRowActions={true}
            setBranch={setBranch}
          />
        </div>
      </div>
    </div>
  );
};

export default PendingTestList;
