import { useEffect, useState } from "react";
import styles from "@styles/styles.module.css";
import PathName from "@components/Gateway-System/PathName/PathName";
import AdvancedTable from "@src/components/Gateway-System/Table/AdvancedTable";
import { CloumnsRoles } from "@src/shared/CloumnsTables";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkDeleteRoles,
  clearError,
  clearSuccess,
  createRole,
  fetchRoleById,
  fetchRoles,
  updateRole,
} from "@src/store/reducers/Role/RoleSlice";
import ActionRole from "@src/components/Gateway-System/Table/Actions/ActionRole";
import AddButton from "@src/components/Gateway-System/AddButton/AddButton";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import FormRole from "@src/components/forms/Role/formRole";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { Navigate, useOutletContext } from "react-router-dom";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";

const Roles = () => {
  const [addRole, setAddRole] = useState(false);
  const [editRole, setEditRole] = useState(false);

  const context = useOutletContext();
  const dispatch = useDispatch();

  const { roles, role, isLoading, error, isSuccess, create, isUpdate } =
    useSelector((state) => state.role);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const HandlerEdit = (id) => {
    setEditRole(true);
    dispatch(fetchRoleById(id));
  };

  // update role
  const onSubmitEdit = (data) => {
    dispatch(updateRole({ id: role?.roles.id, role: data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setEditRole(false);
        dispatch(fetchRoles());
      });
  };

  const onSubmit = (data) => {
    dispatch(createRole(data))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRoles());
        setAddRole(false);
      });
  };

  const bulkDelete = (selected) => {
    dispatch(bulkDeleteRoles({ roles: selected }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchRoles());
        selected = [];
      });
  };

  useEffect(() => {
    if (error) {
      ToastError(error?.message);

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
    if (isSuccess) {
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }
  }, [error, isSuccess, dispatch]);

  if (
    !checkPermission({
      name: "roles",
      children: ["view_roles"],
    })
  ) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.containerPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Roles`}</title>
      </Helmet>

      <PathName path="Roles" style={{ paddingBottom: "0px" }} back={true} />

      <div className={styles.containerPage_content}>
        {checkPermission({
          name: "roles",
          children: ["create_role"],
        }) && (
          <>
            <AddButton
              title="Add new role"
              name="Add Role"
              openAddModal={() => setAddRole(true)}
            />

            {/* Add Role in Modal */}
            <Modals isOpen={addRole} handleClose={() => setAddRole(false)}>
              <FormRole onSubmit={onSubmit} isLoading={create.isLoading} />
            </Modals>
          </>
        )}

        {/* Edit Role in Modal */}
        {checkPermission({
          name: "roles",
          children: ["update_role"],
        }) && (
          <Modals isOpen={editRole} handleClose={() => setEditRole(false)}>
            <FormRole
              onSubmit={onSubmitEdit}
              edit={true}
              isLoading={isUpdate.isLoading}
              data={role?.roles}
            />
          </Modals>
        )}

        <div className={styles.table} style={{ marginTop: "80px" }}>
          <AdvancedTable
            columns={CloumnsRoles()}
            rows={roles?.roles || []}
            Actions={<ActionRole HandlerEdit={HandlerEdit} />}
            isLoading={isLoading}
            bulkDelete={bulkDelete}
            enableRowSelection={true}
            enableRowActions={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Roles;
