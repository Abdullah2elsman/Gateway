import styles from "@styles/styles.module.css";
import PathName from "@components/Gateway-System/PathName/PathName";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsHoldList } from "@src/shared/CloumnsTables";
import ActionRefund from "@src/components/Gateway-System/Table/Actions/ActionRefund";
import { useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import {
  clearError,
  fetchRefundList,
  UpdateRefundList,
  DeleteRefundList, // ✅ جديد
} from "@src/store/reducers/Refund/RefundSlice";
import { useDispatch, useSelector } from "react-redux";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import FormTrainee from "@src/components/forms/WaitList/Trainee/FormTrainee";
import { Navigate, useOutletContext } from "react-router-dom";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";
import { clearSelected } from "@src/store/Hook/clearSelection"; // ✅ جديد
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete"; // ✅ جديد

const Refund = () => {
  const [isOpenEdit, setIsOpenEdit] = useState({ isOpen: false });
  const [branch, setBranch] = useState("");

  // ✅ الصف المطلوب حذفه
  const [rowToDelete, setRowToDelete] = useState(null);

  const context = useOutletContext();
  const dispatch = useDispatch();

  const { refundList, error, isLoading } = useSelector(
    (state) => state.refundList
  );

  useEffect(() => {
    dispatch(fetchRefundList(branch));
  }, [dispatch, branch]);

  const HandlerEdit = (data) => {
    setIsOpenEdit({ isOpen: true, trainee: data });
  };

  const onSubmitEdit = (data) => {
    dispatch(UpdateRefundList({ id: isOpenEdit?.trainee.id, data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRefundList(branch));
        setIsOpenEdit({ isOpen: false });
      });
  };

  // ✅ طلب الحذف جاي من ActionRefund
  const handleRequestDelete = (row) => {
    setRowToDelete(row);
  };

  // ✅ تنفيذ الحذف بعد تأكيد البوب أب
  const handleConfirmDelete = () => {
    if (!rowToDelete) return;

    dispatch(DeleteRefundList(rowToDelete.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRefundList(branch));
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
      name: "refundlist",
      children: ["view_trainees", "view_trainees_by_branch"],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.containerPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | RefundList`}</title>
      </Helmet>

      {/* ✅ Popup تأكيد الحذف */}
      <ConfirmDelete
        open={!!rowToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <PathName path="Refund" />

      <div className={styles.containerPage_content}>
        {/* Edit Trainee */}
        {checkPermission({
          name: "refundlist",
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
              type="refundlist"
            />
          </Modals>
        )}

        <div className={styles.table} style={{ marginTop: "80px" }}>
          {/* Table Refund */}
          <AdvancedTable
            columns={CloumnsHoldList()}
            rows={refundList?.trainees || []}
            Actions={
              <ActionRefund
                HandlerEdit={HandlerEdit}
                onRequestDelete={handleRequestDelete} // ✅ مهم
              />
            }
            isLoading={isLoading}
            type="refundlist"
            enableRowSelection={true}
            enableRowActions={true}
            setBranch={setBranch}
          />
        </div>
      </div>
    </div>
  );
};

export default Refund;
