import { useEffect, useMemo, useState } from "react";
import styles from "@styles/styles.module.css";
import PathName from "@components/Gateway-System/PathName/PathName";
import AddButton from "@components/Gateway-System/AddButton/AddButton";
import AddUser from "@src/components/forms/User/FormUser";
import Modals from "@components/Gateway-System/Modals/Modals";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsUsers } from "@src/shared/CloumnsTables";
import ActionUsers from "@src/components/Gateway-System/Table/Actions/ActionUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkDeleteUsers,
  clearError,
  createUser,
  fetchUsers,
  updateUser,
  deleteUser,
} from "@src/store/reducers/Users/UsersSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";
import { clearSelected } from "@src/store/Hook/clearSelection";
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [updateUsers, setUpdateUsers] = useState("");
  const [branch, setBranch] = useState("");

  // ✅ user المطلوب حذفه
  const [rowToDelete, setRowToDelete] = useState(null);

  const context = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(branch));
  }, [dispatch, branch]);

  // ✅ NEW: ترتيب اليوزرز بحيث الجديد يطلع فوق
  const sortedUsers = useMemo(() => {
    const list = Array.isArray(users?.users) ? [...users.users] : [];

    list.sort((a, b) => {
      const aDate = a?.created_at ? new Date(a.created_at).getTime() : null;
      const bDate = b?.created_at ? new Date(b.created_at).getTime() : null;

      // لو عندنا created_at: الأحدث أولاً
      if (aDate && bDate) return bDate - aDate;

      // fallback: الأكبر id أولاً
      const aId = Number(a?.id ?? 0);
      const bId = Number(b?.id ?? 0);
      return bId - aId;
    });

    return list;
  }, [users?.users]);

  const HandlerEdit = (row) => {
    setIsOpenEdit(true);
    setUpdateUsers(row);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    let user;
    if (data.second_Phone.replace(/\s/g, "")) {
      user = {
        full_name: data.full_name,
        email: data.email.includes("@gatewaycommunity.net")
          ? data.email
          : `${data.email}@gatewaycommunity.net`,
        branch: data.branch,
        phone_numbers: [
          data.phone.replace(/\s/g, ""),
          data.second_Phone.replace(/\s/g, ""),
        ],
        country: data.country,
        is_activated: data.is_activated === "on" ? true : false,
      };
    } else {
      user = {
        full_name: data.full_name,
        email: data.email.includes("@gatewaycommunity.net")
          ? data.email
          : `${data.email}@gatewaycommunity.net`,
        branch: data.branch,
        phone_numbers: [data.phone.replace(/\s/g, "")],
        country: data.country,
        is_activated: data.is_activated === "on" ? true : false,
      };
    }

    if (data.role) user.role = data.role;

    if (data.password !== data.confirm_password) return;

    if (data.password && data.confirm_password) {
      user = {
        ...user,
        password: data.password,
        confirm_password: data.confirm_password,
      };
    }

    dispatch(updateUser({ id: updateUsers.id, user }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setIsOpenEdit(false);
        dispatch(fetchUsers(branch));
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    let user;

    if (data.second_Phone.replace(/\s/g, "")) {
      user = {
        full_name: data.full_name,
        email: `${data.email}@gatewaycommunity.net`,
        password: data.password,
        confirm_password: data.confirm_password,
        branch: data.branch,
        phone_numbers: [
          data.phone.replace(/\s/g, ""),
          data.second_Phone.replace(/\s/g, ""),
        ],
        country: data.country,
        is_activated: data.is_activated === "on" ? true : false,
        role: data.role,
      };
    } else {
      user = {
        full_name: data.full_name,
        email: `${data.email}@gatewaycommunity.net`,
        password: data.password,
        confirm_password: data.confirm_password,
        branch: data.branch,
        phone_numbers: [data.phone.replace(/\s/g, "")],
        country: data.country,
        is_activated: true,
        role: data.role,
      };
    }

    if (data.password !== data.confirm_password) return;

    dispatch(createUser(user))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setIsOpen(false);
        dispatch(fetchUsers(branch));
      });
  };

  const BulkDelete = (selected) => {
    dispatch(bulkDeleteUsers({ users: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchUsers(branch));
      });
  };

  // ✅ طلب الحذف جاي من ActionUsers
  const handleRequestDelete = (row) => {
    setRowToDelete(row);
  };

  // ✅ تنفيذ الحذف بعد تأكيد البوب أب
  const handleConfirmDelete = () => {
    if (!rowToDelete) return;

    dispatch(deleteUser(rowToDelete.id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchUsers(branch));
        dispatch(clearSelected());
      })
      .finally(() => {
        setRowToDelete(null);
      });
  };

  const handleCancelDelete = () => {
    setRowToDelete(null);
  };

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
      name: "users",
      children: ["view_users_by_branch", "view_users", "view_own_users"],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.containerPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Users`}</title>
      </Helmet>

      <ConfirmDelete
        open={!!rowToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PathName path="Users" style={{ paddingBottom: "0px" }} />

        {checkPermission({
          name: "roles",
          children: ["view_roles"],
        }) && (
          <AddButton
            title="Go to Roles"
            name="Go to Roles"
            openAddModal={() => navigate("/roles")}
            style={{ background: "#eee", color: "#333" }}
          />
        )}
      </div>

      <div className={styles.containerPage_content}>
        <div style={{ display: "flex", alignSelf: "flex-end" }}>
          {checkPermission({
            name: "branches",
            children: ["view_branches"],
          }) && (
            <AddButton
              title="Go to Branches"
              name="Go to Branches"
              openAddModal={() => navigate("/branches")}
              style={{ background: "#eee", color: "#333" }}
            />
          )}

          {checkPermission({
            name: "users",
            children: ["create_users", "create_users_by_branch"],
          }) && (
            <>
              <AddButton
                title="Add new user"
                name="Add User"
                openAddModal={() => setIsOpen(true)}
              />

              <Modals isOpen={isOpen} handleClose={() => setIsOpen(false)}>
                <AddUser
                  onSubmit={onSubmit}
                  error={error?.message}
                  isLoading={isLoading}
                />
              </Modals>
            </>
          )}
        </div>

        {checkPermission({
          name: "users",
          children: [
            "update_users_by_branch",
            "update_users",
            "update_own_users",
          ],
        }) && (
          <Modals isOpen={isOpenEdit} handleClose={() => setIsOpenEdit(false)}>
            <AddUser
              updateUser={updateUsers}
              onSubmit={onSubmitEdit}
              edit={true}
              isLoading={isLoading}
            />
          </Modals>
        )}

        <div className={styles.table}>
          <AdvancedTable
            columns={CloumnsUsers()}
            rows={sortedUsers}
            Actions={
              <ActionUsers
                HandlerEdit={HandlerEdit}
                onRequestDelete={handleRequestDelete}
              />
            }
            isLoading={isLoading}
            bulkDelete={BulkDelete}
            enableRowSelection={true}
            enableRowActions={true}
            setBranch={setBranch}
            type="users"
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
