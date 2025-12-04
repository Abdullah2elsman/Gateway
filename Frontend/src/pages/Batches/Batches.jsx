/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import styles from "@styles/Batches.module.css";
import { GoArchive, GoKebabHorizontal } from "react-icons/go";
import { PiUsersFourLight } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { IconButton, MenuItem } from "@mui/material";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import CustomizedMenus from "@components/Gateway-System/CustomizedMenus/CustomizedMenus";
import AddButton from "@src/components/Gateway-System/AddButton/AddButton";
import Modals from "@src/components/Gateway-System/Modals/Modals";
import FormBatch from "@src/components/forms/Batches/FormBatch";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createBatch,
  deleteBatch,
  DuplicateBatch,
  fetchBatches,
  updateActivateBatch,
  UpdateBatch,
  updateEndActivateBatch,
} from "@src/store/reducers/Batches/BatchesSlice";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { getBranchesAllPages } from "@src/store/reducers/Branches/BrancheSlice";
import checkPermission from "@src/util/CheckPermission";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import { Helmet } from "react-helmet";
import ConfirmDelete from "@src/components/feedback/Alert/ConfirmDelete";

const Batches = () => {
  const [openActive, setOpenActive] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState({
    isOpen: false,
    batch: null,
  });
  const [branch, setBranch] = useState("");

  // state for delete confirmation popup
  const [deleteBatchId, setDeleteBatchId] = useState(null);

  const context = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { batches, isLoading, error } = useSelector((state) => state.batches);
  const { page_branches } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(fetchBatches(branch));
    dispatch(getBranchesAllPages());
  }, [dispatch, branch]);

  const DetailsBatch = (batch) => {
    navigate(`/batch/${batch.id}`, {
      state: batch,
    });
  };

  const handlerEdit = (data) => {
    setOpenEdit({
      isOpen: true,
      batch: data,
    });
  };

  const ArchiveBatch = (id) => {
    dispatch(updateActivateBatch(id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBatches());
      });
  };

  const EndArchiveBatch = (id) => {
    dispatch(updateEndActivateBatch(id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBatches());
      });
  };

  const onSubmitEdit = (batch) => {
    dispatch(UpdateBatch(batch))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setOpenEdit({
          isOpen: false,
          batch: null,
        });
        dispatch(fetchBatches());
      });
  };

  const onSubmit = (batch) => {
    dispatch(createBatch(batch))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setOpenAdd(false);
        dispatch(fetchBatches());
      });
  };

  // real delete logic (called after user confirms)
  const handleConfirmDelete = () => {
    if (!deleteBatchId) return;

    dispatch(deleteBatch(deleteBatchId))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        setDeleteBatchId(null);
        dispatch(fetchBatches());
      });
  };

  const onDuplicateBatch = () => {
    dispatch(DuplicateBatch(branch))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchBatches(branch));
      });
  };

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
      name: "batches",
      children: ["view_batches", "view_own_batches", "view_batches_by_branch"],
    })
  ) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div className={styles.Batches}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | batches`}</title>
      </Helmet>

      <PathName path="Batches" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {checkPermission({
          name: "batches",
          children: ["view_batches", "view_own_batches"],
        }) && (
          <div style={{ width: "250px", marginRight: "10px" }}>
            {page_branches?.current_branch && (
              <Branch
                label={true}
                branches={page_branches.branches}
                current_branch={""}
                display="inline"
                setBranch={setBranch}
              />
            )}
          </div>
        )}

        {(batches?.active || batches?.archive) && (
          <AddButton
            title="Duplicate"
            name="Duplicate Batch"
            openAddModal={onDuplicateBatch}
            style={{ background: "var(--text-black)" }}
            padding="5px"
          />
        )}

        {checkPermission({
          name: "batches",
          children: ["create_batches", "create_batches_by_branch"],
        }) && (
          <>
            <AddButton
              title="Add new Batch"
              name="Add Batch"
              openAddModal={() => setOpenAdd(true)}
            />

            {/* Add Batch in Modal */}
            <Modals isOpen={openAdd} handleClose={() => setOpenAdd(false)}>
              <FormBatch onSubmit={onSubmit} isLoading={isLoading} />
            </Modals>
          </>
        )}
      </div>

      {/* Edit Batch in Modal */}
      {checkPermission({
        name: "batches",
        children: [
          "update_batches",
          "update_own_batches",
          "update_batches_by_branch",
        ],
      }) && (
        <Modals
          isOpen={openEdit.isOpen}
          handleClose={() =>
            setOpenEdit({
              isOpen: false,
              batch: null,
            })
          }
        >
          <FormBatch
            onSubmit={onSubmitEdit}
            edit={true}
            isLoading={isLoading}
            batch={openEdit?.batch}
          />
        </Modals>
      )}

      <div className={styles.Batches_content}>
        {/* Active */}
        <div className={styles.Batches_Active}>
          <div className={styles.active_title}>
            <MdOutlineAssignmentTurnedIn className={styles.icon} size={28} />
            <h3>Active Batches</h3>
          </div>
          {!batches?.active ? (
            <div
              style={{
                textAlign: "center",
                padding: "30px 0",
                color: "var(--text-black)",
              }}
            >
              <span>There are no batches in the active.</span>
            </div>
          ) : (
            batches?.active?.map((batch, index) => (
              <div className={styles.active_info} key={batch.id}>
                <div className={styles.info_title}>
                  <h4>{batch.batch_title}</h4>
                  <div>
                    <IconButton
                      onClick={(e) =>
                        setOpenActive({ [index]: e.currentTarget })
                      }
                    >
                      <GoKebabHorizontal className={styles.icon} />
                    </IconButton>

                    <CustomizedMenus
                      isOpen={openActive[index]}
                      handlerClose={() => setOpenActive(false)}
                    >
                      {checkPermission({
                        name: "batches",
                        children: [
                          "update_batches",
                          "update_own_batches",
                          "update_batches_by_branch",
                        ],
                      }) && (
                        <MenuItem
                          onClick={() => setOpenActive(false)}
                          onClickCapture={() => handlerEdit(batch)}
                        >
                          Edit
                        </MenuItem>
                      )}

                      {checkPermission({
                        name: "batches",
                        children: [
                          "end_batches",
                          "end_own_batches",
                          "end_batches_by_branch",
                        ],
                      }) && (
                        <MenuItem
                          onClick={() => setOpenActive(false)}
                          onClickCapture={() => EndArchiveBatch(batch.id)}
                        >
                          End Batch
                        </MenuItem>
                      )}
                    </CustomizedMenus>
                  </div>
                </div>
                <div className={styles.info_date}>
                  <p>{batch.start_date}</p>
                  <FaArrowRight className={styles.icon} />
                  <p>{batch.end_date}</p>
                </div>
                <div className={styles.info_classes}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <PiUsersFourLight className={styles.icon} />
                    <span>{batch.num_classes} Classes</span>
                  </div>
                  <button onClick={() => DetailsBatch(batch)}>
                    View Batch
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Archive */}
        <div className={styles.Batches_Archive}>
          <div className={styles.archive_title}>
            <GoArchive className={styles.icon} />
            <h3>Archive Batches</h3>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
              <Spinner color="var(--text-black)" />
            </div>
          ) : (
            <>
              {!batches?.archive ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-black)",
                    paddingTop: "50px",
                  }}
                >
                  There are no batches in the archive.
                </p>
              ) : (
                <div className={styles.archive_List}>
                  {batches?.archive?.map((batch, index) => (
                    <div className={styles.list_item} key={batch.id}>
                      <div className={styles.item_title}>
                        <h4>{batch.batch_title}</h4>
                        <div>
                          <IconButton
                            onClick={(e) =>
                              setOpenArchive({ [index]: e.currentTarget })
                            }
                          >
                            <GoKebabHorizontal className={styles.icon} />
                          </IconButton>

                          <CustomizedMenus
                            isOpen={openArchive[index]}
                            handlerClose={() => setOpenArchive(false)}
                          >
                            {checkPermission({
                              name: "batches",
                              children: [
                                "update_batches",
                                "update_own_batches",
                                "update_batches_by_branch",
                              ],
                            }) && (
                              <MenuItem
                                onClick={() => setOpenArchive(false)}
                                onClickCapture={() => handlerEdit(batch)}
                              >
                                Edit
                              </MenuItem>
                            )}
                            {checkPermission({
                              name: "batches",
                              children: [
                                "activate_batches",
                                "activate_own_batches",
                                "activate_batches_by_branch",
                              ],
                            }) && (
                              <MenuItem
                                onClick={() => setOpenArchive(false)}
                                onClickCapture={() => ArchiveBatch(batch.id)}
                              >
                                Active
                              </MenuItem>
                            )}
                            {checkPermission({
                              name: "batches",
                              children: [
                                "delete_batches",
                                "delete_own_batches",
                                "delete_batches_by_branch",
                              ],
                            }) && (
                              <MenuItem
                                onClick={() => setOpenArchive(false)}
                                onClickCapture={() =>
                                  setDeleteBatchId(batch.id)
                                }
                              >
                                Delete
                              </MenuItem>
                            )}
                          </CustomizedMenus>
                        </div>
                      </div>
                      <div className={styles.item_date}>
                        <p>{batch.start_date}</p>
                        <FaArrowRight className={styles.icon} />
                        <p>{batch.end_date}</p>
                      </div>

                      <div className={styles.item_classes}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <PiUsersFourLight className={styles.icon} />
                          <span>{batch.num_classes} Classes</span>
                        </div>
                        <button onClick={() => DetailsBatch(batch)}>
                          View Batch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Global Confirm Delete popup for batches */}
      <ConfirmDelete
        open={Boolean(deleteBatchId)}
        onClose={() => setDeleteBatchId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Batches;
