import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MaterialReactTable } from "material-react-table";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import IndexAction from "./Actions/IndexAction";
import Toolbar from "./Toolbar/Toolbar";

const AdvancedTable = ({
  columns,
  rows,
  type,
  Actions,
  isLoading,
  bulkDelete,
  enableRowActions,
  enableRowSelection,
  LeftPinning,
  setBranch,
  pagination: serverPagination, // Server-side pagination data
  onPageChange, // Callback for page changes
  onPerPageChange, // Callback for rows per page changes
  currentPage, // Current page from parent
  onRefresh, // Callback to refresh data after bulk actions
  enableEditing = true, // Default to true to maintain existing behavior
}) => {
  const dispatch = useDispatch();

  // مرجع لحفظ instance بتاع الجدول
  const tableRef = useRef(null);

  // مفتاح التخزين في localStorage (مختلف لكل نوع Table لو حابب)
  const STORAGE_KEY = `advancedTableFilters_${type || "default"}`;

  // state للفلاتر + السورت + الباجينيشن
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]); // [{id, desc}]

  // Check if we're using server-side pagination
  const isServerSidePagination = Boolean(serverPagination && onPageChange);

  // Local pagination state (for client-side pagination)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  // Server-side pagination state
  const serverPaginationState = isServerSidePagination ? {
    pageIndex: (currentPage || 1) - 1, // Convert to 0-based index
    pageSize: serverPagination?.per_page || 50,
  } : null;

  // ✅ state للـ selection عشان نقدر نحفظه
  const [rowSelection, setRowSelection] = useState({});

  // عند أول تحميل للكومبوننت: قراءة كل الإعدادات من localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);

        if (parsed.columnFilters) setColumnFilters(parsed.columnFilters);
        if (typeof parsed.globalFilter === "string") {
          setGlobalFilter(parsed.globalFilter);
        }
        if (Array.isArray(parsed.sorting)) {
          setSorting(parsed.sorting);
        }
        if (
          parsed.pagination &&
          typeof parsed.pagination.pageIndex === "number" &&
          typeof parsed.pagination.pageSize === "number"
        ) {
          setPagination(parsed.pagination);
        }
        // ✅ استرجاع الـ selection لو متسجل
        if (parsed.rowSelection && typeof parsed.rowSelection === "object") {
          setRowSelection(parsed.rowSelection);
        }
      }
    } catch (err) {
      console.warn("Failed to load table state from localStorage", err);
    }
  }, [STORAGE_KEY]);

  // كل ما أي حاجة تتغير (فلتر / سورت / باجينيشن / سيلكشن) نحفظها في localStorage
  useEffect(() => {
    try {
      const payload = JSON.stringify({
        columnFilters,
        globalFilter,
        sorting,
        pagination,
        rowSelection, // ✅ جديد
      });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch (err) {
      console.warn("Failed to save table state to localStorage", err);
    }
  }, [STORAGE_KEY, columnFilters, globalFilter, sorting, pagination, rowSelection]);

  // نستخدم useMemo عشان الأعمدة والسطور ما تتغيرش بالـ reference كل ريندر
  const memoColumns = useMemo(() => columns, [columns]);
  const memoRows = useMemo(() => rows, [rows]);

  // listener للـ ESC لتفريغ الـ row selection (نفس الكود القديم تقريبًا)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        const inst = tableRef.current;
        console.log("ESC pressed - table instance:", inst);

        if (!inst) {
          console.warn("No table instance available in tableRef.");
          return;
        }

        if (typeof inst.resetRowSelection === "function") {
          try {
            inst.resetRowSelection();
            console.log("resetRowSelection() called");
            return;
          } catch (err) {
            console.warn("resetRowSelection failed:", err);
          }
        }

        if (typeof inst.setRowSelection === "function") {
          try {
            inst.setRowSelection({});
            console.log("setRowSelection({}) called");
            return;
          } catch (err) {
            console.warn("setRowSelection failed:", err);
          }
        }

        if (typeof inst.setState === "function") {
          try {
            inst.setState((prev) => ({ ...prev, rowSelection: {} }));
            console.log("inst.setState(...) called");
            return;
          } catch (err) {
            console.warn("inst.setState failed:", err);
          }
        }

        if (typeof inst.dispatch === "function") {
          try {
            inst.dispatch({ type: "mrt/resetRowSelection" });
            console.log("inst.dispatch reset called");
            return;
          } catch (err) {
            console.warn("inst.dispatch failed:", err);
          }
        }

        console.warn(
          "Could not find a supported method on table instance to reset selection."
        );
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // هل في أي صف متعلم عليه؟
  const hasSelection = Object.keys(rowSelection || {}).length > 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MaterialReactTable
        // نحفظ المرجع هنا (ستستخدمه الـ listener)
        tableInstanceRef={tableRef}
        multiple
        columns={memoColumns}
        data={memoRows}
        enableRowNumbers={true}
        enableColumnFilterModes={true}
        enableColumnPinning={true}
        enableFacetedValues={true}
        // ✅ نسيبها زي ما كانت (ممنوع نلعب فيها)
        enableRowActions={enableRowActions}
        enableRowSelection={enableRowSelection}
        enableCellActions={true}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        // enableFullScreenToggle={false}
        enableEditing={enableEditing}
        editDisplayMode="cell"
        columnFilterDisplayMode="popover"
        positionToolbarAlertBanner="head-overlay"
        paginationDisplayMode="pages"
        // ❌ مفيش virtualization (كان بيبوظ الهيدر عندك)
        // enableRowVirtualization={true}
        // enableColumnVirtualization={true}

        // ⭐ التحكم في أعمدة النظام (#, checkbox, actions)
        displayColumnDefOptions={{
          "mrt-row-numbers": { size: 50, minSize: 40, maxSize: 70 },
          "mrt-row-select": { size: 45, minSize: 40, maxSize: 60 },
          "mrt-row-actions": {
            size: 90,
            minSize: 80,
            maxSize: 150,
            // ✅ إخفاء عمود الأكشن بس لو في selection (بـ CSS)
            muiTableHeadCellProps: {
              sx: {
                display: hasSelection ? "none" : "table-cell",
              },
            },
            muiTableBodyCellProps: {
              sx: {
                display: hasSelection ? "none" : "table-cell",
              },
            },
          },
        }}

        // ✅ ربط الـ selection بالـ state عشان يتحفظ ويتقري
        onRowSelectionChange={setRowSelection}

        // نتحكم في الفلاتر / السورت / الباجينيشن من خلال state
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onSortingChange={setSorting}
        onPaginationChange={isServerSidePagination ? (updater) => {
          // Handle server-side pagination
          const newPagination = typeof updater === 'function'
            ? updater(serverPaginationState)
            : updater;

          // Calculate new page (convert from 0-based to 1-based)
          const newPage = newPagination.pageIndex + 1;
          const newPageSize = newPagination.pageSize;

          // Check if page size changed
          if (newPageSize !== serverPaginationState.pageSize && onPerPageChange) {
            onPerPageChange(newPageSize);
          }
          // Check if page changed
          else if (newPage !== currentPage && onPageChange) {
            onPageChange(newPage);
          }
        } : setPagination}
        muiSearchTextFieldProps={{
          size: "small",
          variant: "outlined",
        }}
        muiPaginationProps={{
          color: "primary",
          rowsPerPageOptions: isServerSidePagination
            ? [50, 100] // Server-side: only show available options
            : [50, 100, { label: "All", value: memoRows?.length || 0 }], // Client-side: include "All"
        }}
        // Server-side pagination props
        manualPagination={isServerSidePagination}
        rowCount={isServerSidePagination ? (serverPagination?.total || 0) : undefined}
        pageCount={isServerSidePagination ? (serverPagination?.last_page || 1) : undefined}
        initialState={{
          columnPinning: {
            left: LeftPinning,
            right: ["mrt-row-actions"],
          },
          density: "medium",
          pagination: {
            pageIndex: 0,
            pageSize: 50,
          },
          showGlobalFilter: true,
        }}
        state={{
          isLoading: isLoading,
          columnFilters: columnFilters,
          globalFilter: globalFilter,
          sorting: sorting,
          pagination: isServerSidePagination ? serverPaginationState : pagination,
          rowSelection: rowSelection, // ✅ مهم
        }}
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <div key={row.id}>
            <IndexAction row={row.original} closeMenu={() => closeMenu()}>
              {Actions}
            </IndexAction>
          </div>,
        ]}
        renderTopToolbar={({ table }) => {
          if (table && tableRef && tableRef.current !== table) {
            tableRef.current = table;
            console.log("Saved table instance from renderTopToolbar");
          }

          return (
            <Toolbar
              table={table}
              type={type}
              csvData={memoRows}
              bulkDelete={bulkDelete}
              setBranch={setBranch}
              totalCount={isServerSidePagination ? serverPagination?.total : memoRows?.length}
              onRefresh={onRefresh}
            />
          );
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            width: "100%",
            overflow: "hidden",
            borderRadius: "12px",
            backgroundColor: "var(--bg-sidebar) !important",
            // Soft shadow, no border for "card" look
            boxShadow: "0 4px 20px rgba(0,0,0,0.05) !important", 
            border: "none",
            "& .MuiTypography-root": {
              color: "var(--text-black) !important",
            },
            "& .MuiSvgIcon-root": {
              color: "var(--text-gray) !important",
            },
            "& .css-118d58w-MuiButtonBase-root-MuiTableSortLabel-root .MuiTableSortLabel-icon":
              {
                color: "var(--text-black) !important",
              },
            "& .css-142h5t9-MuiFormLabel-root-MuiInputLabel-root": {
              color: "var(--text-black) !important",
            },
            "& .MuiInput-input": {
              color: "var(--text-black) !important",
            },
            "& .MuiFormHelperText-root": {
              color: "var(--text-black) !important",
            },
            "& .css-1io6e0z-MuiTableRow-root td[data-pinned=true]:before": {
              background: "var(--bg-sidebar) !important",
            },
            "& .css-gcpdls-MuiTableCell-root[data-pinned=true]:before": {
              background: "var(--bg-sidebar) !important",
            },
            "& .css-10q6jkf-MuiTableCell-root[data-pinned=true]:before": {
              background: "var(--bg-sidebar) !important",
            },
          },
        }}
        muiTableContainerProps={{
          sx: {
            maxHeight: "80vh",
            backgroundColor: "var(--bg-sidebar) !important",
          },
        }}
        // Default rendering for empty cells
        defaultColumn={{
          Cell: ({ cell }) => {
            const val = cell.getValue();
            return val === null || val === undefined || val === "" ? "-" : val;
          },
        }}

        muiTableHeadCellProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.02) !important", // Subtle header bg
            color: "var(--text-black) !important",
            fontWeight: "700 !important", // Bold
            fontSize: "0.9rem",
            borderBottom: "1px solid var(--border-primary) !important",
            borderRight: "1px solid rgba(224, 224, 224, 0.4) !important", // Light separator
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            backgroundColor: "var(--bg-sidebar) !important",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.01) !important",
              // Interactive colored strip on hover
              boxShadow: "inset 4px 0 0 var(--bg-active)", 
            },
            "& .MuiTableCell-root": {
              color: "var(--text-black) !important",
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            borderBottom: "1px solid var(--border-primary) !important",
            borderRight: "1px solid rgba(224, 224, 224, 0.4) !important", // Light separator
            padding: "14px 16px", // Slightly more breathing room
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            backgroundColor: "var(--bg-sidebar) !important",
            borderTop: "1px solid var(--border-secondary) !important", // Separator for footer
            "& .MuiAlert-root": {
              backgroundColor: "var(--bg-sidebar) !important",
              color: "var(--text-black) !important",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

AdvancedTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.any,
  type: PropTypes.string,
  Actions: PropTypes.any,
  isLoading: PropTypes.bool,
  bulkDelete: PropTypes.func,
  enableRowActions: PropTypes.bool,
  enableRowSelection: PropTypes.bool,
  LeftPinning: PropTypes.array,
  setBranch: PropTypes.func,
  pagination: PropTypes.object, // Server-side pagination data
  onPageChange: PropTypes.func, // Callback for page changes
  onPerPageChange: PropTypes.func, // Callback for rows per page changes
  currentPage: PropTypes.number, // Current page number
  onRefresh: PropTypes.func, // Callback to refresh data after bulk actions
  enableEditing: PropTypes.bool,
};

export default AdvancedTable;
