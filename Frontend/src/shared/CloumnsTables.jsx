/* eslint-disable react/prop-types */
import Result from "@src/components/Gateway-System/Attendance/Result/Result";
import SessionNotes from "@src/components/Gateway-System/Attendance/SessionNotes";
import Confirmation from "@src/components/Gateway-System/Classes/Confirmation/Confirmation";

export const CloumnsTrainess = () => {
  return [
    {
      accessorKey: "full_name",
      header: "Full Name",
      enablePinning: true,
      size: 200,
      enableEditing: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_1",
      header: "Second Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "country",
      header: "Country",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "attend_type",
      header: "Attend Type",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "payment_type",
      header: "Payment Type",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "paid_value",
      header: "Paid Value",
      enablePinning: false,
      enableEditing: false,
      size: 150,
      filterFn: "between",
    },
    {
      accessorKey: "age_group",
      header: "Age Group",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "trainer",
      header: "Trainer",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "test_date",
      header: "Test Date",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
    {
      accessorKey: "follow_up",
      header: "Follow Up",
      enablePinning: false,
      enableEditing: false,
      size: 150,
    },
  ];
};

export const CloumnsUsers = () => {
  return [
    {
      accessorKey: "full_name",
      header: "Full Name",
      enablePinning: false,
      size: 190,
      enableEditing: true,
      align:"center",
      headerAlign:"center",
    },
    {
      accessorKey: "email",
      header: "Email",
      enablePinning: false,
      size: 190,
      enableEditing: true,
      align:"center",
      headerAlign:"center",
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      enablePinning: false,
      size: 80,
      enableEditing: true,
      align:"center",
      headerAlign:"center",
    },
    {
      accessorKey: "phone_number_1",
      header: "Second Mobile",
      enablePinning: false,
      size: 80,
      enableEditing: false,
    },
    {
      accessorKey: "country",
      header: "Country",
      enablePinning: false,
      size: 100,
      enableEditing: true,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      enablePinning: false,
      size: 100,
      enableEditing: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enablePinning: false,
      size: 100,
      enableEditing: true,
    },
  ];
};

export const CloumnsPendingUsers = () => {
  return [
    {
      accessorKey: "full_name",
      header: "Full Name",
      size: 200,
      enablePinning: true,
      enableEditing: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      enablePinning: false,
      enableEditing: false,
      size: 200,
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "country",
      header: "Country",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
  ];
};

export const CloumnsRoles = () => {
  return [
    {
      accessorKey: "role_title",
      header: "Role",
      size: 200,
      enablePinning: true,
      enableEditing: false,
    },
  ];
};

export const CloumnsHoldList = () => {
  return [
    {
      accessorKey: "full_name",
      header: "Full Name",
      size: 200,
      enablePinning: true,
      enableEditing: false,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_1",
      header: "Second Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "level",
      header: "Level",
      size: 150,
      enablePinning: false,
      enableEditing: true,
    },
    {
      accessorKey: "attend_type",
      header: "Attend Type",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "paid_value",
      header: "Paid Value",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorFn: (originalRow) => new Date(originalRow?.moved_date),
      accessorKey: "moved_date",
      header: "Moved Date",
      size: 150,
      enablePinning: false,
      enableEditing: false,
      filterVariant: "date-range",
      filterFn: "between",
      Cell: ({ cell }) => cell?.getValue()?.toLocaleDateString(),
    },
  ];
};

export const CloumnsWaitList = () => {
  return [
    
    {
      accessorKey: "full_name",
      header: "Full Name",
      size: 200,
      enablePinning: true,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    // {
    //   accessorKey: "phone_number_1",
    //   header: "Second Mobile",
    //   size: 150,
    //   enablePinning: false,
    //   enableEditing: false,
    // },

    {
      accessorKey: "country",
      header: "Country",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "age_group",
      header: "Age Group",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "attend_type",
      header: "Attend Type",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "trainer",
      header: "Trainer",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorFn: (originalRow) => new Date(originalRow.moved_date),
      accessorKey: "moved_date",
      header: "Moved Date",
      size: 150,
      enablePinning: false,
      enableEditing: false,
      filterVariant: "date-range",
      filterFn: "between",
      Cell: ({ cell }) => cell?.getValue()?.toLocaleDateString(),
    },
    {
      accessorKey: "preferable_time",
      header: "Preferable Time",
      size: 250,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "sec_preferable_time",
      header: "Second Preferable Time",
      size: 250,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "level",
      header: "Level",
      size: 150,
      enablePinning: false,
      enableEditing: true,
    },
    {
      accessorKey: "payment_type",
      header: "Payment Type",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "paid_value",
      header: "Paid Value",
      size: 150,
      enablePinning: false,
      enableEditing: true,
      filterFn: "between",
    },
    {
      accessorKey: "remaining_value",
      header: "Remaining Value",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    // {
    //   accessorKey: "job",
    //   header: "Job",
    //   size: 150,
    //   enablePinning: false,
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "education",
    //   header: "Education",
    //   size: 150,
    //   enablePinning: false,
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "email",
    //   header: "Email",
    //   size: 150,
    //   enablePinning: false,
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "city",
    //   header: "City",
    //   size: 150,
    //   enablePinning: false,
    //   enableEditing: false,
    // },
    // {
    //   accessorKey: "brith_date",
    //   header: "Brith Date",
    //   size: 150,
    //   enablePinning: false,
    //   enableEditing: false,
    //   filterVariant: "date-range",
    // },
  ];
};

export const CloumnsPendingTestList = () => {
  return [
    {
      accessorKey: "full_name",
      header: "Full Name",
      size: 200,
      enablePinning: true,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_1",
      header: "Second Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "country",
      header: "Country",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "age_group",
      header: "Age Group",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "attend_type",
      header: "Attend Type",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "test_date",
      header: "Test Date",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "follow_up",
      header: "Follow Up",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "trainer",
      header: "Trainer",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "payment_type",
      header: "Payment Type",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "paid_value",
      header: "Paid Value",
      size: 150,
      enablePinning: false,
      enableEditing: false,
      filterFn: "between",
    },
    {
      accessorKey: "remaining_value",
      header: "Remaining Value",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorFn: (originalRow) => new Date(originalRow.moved_date),
      accessorKey: "moved_date",
      header: "Moved Date",
      size: 150,
      enablePinning: false,
      enableEditing: false,
      filterVariant: "date-range",
      filterFn: "between",
      Cell: ({ cell }) => cell?.getValue()?.toLocaleDateString(),
    },
  ];
};

export const CloumnsClasses = (updatePayment) => {
  return [
    {
      accessorKey: "status",
      header: "Status",
      size: 200,
      enablePinning: true,
      enableEditing: false,
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
      size: 200,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "result",
      header: "Result",
      size: 150,
      enablePinning: false,
      enableEditing: false,
      // Cell: ({ row }) =>
      //   row.original.result ? row.original.result : "Not Show",
    },
    {
      accessorKey: "payment",
      header: "Fees / Payment",
      size: 150,
      enablePinning: false,
      enableEditing: true,
      muiEditTextFieldProps: ({ row }) => ({
        onBlur: (event) => {
          updatePayment({
            payment: event.target.value,
            trainee_id: row.original.id,
          });
        },
      }),
    },
    {
      accessorKey: "confirmation",
      header: "Confirmation",
      size: 150,
      enablePinning: false,
      enableEditing: false,
       
      Cell: ({ row }) => <Confirmation row={row?.original} />,
    },
    // {
    //   accessorKey: "trainer_note",
    //   header: "Trainer Note",
    //   size: 150,
    //   enablePinning: false,
    //   enableEditing: false,
    // },
    {
      accessorKey: "admin_note",
      header: "Admin Note",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
  ];
};

export const CloumnsAttendance = (class_id, type, updateComment) => {
  return [
    {
      accessorKey: "full_name",
      header: "Full Name",
      size: 100,
      enablePinning: true,
      enableEditing: false,
    },
    {
      accessorKey: "phone_number_0",
      header: "Mobile",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "admin_note",
      header: "Admin Note",
      size: 150,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "session_note",
      header: "Session Notes",
      // size: 800,

      enablePinning: false,
      enableEditing: false,
      enableColumnActions: false,
      enableSorting: false,
      enableColumnFilter: false,
      muiTableHeadCellProps: {
        align: "center",
        sx: {
          "& .Mui-TableHeadCell-Content": {
            width: "100%  !important",
          },
          "& .Mui-TableHeadCell-Content-Wrapper": {
            width: "100% !important",
          },
          "& .Mui-TableHeadCell-Content-Labels": {
            width: "100% !important",
          },
        },
      },
      Header: ({ column }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <div>
            <p>{column.columnDef.header}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",
              margin: "auto",
            }}
          >
            <p style={{ textAlign: "center", width: "100%" }}>1</p>
            <p style={{ textAlign: "center", width: "100%" }}>2</p>
            <p style={{ textAlign: "center", width: "100%" }}>3</p>
            <p style={{ textAlign: "center", width: "100%" }}>4</p>
            <p style={{ textAlign: "center", width: "100%" }}>5</p>
            <p style={{ textAlign: "center", width: "100%" }}>6</p>
            <p style={{ textAlign: "center", width: "100%" }}>7</p>
            <p style={{ textAlign: "center", width: "100%" }}>8</p>
          </div>
        </div>
      ),

      Cell: ({ row }) => (
        <SessionNotes row={row.original} class_id={class_id} type={type} />
      ),
    },
    {
      accessorKey: "trainer_note",
      header: "Result",
      enablePinning: false,
      enableEditing: false,
       
      Cell: ({ row }) => (
        <Result row={row?.original} class_id={class_id} type={type} />
      ),
    },
    {
      accessorKey: "total_attend",
      header: "Total Attend",
      size: 150,
      enablePinning: false,
      enableEditing: false,
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "comment",
      header: "Comment",
      size: 150,
      enablePinning: false,
      enableEditing: true,
      muiEditTextFieldProps: ({ row }) => ({
        onBlur: (event) => {
          updateComment({
            comment: event.target.value,
            trainee_id: row.original.id,
          });
        },
      }),
    },
  ];
};

export const CloumnsBranches = () => {
  return [
    {
      accessorKey: "country",
      header: "country",
      size: 200,
      enablePinning: true,
      enableEditing: false,
    },
    {
      accessorKey: "city",
      header: "City",
      size: 200,
      enablePinning: false,
      enableEditing: false,
    },
    {
      accessorKey: "district",
      header: "District",
      size: 200,
      enablePinning: false,
      enableEditing: false,
    },
  ];
};
