import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { clearError, fetchBranchLogs } from "@src/store/reducers/LogsOperations/LogsSlice";
import { ToastError } from "@src/util/Toast";
import styles from "@styles/Details.module.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

const BranchLogs = () => {
  const dispatch = useDispatch();
  const { logs, isLoading, error } = useSelector((state) => state.logsOperations);

  useEffect(() => {
    dispatch(fetchBranchLogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ToastError(error.message || error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const columns = [
    {
      accessorKey: "transition_date",
      header: "Date",
      size: 100,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "transition_time",
      header: "Time",
      size: 100,
      id: "time",
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "trainee_name",
      header: "Trainee Name",
      size: 150,
    },
    {
      accessorKey: "trainee_mobile",
      header: "Trainee Mobile",
      size: 150,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "from_branch",
      header: "From (Old Branch)",
      size: 150,
    },
    {
      accessorKey: "to_branch",
      header: "To (New Branch)",
      size: 150,
    },
    {
      accessorKey: "changed_by",
      header: "Operator (Who made)",
      size: 150,
    },
  ];

  return (
    <div className={styles.Details}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gateway System | Branch Logs</title>
      </Helmet>

      <AdvancedTable
        columns={columns}
        rows={logs || []}
        isLoading={isLoading}
        enableRowSelection={false}
        enableRowActions={false}
        enableEditing={false}
        type="branch_logs"
      />
    </div>
  );
};

export default BranchLogs;
