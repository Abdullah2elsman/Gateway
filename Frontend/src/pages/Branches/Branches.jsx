import { useEffect, useState } from "react";
import styles from "@styles/styles.module.css";
import PathName from "@components/Gateway-System/PathName/PathName";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsBranches } from "@src/shared/CloumnsTables";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkDeleteBranches,
  clearError,
  createBranch,
  getBranches,
  updateBranch,
  deleteBranch, // used for single delete with confirm
} from "@src/store/reducers/Branches/BrancheSlice";
import ActionBranches from "@src/components/Gateway-System/Table/Actions/ActionBranches";
import AddButton from "@src/components/Gateway-System/AddButton/AddButton";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import FormBranches from "@src/components/forms/Branches/FormBranches";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { Navigate, useOutletContext } from "react-router-dom";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";
import { clearSelected } from "@src/store/Hook/clearSelection"; // clear selected rows after delete
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete"; // global confirm dialog

const Branches = () => {
  const [addBranches, setAddBranches] = useState(false);
  const [editBranches, setEditBranches] = useState({ isOpen: false });

  // Row selected for delete confirmation
  const [rowToDelete, setRowToDelete] = useState(null);

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { branches, isLoading, error } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const handlerEdit = (branch) => {
    setEditBranches({
      isOpen: true,
      branch,
    });
  };

  const onSubmitEdit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    dispatch(updateBranch({ id: editBranches?.branch?.id, branch: data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setEditBranches({ isOpen: false });
        dispatch(getBranches());
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    dispatch(createBranch(data))
      .unwrap()
      .then(({ message }) => {
        setAddBranches(false);
        ToastSuccess(message);
        dispatch(getBranches());
      });
  };

  const bulkDelete = (selected) => {
    dispatch(bulkDeleteBranches({ branches: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(getBranches());
        selected = [];
      });
  };

  // Handle delete request from row actions
  const handleRequestDelete = (row) => {
    setRowToDelete(row);
  };

  // Confirm delete action (called from ConfirmDelete)
  const handleConfirmDelete = () => {
    if (!rowToDelete) return;

    dispatch(deleteBranch(rowToDelete.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(getBranches());
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
      name: "branches",
      children: ["view_branches"],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.containerPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Branches`}</title>
      </Helmet>

      {/* Global delete confirmation dialog */}
      <ConfirmDelete
        open={!!rowToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <PathName path="Branches" style={{ paddingBottom: "0px" }} back={true} />

      <div className={styles.containerPage_content}>
        {checkPermission({
          name: "branches",
          children: ["create_branch"],
        }) && (
          <>
            <AddButton
              title="Add Branches"
              name="Add Branches"
              openAddModal={() => setAddBranches(true)}
            />

            {/* Add Branches in Modal */}
            <Modals
              isOpen={addBranches}
              handleClose={() => setAddBranches(false)}
            >
              <FormBranches onSubmit={onSubmit} isLoading={isLoading} />
            </Modals>
          </>
        )}

        {/* Edit Branches in Modal */}
        {checkPermission({
          name: "branches",
          children: ["update_branch"],
        }) && (
          <Modals
            isOpen={editBranches?.isOpen}
            handleClose={() => setEditBranches({ isOpen: false })}
          >
            <FormBranches
              onSubmit={onSubmitEdit}
              isLoading={isLoading}
              edit={true}
              data={editBranches?.branch}
            />
          </Modals>
        )}

        {/* Table Branches */}
        <div className={styles.table}>
          <AdvancedTable
            columns={CloumnsBranches()}
            rows={branches}
            Actions={
              <ActionBranches
                handlerEdit={handlerEdit}
                onRequestDelete={handleRequestDelete}
              />
            }
            bulkDelete={bulkDelete}
            isLoading={isLoading}
            enableRowSelection={true}
            enableRowActions={true}
            type="branches"
          />
        </div>
      </div>
    </div>
  );
};

export default Branches;
