import PathName from "@components/Gateway-System/PathName/PathName";
import ActionTrainess from "@src/components/Gateway-System/Table/Actions/ActionTrainess";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsTrainess } from "@src/shared/CloumnsTables";
import { clearError, fetchTrainees } from "@src/store/reducers/Trainees/TraineesSlice";
import checkPermission from "@src/util/CheckPermission";
import { ToastError } from "@src/util/Toast";
import styles from "@styles/styles.module.css";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useOutletContext } from "react-router-dom";

const Trainess = () => {
  const [branch, setBranch] = useState(""); // Can be "" or branch_id
  const [page, setPage] = useState(1); // For pagination support
  const [perPage, setPerPage] = useState(50); // Rows per page

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { trainees, pagination, error, isLoading } = useSelector((state) => state.Trainees);

  // Fetch trainees when branch, page, or perPage changes
  useEffect(() => {
    dispatch(fetchTrainees({ branch, page, per_page: perPage }));
  }, [dispatch, branch, page, perPage]);

  // Show error message
  useEffect(() => {
    if (error) {
      const errorMessage = error?.message || error?.error || "Failed to load trainees";
      ToastError(errorMessage);

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  // Handle page change directly
  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= pagination?.last_page) {
      setPage(newPage);
    }
  }, [pagination]);

  // Handle rows per page change
  const handlePerPageChange = useCallback((newPerPage) => {
    setPage(1); // Reset to page 1 FIRST
    setPerPage(newPerPage); // Then change perPage
  }, []);

  // Permission check
  if (
    !checkPermission({
      name: "trainees",
      children: ["view_trainees", "view_trainees_by_branch"],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.containerPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Trainees`}</title>
      </Helmet>

      <PathName path="Trainess" />
      <div className={styles.containerPage_content}>
        {/* Table Pending Users */}
        <div className={styles.table} style={{ marginTop: "80px" }}>
          <AdvancedTable
            columns={CloumnsTrainess()}
            type="trainees"
            rows={trainees || []}
            Actions={<ActionTrainess />}
            isLoading={isLoading}
            enableRowSelection={true}
            enableRowActions={true}
            setBranch={setBranch} // لتغيير الفرع
            pagination={pagination}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
};

export default Trainess;
