import PathName from "@src/components/Gateway-System/PathName/PathName";
import styles from "@styles/Details.module.css";
import { RiErrorWarningLine } from "react-icons/ri";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import AddButton from "@src/components/Gateway-System/AddButton/AddButton";
import { GoKebabHorizontal } from "react-icons/go";
import { IconButton, MenuItem } from "@mui/material";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import { useEffect, useState } from "react";
import AddClasses from "@src/components/forms/Classes/AddClasses";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createClass,
  deleteClass,
  filterClasses,
  updateClass,
} from "@src/store/reducers/Batches/Classes/ClassesSlice";
import { ToastSuccess } from "@src/util/Toast";
import CustomizedMenus from "@src/components/Gateway-System/CustomizedMenus/CustomizedMenus";
import FilterClasses from "@src/components/Gateway-System/Classes/FilterClasses/FilterClasses";
import { getBranchesAllPages } from "@src/store/reducers/Branches/BrancheSlice";
import checkPermission from "@src/util/CheckPermission";
import { Helmet } from "react-helmet";
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete";

const DetailsBatch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState({ isOpen: false });
  const [open_menu, setOpenMenu] = useState(false);
  const [deleteClassId, setDeleteClassId] = useState(null); // selected class id for delete

  const { state } = useLocation();
  const navigate = useNavigate();

  const context = useOutletContext();
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(filterClasses({ batch_id: state?.id }));

    checkPermission({
      name: "classes",
      children: ["view_classes", "view_own_classes"],
    }) && dispatch(getBranchesAllPages());
  }, [dispatch, state]);

  const viewClass = (Class) => {
    navigate(`/batch/${state?.id}/class/${Class.id}`, {
      state: { batchId: state?.id, class_id: Class.id },
    });
  };

  // on Submit Add class
  const onSubmit = (class_data) => {
    dispatch(createClass({ id: state?.id, class_data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(filterClasses({ batch_id: state?.id }));
        setIsOpen(false);
      });
  };

  const onSubmitEdit = (class_data) => {
    dispatch(updateClass({ batch_id: state?.id, class_data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(filterClasses({ batch_id: state?.id }));
        setIsOpenEdit({ isOpen: false });
      });
  };

  // open confirm popup (store class id)
  const onDeleteClass = (class_id) => {
    setDeleteClassId(class_id);
  };

  // confirm delete class
  const handleConfirmDelete = () => {
    if (!deleteClassId) return;

    dispatch(deleteClass({ batch_id: state?.id, class_id: deleteClassId }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setDeleteClassId(null);
        dispatch(filterClasses({ batch_id: state?.id }));
      });
  };

  // show error class
  useEffect(() => {
    if (error) {
      ToastSuccess(error?.message);

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  if (
    !checkPermission({
      name: "classes",
      children: ["view_classes", "view_own_classes", "view_classes_by_branch"],
    })
  ) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div className={styles.Details}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Classes`}</title>
      </Helmet>

      <PathName path="Batch" back={true} />
      <div className={styles.details_content}>
        <div className={styles.title}>
          <RiErrorWarningLine className={styles.icon} />
          <h2>Details</h2>
        </div>

        <div className={styles.Batch_title}>
          <h3>{classes?.batch_title}</h3>
        </div>
        <div className={styles.content_wapper}>
          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <LuUsers2 className={styles.icon} />
              <h3>classes</h3>
            </div>
            <p>{classes?.num_classes}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <MdOutlineDateRange className={styles.icon} />
              <h3>Start Date</h3>
            </div>
            <p>{classes?.start_date}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <MdOutlineDateRange className={styles.icon} />
              <h3>End Date</h3>
            </div>
            <p>{classes?.end_date}</p>
          </div>

          <div className={styles.content_info}>
            <div className={styles.info_title}>
              <FiCheckCircle className={styles.icon} />
              <h3>Status</h3>
            </div>
            <p>{classes?.status ? "Active" : "Archive"}</p>
          </div>
        </div>
      </div>

      {/* Classes  */}
      <div className={styles.Classes}>
        <FilterClasses batch_id={state?.id} />

        <div className={styles.Classes_title}>
          <div className={styles.title}>
            <LuUsers2 className={styles.icon} />
            <h3>Classes</h3>
          </div>

          {checkPermission({
            name: "classes",
            children: ["create_classes", "create_classes_by_branch"],
          }) && (
            <>
              <AddButton
                title="Add Classes"
                name="Add Classes"
                openAddModal={() => setIsOpen(true)}
              />

              {/* Add Classes */}
              <Modals isOpen={isOpen} handleClose={() => setIsOpen(false)}>
                <AddClasses onSubmit={onSubmit} isLoading={loading} />
              </Modals>
            </>
          )}

          {/* Edit Classes */}
          {checkPermission({
            name: "classes",
            children: [
              "update_classes",
              "update_own_classes",
              "update_classes_by_branch",
            ],
          }) && (
            <Modals
              isOpen={isOpenEdit?.isOpen}
              handleClose={() => setIsOpenEdit({ isOpen: false })}
            >
              <AddClasses
                onSubmit={onSubmitEdit}
                isLoading={loading}
                Class={isOpenEdit?.Class}
                edit={true}
              />
            </Modals>
          )}
        </div>

        {classes?.classes?.length < 1 && (
          <p style={{ textAlign: "center", color: "var(--text-gray)" }}>
            {/* {classes?.message} */} There are no classes
          </p>
        )}

        <div className={styles.Classes_content}>
          {classes?.classes?.length > 0 &&
            classes?.classes?.map((classes, index) => (
              <div key={index} className={styles.class_item}>
                <div className={styles.item_title}>
                  <h4>{classes.class_name}</h4>

                  <div>
                    <IconButton
                      onClick={(e) => setOpenMenu({ [index]: e.currentTarget })}
                    >
                      <GoKebabHorizontal className={styles.icon} />
                    </IconButton>

                    <CustomizedMenus
                      isOpen={open_menu[index]}
                      handlerClose={() => setOpenMenu(false)}
                    >
                      {checkPermission({
                        name: "classes",
                        children: [
                          "update_classes",
                          "update_own_classes",
                          "update_classes_by_branch",
                        ],
                      }) && (
                        <MenuItem
                          onClick={() => setOpenMenu(false)}
                          onClickCapture={() =>
                            setIsOpenEdit({
                              isOpen: true,
                              Class: classes,
                            })
                          }
                        >
                          Edit
                        </MenuItem>
                      )}
                      {checkPermission({
                        name: "classes",
                        children: [
                          "delete_classes",
                          "delete_own_classes",
                          "delete_classes_by_branch",
                        ],
                      }) && (
                        <MenuItem
                          onClick={() => setOpenMenu(false)}
                          onClickCapture={() => onDeleteClass(classes.id)}
                        >
                          Delete
                        </MenuItem>
                      )}
                    </CustomizedMenus>
                  </div>
                </div>

                <p>{classes.time_slot}</p>

                <div className={styles.item_bottom}>
                  <button
                    className={styles.button}
                    onClick={() => viewClass(classes)}
                  >
                    View Class
                  </button>
                  <p>Trainees: {classes.num_of_trainees}</p>

                  <p>Confirmations: {classes.num_of_confirmation}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Global confirm delete popup for classes */}
      <ConfirmDelete
        open={Boolean(deleteClassId)}
        onClose={() => setDeleteClassId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default DetailsBatch;
