import styles from "@styles/styles.module.css";
import PathName from "@components/Gateway-System/PathName/PathName";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsHoldList } from "@src/shared/CloumnsTables";
import ActionBlacklist from "@src/components/Gateway-System/Table/Actions/ActionBlacklist";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearError,
  fetchBlackList,
  UpdateBlackList,
  DeleteBlackList, // ✅ جديد
} from "@src/store/reducers/BlackList/BlackListSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import FormTrainee from "@src/components/forms/WaitList/Trainee/FormTrainee";
import { Navigate, useOutletContext } from "react-router-dom";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";
import { clearSelected } from "@src/store/Hook/clearSelection"; // ✅ جديد
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete"; // ✅ جديد

const BlackList = () => {
  const [branch, setBranch] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState({ isOpen: false });

  // ✅ الصف المطلوب حذفه
  const [rowToDelete, setRowToDelete] = useState(null);

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { blackList, error, isLoading } = useSelector(
    (state) => state.blackList
  );

  useEffect(() => {
    dispatch(fetchBlackList(branch));
  }, [dispatch, branch]);

  const HandlerEdit = (value) => {
    setIsOpenEdit({ isOpen: true, trainee: value });
  };

  const onSubmitEdit = (data) => {
    dispatch(UpdateBlackList({ id: isOpenEdit?.trainee.id, data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBlackList(branch));
        setIsOpenEdit({ isOpen: false });
      });
  };

  // ✅ طلب الحذف جاي من ActionBlacklist
  const handleRequestDelete = (row) => {
    setRowToDelete(row);
  };

  // ✅ تنفيذ الحذف بعد تأكيد البوب أب
  const handleConfirmDelete = () => {
    if (!rowToDelete) return;

    dispatch(DeleteBlackList(rowToDelete.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBlackList(branch));
        dispatch(clearSelected());
      })
      .finally(() => {
        setRowToDelete(null);
      });
  };

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
      name: "blacklist",
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
        <title>{`${context} | BlackList`}</title>
      </Helmet>

      {/* ✅ Popup تأكيد الحذف */}
      <ConfirmDelete
        open={!!rowToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <PathName path="BlackList" />

      <div className={styles.containerPage_content}>
        {/* Edit Trainee */}
        {checkPermission({
          name: "blacklist",
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
              type="blacklist"
            />
          </Modals>
        )}

        {/* Table BlackList */}
        <div className={styles.table} style={{ marginTop: "80px" }}>
          <AdvancedTable
            columns={CloumnsHoldList()}
            rows={blackList?.trainees || []}
            Actions={
              <ActionBlacklist
                HandlerEdit={HandlerEdit}
                onRequestDelete={handleRequestDelete} // ✅ مهم
              />
            }
            isLoading={isLoading}
            type="blacklist"
            enableRowSelection={true}
            enableRowActions={true}
            setBranch={setBranch}
          />
        </div>
      </div>
    </div>
  );
};

export default BlackList;
