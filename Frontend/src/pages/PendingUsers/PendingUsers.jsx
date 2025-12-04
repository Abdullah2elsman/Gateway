import { useEffect, useState } from "react";
import styles from "@styles/styles.module.css";
import PathName from "@components/Gateway-System/PathName/PathName";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsPendingUsers } from "@src/shared/CloumnsTables";
import ActionPendingUser from "@src/components/Gateway-System/Table/Actions/ActionPendingUser";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  fetchPendingUsers,
} from "@src/store/reducers/PendingUser/PendingUserSlice";
import { Navigate, useOutletContext } from "react-router-dom";
import { ToastError } from "@src/util/Toast";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";

const PendingUsers = () => {
  const [branch, setBranch] = useState("");

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { pendingUser, isLoading, error } = useSelector(
    (state) => state.pendingUsers
  );

  useEffect(() => {
    dispatch(fetchPendingUsers(branch));
  }, [dispatch, branch]);

  useEffect(() => {
    if (error) {
      ToastError(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  if (
    !checkPermission({
      name: "pendingusers",
      children: ["view_pending_users", "view_pending_users_by_branch"],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.containerPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Pending Users`}</title>
      </Helmet>

      <PathName path="Pending Users" />

      {/* Toast Message */}

      <div className={styles.containerPage_content}>
        {/* Table Pending Users */}
        <div className={styles.table} style={{ marginTop: "80px" }}>
          <AdvancedTable
            columns={CloumnsPendingUsers()}
            rows={pendingUser.users ? pendingUser?.users : []}
            Actions={<ActionPendingUser />}
            type="pendingUser"
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

export default PendingUsers;
