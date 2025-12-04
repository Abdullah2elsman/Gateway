import { useEffect, useState } from "react";
import AddButton from "../AddButton/AddButton";
import Modals from "../Modals/Modals";
import Add from "./Add/Add";
import styles from "./Announcements.module.css";
import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import {
  clearError,
  createAnnouncement,
  deleteAnnouncement,
  fetchAnnouncements,
  replyAnnouncement,
  setAnnounceId,
  updateAnnouncement,
} from "@src/store/reducers/Announcements/AnnouncementsSlice";
import { IconButton, MenuItem } from "@mui/material";
import CustomizedMenus from "../CustomizedMenus/CustomizedMenus";
import Reply from "./Reply/Reply";
import checkPermission from "@src/util/CheckPermission";

const Announcements = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    isOpen: false,
  });
  const [isReply, setIsReply] = useState({
    isOpen: false,
  });

  const dispatch = useDispatch();
  const { announcements, error, loading } = useSelector(
    (state) => state.Announcements
  );

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const onSubmitEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    dispatch(
      updateAnnouncement({
        id: isEdit?.announcement.id,
        announce: formData.get("announce"),
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchAnnouncements());
        setIsEdit({ isOpen: false });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    dispatch(createAnnouncement(formData.get("announce")))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchAnnouncements());
        setIsOpen(false);
      });
  };

  const onSubmitReply = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(setAnnounceId(isReply?.reply.id));
    dispatch(
      replyAnnouncement({
        announce_id: isReply?.reply.id,
        reply: formData.get("reply"),
      })
    )
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchAnnouncements());
        setIsReply({ isOpen: false });
      });
  };

  const onDelete = (id) => {
    dispatch(deleteAnnouncement(id))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchAnnouncements());
      });
  };

  //  show error message
  useEffect(() => {
    if (error) {
      ToastError(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [dispatch, error]);

  return (
    <div className={styles.Announcements}>
      <div className={styles.title}>
        <h3>Announcements</h3>

        {checkPermission({
          name: "announcements",
          children: ["create_announcement"],
        }) && (
          <>
            <AddButton
              title="Add"
              name="Add"
              openAddModal={() => setIsOpen(true)}
              padding={0}
              style={{ padding: "5px 30px" }}
            />

            <Modals isOpen={isOpen} handleClose={() => setIsOpen(false)}>
              <Add isLoading={loading} onSubmit={onSubmit} />
            </Modals>
          </>
        )}
      </div>

      {/* Edit Announcement */}
      {checkPermission({
        name: "announcements",
        children: ["update_announcement"],
      }) && (
        <Modals
          isOpen={isEdit.isOpen}
          handleClose={() =>
            setIsEdit({
              isOpen: false,
            })
          }
        >
          <Add
            onSubmit={onSubmitEdit}
            isLoading={loading}
            announce={isEdit?.announcement}
            edit={true}
          />
        </Modals>
      )}

      {/* reply to Announcement */}
      {checkPermission({
        name: "announcements",
        children: ["reply_to_announcement"],
      }) && (
        <Modals
          isOpen={isReply.isOpen}
          handleClose={() =>
            setIsReply({
              isOpen: false,
            })
          }
        >
          <Reply onSubmit={onSubmitReply} isLoading={loading} />
        </Modals>
      )}

      {announcements?.length < 1 && <p>There no Announcements</p>}

      {announcements?.map((announcement, index) => (
        <div className={styles.info} key={announcement.id}>
          <div className={styles.info_wapper}>
            <h4>{announcement.announce}</h4>
            <span>{announcement.created_at}</span>
          </div>
          <div>
            <IconButton
              aria-controls={`announce_${index}`}
              onClick={(e) => setIsOpenMenu({ [index]: e.currentTarget })}
            >
              <GoKebabHorizontal className={styles.icon} />
            </IconButton>
            <CustomizedMenus
              isOpen={isOpenMenu[index]}
              handlerClose={() => setIsOpenMenu(false)}
            >
              {checkPermission({
                name: "announcements",
                children: ["reply_to_announcement"],
              }) && (
                <MenuItem
                  onClick={() => setIsOpenMenu(false)}
                  onClickCapture={() =>
                    setIsReply({
                      isOpen: true,
                      reply: announcement,
                    })
                  }
                >
                  Reply
                </MenuItem>
              )}
              {checkPermission({
                name: "announcements",
                children: ["update_announcement"],
              }) && (
                <MenuItem
                  onClick={() => setIsOpenMenu(false)}
                  onClickCapture={() =>
                    setIsEdit({
                      isOpen: true,
                      announcement: announcement,
                    })
                  }
                >
                  Edit
                </MenuItem>
              )}
              {checkPermission({
                name: "announcements",
                children: ["delete_announcement"],
              }) && (
                <MenuItem
                  onClick={() => setIsOpenMenu(false)}
                  onClickCapture={() => onDelete(announcement.id)}
                >
                  Delete
                </MenuItem>
              )}
            </CustomizedMenus>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
