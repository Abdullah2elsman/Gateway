import { useEffect, useState } from "react";
import styles from "./Role.module.css";
import PropTypes from "prop-types";
import { Box, Button, FormGroup } from "@mui/material";
import FullName from "@src/components/Gateway-System/Inputs/FullName";
import CheckBox from "@src/components/Gateway-System/Inputs/CheckBox";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";

const FormRole = ({ onSubmit, edit, isLoading, data }) => {
  const [title_role, setTitleRole] = useState("");

  const [general, setGeneral] = useState({
    show_follow_up_list: false,
    show_trainers_list: false,
  });

  const [branches, setBranches] = useState({
    create_branch: false,
    view_branches: false,
    update_branch: false,
    delete_branch: false,
  });

  const [roles, setRoles] = useState({
    create_role: false,
    view_roles: false,
    view_permissions: false,
    update_role: false,
    delete_role: false,
  });

  const [users, setUsers] = useState({
    create_users_by_branch: false,
    update_users_by_branch: false,
    view_users_by_branch: false,
    delete_users_by_branch: false,
    view_self_branch: false,
    update_self_branch: false,
    create_users: false,
    assign_user_role: false,
    assign_user_status: false,
    view_users: false,
    view_roles: false,
    view_status: false,
    view_own_users: false,
    view_self: false,
    view_self_role: false,
    view_self_status: false,
    update_users: false,
    update_all_roles: false,
    update_all_status: false,
    update_own_users: false,
    update_own_role: false,
    update_own_status: false,
    update_self: false,
    update_self_role: false,
    update_self_status: false,
    delete_users: false,
    delete_own_users: false,
    delete_self: false,
  });

  const [pendingusers, setPendingusers] = useState({
    activate_users_by_branch: false,
    view_pending_users_by_branch: false,
    delete_pending_users_by_branch: false,
    assign_activate: false,
    view_pending_users: false,
    delete_pending_users: false,
  });

  const [waitlist, setWaitlist] = useState({
    create_trainees_by_branch: false,
    update_trainees_by_branch: false,
    view_trainees_by_branch: false,
    delete_trainees_by_branch: false,
    move_to_hold_by_branch: false,
    move_to_blacklist_by_branch: false,
    move_to_refund_by_branch: false,
    assign_class_by_branch: false,
    move_to_hold: false,
    move_to_blacklist: false,
    move_to_refund: false,
    create_trainees: false,
    assign_class: false,
    assign_trainer: false,
    assign_level: false,
    view_trainees: false,
    view_trainers: false,
    view_levels: false,
    view_own_trainees: false,
    view_own_trainers: false,
    view_own_levels: false,
    update_trainees: false,
    update_all_trainers: false,
    update_all_levels: false,
    update_own_trainees: false,
    update_own_trainers: false,
    update_own_levels: false,
    delete_trainees: false,
    delete_own_trainees: false,
  });

  const [trainees, setTrainees] = useState({
    view_trainees_by_branch: false,
    view_trainees: false,
  });

  const [pendinglist, setPendinglist] = useState({
    create_trainees_by_branch: false,
    update_trainees_by_branch: false,
    view_trainees_by_branch: false,
    delete_trainees_by_branch: false,
    assign_trainer_by_branch: false,
    assign_level_by_branch: false,
    create_trainees: false,
    assign_follow_up: false,
    assign_trainer: false,
    assign_level: false,
    view_trainees: false,
    view_follow_up: false,
    view_trainers: false,
    view_levels: false,
    view_own_trainees: false,
    view_own_follow_up: false,
    view_own_trainers: false,
    view_own_levels: false,
    update_trainees: false,
    update_all_trainers: false,
    update_all_levels: false,
    update_own_trainees: false,
    update_own_trainers: false,
    update_own_levels: false,
    delete_trainees: false,
    delete_own_trainees: false,
  });

  const [holdlist, setHoldlist] = useState({
    update_trainees_by_branch: false,
    view_trainees_by_branch: false,
    delete_trainees_by_branch: false,
    move_to_wait_by_branch: false,
    move_to_wait: false,
    assign_trainer: false,
    assign_level: false,
    view_trainees: false,
    view_trainers: false,
    view_levels: false,
    view_own_trainees: false,
    view_own_trainers: false,
    view_own_levels: false,
    update_trainees: false,
    update_all_trainers: false,
    update_all_levels: false,
    update_own_trainees: false,
    update_own_trainers: false,
    update_own_levels: false,
    delete_trainees: false,
    delete_own_trainees: false,
  });

  const [refundlist, setRefundlist] = useState({
    update_trainees_by_branch: false,
    view_trainees_by_branch: false,
    delete_trainees_by_branch: false,
    move_to_wait_by_branch: false,
    move_to_wait: false,
    assign_trainer: false,
    assign_level: false,
    view_trainees: false,
    view_trainers: false,
    view_levels: false,
    view_own_trainees: false,
    view_own_trainers: false,
    view_own_levels: false,
    update_trainees: false,
    update_all_trainers: false,
    update_all_levels: false,
    update_own_trainees: false,
    update_own_trainers: false,
    update_own_levels: false,
    delete_trainees: false,
    delete_own_trainees: false,
  });

  const [blacklist, setBlacklist] = useState({
    update_trainees_by_branch: false,
    view_trainees_by_branch: false,
    delete_trainees_by_branch: false,
    move_to_wait_by_branch: false,
    move_to_wait: false,
    assign_trainer: false,
    assign_level: false,
    view_trainees: false,
    view_trainers: false,
    view_levels: false,
    view_own_trainees: false,
    view_own_trainers: false,
    view_own_levels: false,
    update_trainees: false,
    update_all_trainers: false,
    update_all_levels: false,
    update_own_trainees: false,
    update_own_trainers: false,
    update_own_levels: false,
    delete_trainees: false,
    delete_own_trainees: false,
  });

  const [batches, setBatches] = useState({
    create_batches_by_branch: false,
    update_batches_by_branch: false,
    view_batches_by_branch: false,
    activate_batches_by_branch: false,
    end_batches_by_branch: false,
    delete_batches_by_branch: false,
    activate_batches: false,
    activate_own_batches: false,
    end_batches: false,
    end_own_batches: false,
    create_batches: false,
    view_batches: false,
    view_own_batches: false,
    update_batches: false,
    update_own_batches: false,
    delete_batches: false,
    delete_own_batches: false,
  });

  const [classes, setClasses] = useState({
    create_classes_by_branch: false,
    update_classes_by_branch: false,
    view_classes_by_branch: false,
    delete_classes_by_branch: false,
    add_trainer_note_by_branch: false,
    add_admin_note_by_branch: false,
    switch_class_by_branch: false,
    move_to_wait_by_branch: false,
    move_to_hold_by_branch: false,
    move_to_refund_by_branch: false,
    move_to_blacklist_by_branch: false,
    add_trainer_note: false,
    add_own_trainer_note: false,
    add_admin_note: false,
    add_to_attendance: false,
    switch_class: false,
    move_to_wait: false,
    move_to_hold: false,
    move_to_refund: false,
    move_to_blacklist: false,
    create_classes: false,
    view_classes: false,
    view_own_classes: false,
    update_classes: false,
    update_own_classes: false,
    delete_classes: false,
    delete_own_classes: false,
  });

  const [attendance, setAttendance] = useState({
    view_attendance_by_branch: false,
    add_session_notes_by_branch: false,
    view_session_notes_by_branch: false,
    view_attendance: false,
    view_trainer_attendance: false,
    add_session_notes: false,
    view_session_notes: false,
    add_own_session_notes: false,
    view_own_session_notes: false,
  });

  const [announcements, setAnnouncements] = useState({
    create_announcement: false,
    reply_to_announcement: false,
    view_announcement: false,
    view_announcement_replies: false,
    update_announcement: false,
    delete_announcement: false,
  });

  const [settings, setSettings] = useState({
    view_settings: false,
    update_settings: false,
  });

  const [notification, setNotification] = useState({
    create_branch: false,
    update_branch: false,
    delete_branch: false,
    create_role: false,
    update_role: false,
    delete_role: false,
    create_users: false,
    update_users: false,
    delete_users: false,
    activate_pending_users: false,
    delete_pending_users: false,
    create_trainees_in_waitlist: false,
    update_trainees_in_waitlist: false,
    delete_trainees_from_waitlist: false,
    assign_class: false,
    move_trainee_from_wait_to_hold: false,
    move_trainee_from_wait_to_refund: false,
    move_trainee_from_wait_to_blacklist: false,
    create_trainees_in_pendinglist: false,
    update_trainees_in_pendinglist: false,
    delete_trainees_from_pendinglist: false,
    assign_level: false,
    assign_trainer: false,
    update_trainees_in_holdlist: false,
    delete_trainees_from_holdlist: false,
    move_trainee_from_hold_to_wait: false,
    update_trainees_in_refundlist: false,
    delete_trainees_from_refundlist: false,
    move_trainee_from_refund_to_wait: false,
    update_trainees_in_blacklist: false,
    delete_trainees_from_blacklist: false,
    move_trainee_from_black_to_wait: false,
    create_batches: false,
    update_batches: false,
    delete_batches: false,
    activate_batches: false,
    end_batches: false,
    create_classes: false,
    update_classes: false,
    delete_classes: false,
    move_from_class_to_wait: false,
    move_from_class_to_hold: false,
    move_from_class_to_refund: false,
    move_from_class_to_black: false,
    switch_class: false,
    add_trainer_note: false,
    add_admin_note: false,
    add_session_notes: false,
    create_announcement: false,
    reply_to_announcement: false,
    update_announcement: false,
    delete_announcement: false,
    update_settings: false,
  });

  const handleGroupPermissionChange = (event, setState) => {
    event.preventDefault();
    const { checked, id } = event.target;

    switch (id) {
      case "generalAll":
        setState((prev) => ({
          ...prev,
          show_follow_up_list: checked,
          show_trainers_list: checked,
        }));
        break;

      case "branchesAll":
        setState((prev) => ({
          ...prev,
          create_branch: checked,
          view_branches: checked,
          update_branch: checked,
          delete_branch: checked,
        }));
        break;
      case "rolesAll":
        setState((prev) => ({
          ...prev,
          create_role: checked,
          view_roles: checked,
          view_permissions: checked,
          update_role: checked,
          delete_role: checked,
        }));
        break;
      case "usersAll":
        setState((prev) => ({
          ...prev,
          create_users_by_branch: checked,
          update_users_by_branch: checked,
          view_users_by_branch: checked,
          delete_users_by_branch: checked,
          view_self_branch: checked,
          update_self_branch: checked,
          create_users: checked,
          assign_user_role: checked,
          assign_user_status: checked,
          view_users: checked,
          view_roles: checked,
          view_status: checked,
          view_own_users: checked,
          view_self: checked,
          view_self_role: checked,
          view_self_status: checked,
          update_users: checked,
          update_all_roles: checked,
          update_all_status: checked,
          update_own_users: checked,
          update_own_role: checked,
          update_own_status: checked,
          update_self: checked,
          update_self_role: checked,
          update_self_status: checked,
          delete_users: checked,
          delete_own_users: checked,
          delete_self: checked,
        }));
        break;
      case "pendingusersAll":
        setState((prev) => ({
          ...prev,
          activate_users_by_branch: checked,
          view_pending_users_by_branch: checked,
          delete_pending_users_by_branch: checked,
          assign_activate: checked,
          view_pending_users: checked,
          delete_pending_users: checked,
        }));
        break;
      case "waitlistAll":
        setState((prev) => ({
          ...prev,
          create_trainees_by_branch: checked,
          update_trainees_by_branch: checked,
          view_trainees_by_branch: checked,
          delete_trainees_by_branch: checked,
          move_to_hold_by_branch: checked,
          move_to_blacklist_by_branch: checked,
          move_to_refund_by_branch: checked,
          assign_class_by_branch: checked,
          move_to_hold: checked,
          move_to_blacklist: checked,
          move_to_refund: checked,
          create_trainees: checked,
          assign_class: checked,
          assign_trainer: checked,
          assign_level: checked,
          view_trainees: checked,
          view_trainers: checked,
          view_levels: checked,
          view_own_trainees: checked,
          view_own_trainers: checked,
          view_own_levels: checked,
          update_trainees: checked,
          update_all_trainers: checked,
          update_all_levels: checked,
          update_own_trainees: checked,
          update_own_trainers: checked,
          update_own_levels: checked,
          delete_trainees: checked,
          delete_own_trainees: checked,
        }));
        break;
      case "trainees":
        setState((prev) => ({
          ...prev,
          view_trainees_by_branch: checked,
          view_trainees: checked,
        }));
        break;
      case "pendinglistAll":
        setState((prev) => ({
          ...prev,
          create_trainees_by_branch: checked,
          update_trainees_by_branch: checked,
          view_trainees_by_branch: checked,
          delete_trainees_by_branch: checked,
          assign_trainer_by_branch: checked,
          assign_level_by_branch: checked,
          create_trainees: checked,
          assign_follow_up: checked,
          assign_trainer: checked,
          assign_level: checked,
          view_trainees: checked,
          view_follow_up: checked,
          view_trainers: checked,
          view_levels: checked,
          view_own_trainees: checked,
          view_own_follow_up: checked,
          view_own_trainers: checked,
          view_own_levels: checked,
          update_trainees: checked,
          update_all_trainers: checked,
          update_all_levels: checked,
          update_own_trainees: checked,
          update_own_trainers: checked,
          update_own_levels: checked,
          delete_trainees: checked,
          delete_own_trainees: checked,
        }));

        break;
      case "holdlistAll":
        setState((prev) => ({
          ...prev,
          update_trainees_by_branch: checked,
          view_trainees_by_branch: checked,
          delete_trainees_by_branch: checked,
          move_to_wait_by_branch: checked,
          move_to_wait: checked,
          assign_trainer: checked,
          assign_level: checked,
          view_trainees: checked,
          view_trainers: checked,
          view_levels: checked,
          view_own_trainees: checked,
          view_own_trainers: checked,
          view_own_levels: checked,
          update_trainees: checked,
          update_all_trainers: checked,
          update_all_levels: checked,
          update_own_trainees: checked,
          update_own_trainers: checked,
          update_own_levels: checked,
          delete_trainees: checked,
          delete_own_trainees: checked,
        }));
        break;
      case "refundlistAll":
        setState((prev) => ({
          ...prev,
          update_trainees_by_branch: checked,
          view_trainees_by_branch: checked,
          delete_trainees_by_branch: checked,
          move_to_wait_by_branch: checked,
          move_to_wait: checked,
          assign_trainer: checked,
          assign_level: checked,
          view_trainees: checked,
          view_trainers: checked,
          view_levels: checked,
          view_own_trainees: checked,
          view_own_trainers: checked,
          view_own_levels: checked,
          update_trainees: checked,
          update_all_trainers: checked,
          update_all_levels: checked,
          update_own_trainees: checked,
          update_own_trainers: checked,
          update_own_levels: checked,
          delete_trainees: checked,
          delete_own_trainees: checked,
        }));
        break;
      case "blacklistAll":
        setState((prev) => ({
          ...prev,
          update_trainees_by_branch: checked,
          view_trainees_by_branch: checked,
          delete_trainees_by_branch: checked,
          move_to_wait_by_branch: checked,
          move_to_wait: checked,
          assign_trainer: checked,
          assign_level: checked,
          view_trainees: checked,
          view_trainers: checked,
          view_levels: checked,
          view_own_trainees: checked,
          view_own_trainers: checked,
          view_own_levels: checked,
          update_trainees: checked,
          update_all_trainers: checked,
          update_all_levels: checked,
          update_own_trainees: checked,
          update_own_trainers: checked,
          update_own_levels: checked,
          delete_trainees: checked,
          delete_own_trainees: checked,
        }));
        break;
      case "batches":
        setState((prev) => ({
          ...prev,
          create_batches_by_branch: checked,
          update_batches_by_branch: checked,
          view_batches_by_branch: checked,
          activate_batches_by_branch: checked,
          end_batches_by_branch: checked,
          delete_batches_by_branch: checked,
          activate_batches: checked,
          activate_own_batches: checked,
          end_batches: checked,
          end_own_batches: checked,
          create_batches: checked,
          view_batches: checked,
          view_own_batches: checked,
          update_batches: checked,
          update_own_batches: checked,
          delete_batches: checked,
          delete_own_batches: checked,
        }));
        break;
      case "classes":
        setState((prev) => ({
          ...prev,
          create_classes_by_branch: checked,
          update_classes_by_branch: checked,
          view_classes_by_branch: checked,
          delete_classes_by_branch: checked,
          add_trainer_note_by_branch: checked,
          add_admin_note_by_branch: checked,
          switch_class_by_branch: checked,
          move_to_wait_by_branch: checked,
          move_to_hold_by_branch: checked,
          move_to_refund_by_branch: checked,
          move_to_blacklist_by_branch: checked,
          add_trainer_note: checked,
          add_own_trainer_note: checked,
          add_admin_note: checked,
          add_to_attendance: checked,
          switch_class: checked,
          move_to_wait: checked,
          move_to_hold: checked,
          move_to_refund: checked,
          move_to_blacklist: checked,
          create_classes: checked,
          view_classes: checked,
          view_own_classes: checked,
          update_classes: checked,
          update_own_classes: checked,
          delete_classes: checked,
          delete_own_classes: checked,
        }));
        break;
      case "attendance":
        setState((prev) => ({
          ...prev,
          view_attendance_by_branch: checked,
          add_session_notes_by_branch: checked,
          view_session_notes_by_branch: checked,
          view_attendance: checked,
          view_trainer_attendance: checked,
          add_session_notes: checked,
          view_session_notes: checked,
          add_own_session_notes: checked,
          view_own_session_notes: checked,
        }));
        break;
      case "announcements":
        setState((prev) => ({
          ...prev,
          create_announcement: checked,
          reply_to_announcement: checked,
          view_announcement: checked,
          view_announcement_replies: checked,
          update_announcement: checked,
          delete_announcement: checked,
        }));
        break;
      case "settings":
        setState((prev) => ({
          ...prev,
          view_settings: checked,
          update_settings: checked,
        }));
        break;

      case "notification":
        setState((prev) => ({
          ...prev,
          create_branch: checked,
          update_branch: checked,
          delete_branch: checked,
          create_role: checked,
          update_role: checked,
          delete_role: checked,
          create_users: checked,
          update_users: checked,
          delete_users: checked,
          activate_pending_users: checked,
          delete_pending_users: checked,
          create_trainees_in_waitlist: checked,
          update_trainees_in_waitlist: checked,
          delete_trainees_from_waitlist: checked,
          assign_class: checked,
          move_trainee_from_wait_to_hold: checked,
          move_trainee_from_wait_to_refund: checked,
          move_trainee_from_wait_to_blacklist: checked,
          create_trainees_in_pendinglist: checked,
          update_trainees_in_pendinglist: checked,
          delete_trainees_from_pendinglist: checked,
          assign_level: checked,
          assign_trainer: checked,
          update_trainees_in_holdlist: checked,
          delete_trainees_from_holdlist: checked,
          move_trainee_from_hold_to_wait: checked,
          update_trainees_in_refundlist: checked,
          delete_trainees_from_refundlist: checked,
          move_trainee_from_refund_to_wait: checked,
          update_trainees_in_blacklist: checked,
          delete_trainees_from_blacklist: checked,
          move_trainee_from_black_to_wait: checked,
          create_batches: checked,
          update_batches: checked,
          delete_batches: checked,
          activate_batches: checked,
          end_batches: checked,
          create_classes: checked,
          update_classes: checked,
          delete_classes: checked,
          move_from_class_to_wait: checked,
          move_from_class_to_hold: checked,
          move_from_class_to_refund: checked,
          move_from_class_to_black: checked,
          switch_class: checked,
          add_trainer_note: checked,
          add_admin_note: checked,
          add_session_notes: checked,
          create_announcement: checked,
          reply_to_announcement: checked,
          update_announcement: checked,
          delete_announcement: checked,
          update_settings: checked,
        }));
        break;

      default:
        break;
    }
  };

  const handlePermissionChange = (event, setState) => {
    event.preventDefault();
    const { name, checked } = event.target;

    setState((prev) => ({
      ...prev,
      [name]: checked === "on" || checked ? true : false,
    }));
  };

  const handlerSubmitted = (event) => {
    event.preventDefault();

    const data = {
      role_title: title_role,
      permissions: {
        general,
        branches,
        roles,
        users,
        pendingusers,
        waitlist,
        trainees,
        pendinglist,
        holdlist,
        refundlist,
        blacklist,
        batches,
        classes,
        attendance,
        announcements,
        settings,
        notification,
      },
    };

    onSubmit(data);
  };

  useEffect(() => {
    if (data) {
      setTitleRole(data?.role_title);
      setGeneral({
        show_follow_up_list: data?.general?.show_follow_up_list,
        show_trainers_list: data?.general?.show_trainers_list,
      });

      setBranches({
        create_branch: data?.branches?.create_branch,
        view_branches: data?.branches?.view_branches,
        update_branch: data?.branches?.update_branch,
        delete_branch: data?.branches?.delete_branch,
      });

      setRoles({
        create_role: data?.roles?.create_role,
        view_roles: data?.roles?.view_roles,
        view_permissions: data?.roles?.view_permissions,
        update_role: data?.roles?.update_role,
        delete_role: data?.roles?.delete_role,
      });

      setUsers({
        create_users_by_branch: data?.users?.create_users_by_branch,
        update_users_by_branch: data?.users?.update_users_by_branch,
        view_users_by_branch: data?.users?.view_users_by_branch,
        delete_users_by_branch: data?.users?.delete_users_by_branch,
        view_self_branch: data?.users?.view_self_branch,
        update_self_branch: data?.users?.update_self_branch,
        create_users: data?.users?.create_users,
        assign_user_role: data?.users?.assign_user_role,
        assign_user_status: data?.users?.assign_user_status,
        view_users: data?.users?.view_users,
        view_roles: data?.users?.view_roles,
        view_status: data?.users?.view_status,
        view_own_users: data?.users?.view_own_users,
        view_self: data?.users?.view_self,
        view_self_role: data?.users?.view_self_role,
        view_self_status: data?.users?.view_self_status,
        update_users: data?.users?.update_users,
        update_all_roles: data?.users?.update_all_roles,
        update_all_status: data?.users?.update_all_status,
        update_own_users: data?.users?.update_own_users,
        update_own_role: data?.users?.update_own_role,
        update_own_status: data?.users?.update_own_status,
        update_self: data?.users?.update_self,
        update_self_role: data?.users?.update_self_role,
        update_self_status: data?.users?.update_self_status,
        delete_users: data?.users?.delete_users,
        delete_own_users: data?.users?.delete_own_users,
        delete_self: data?.users?.delete_self,
      });

      setPendingusers({
        activate_users_by_branch: data?.pendingusers?.activate_users_by_branch,
        view_pending_users_by_branch:
          data?.pendingusers?.view_pending_users_by_branch,
        delete_pending_users_by_branch:
          data?.pendingusers?.delete_pending_users_by_branch,
        assign_activate: data?.pendingusers?.assign_activate,
        view_pending_users: data?.pendingusers?.view_pending_users,
        delete_pending_users: data?.pendingusers?.delete_pending_users,
      });

      setWaitlist({
        create_trainees_by_branch: data?.waitlist?.create_trainees_by_branch,
        update_trainees_by_branch: data?.waitlist?.update_trainees_by_branch,
        view_trainees_by_branch: data?.waitlist?.view_trainees_by_branch,
        delete_trainees_by_branch: data?.waitlist?.delete_trainees_by_branch,
        move_to_hold_by_branch: data?.waitlist?.move_to_hold_by_branch,
        move_to_blacklist_by_branch:
          data?.waitlist?.move_to_blacklist_by_branch,
        move_to_refund_by_branch: data?.waitlist?.move_to_refund_by_branch,
        assign_class_by_branch: data?.waitlist?.assign_class_by_branch,

        move_to_hold: data?.waitlist?.move_to_hold,
        move_to_blacklist: data?.waitlist?.move_to_blacklist,
        move_to_refund: data?.waitlist?.move_to_refund,
        create_trainees: data?.waitlist?.create_trainees,
        assign_class: data?.waitlist?.assign_class,
        assign_trainer: data?.waitlist?.assign_trainer,
        assign_level: data?.waitlist?.assign_level,
        view_trainees: data?.waitlist?.view_trainees,
        view_trainers: data?.waitlist?.view_trainers,
        view_levels: data?.waitlist?.view_levels,
        view_own_trainees: data?.waitlist?.view_own_trainees,
        view_own_trainers: data?.waitlist?.view_own_trainers,
        view_own_levels: data?.waitlist?.view_own_levels,
        update_trainees: data?.waitlist?.update_trainees,
        update_all_trainers: data?.waitlist?.update_all_trainers,
        update_all_levels: data?.waitlist?.update_all_levels,
        update_own_trainees: data?.waitlist?.update_own_trainees,
        update_own_trainers: data?.waitlist?.update_own_trainers,
        update_own_levels: data?.waitlist?.update_own_levels,
        delete_trainees: data?.waitlist?.delete_trainees,
        delete_own_trainees: data?.waitlist?.delete_own_trainees,
      });

      setTrainees({
        view_trainees_by_branch: data?.trainees?.view_trainees,
        view_trainees: data?.trainees?.view_trainees,
      });

      setPendinglist({
        create_trainees_by_branch: data?.pendinglist?.create_trainees_by_branch,
        update_trainees_by_branch: data?.pendinglist?.update_trainees_by_branch,
        view_trainees_by_branch: data?.pendinglist?.view_trainees_by_branch,
        delete_trainees_by_branch: data?.pendinglist?.delete_trainees_by_branch,
        assign_trainer_by_branch: data?.pendinglist?.assign_trainer_by_branch,
        assign_level_by_branch: data?.pendinglist?.assign_level_by_branch,

        create_trainees: data?.pendinglist?.create_trainees,
        assign_follow_up: data?.pendinglist?.assign_follow_up,
        assign_trainer: data?.pendinglist?.assign_trainer,
        assign_level: data?.pendinglist?.assign_level,
        view_trainees: data?.pendinglist?.view_trainees,
        view_follow_up: data?.pendinglist?.view_follow_up,
        view_trainers: data?.pendinglist?.view_trainers,
        view_levels: data?.pendinglist?.view_levels,
        view_own_trainees: data?.pendinglist?.view_own_trainees,
        view_own_follow_up: data?.pendinglist?.view_own_follow_up,
        view_own_trainers: data?.pendinglist?.view_own_trainers,
        view_own_levels: data?.pendinglist?.view_own_levels,
        update_trainees: data?.pendinglist?.update_trainees,
        update_all_trainers: data?.pendinglist?.update_all_trainers,
        update_all_levels: data?.pendinglist?.update_all_levels,
        update_own_trainees: data?.pendinglist?.update_own_trainees,
        update_own_trainers: data?.pendinglist?.update_own_trainers,
        update_own_levels: data?.pendinglist?.update_own_levels,
        delete_trainees: data?.pendinglist?.delete_trainees,
        delete_own_trainees: data?.pendinglist?.delete_own_trainees,
      });

      setHoldlist({
        update_trainees_by_branch: data?.holdlist?.update_trainees_by_branch,
        view_trainees_by_branch: data?.holdlist?.view_trainees_by_branch,
        delete_trainees_by_branch: data?.holdlist?.delete_trainees_by_branch,
        move_to_wait_by_branch: data?.holdlist?.move_to_wait_by_branch,

        move_to_wait: data?.holdlist?.move_to_wait,
        assign_trainer: data?.holdlist?.assign_trainer,
        assign_level: data?.holdlist?.assign_level,
        view_trainees: data?.holdlist?.view_trainees,
        view_trainers: data?.holdlist?.view_trainers,
        view_levels: data?.holdlist?.view_levels,
        view_own_trainees: data?.holdlist?.view_own_trainees,
        view_own_trainers: data?.holdlist?.view_own_trainers,
        view_own_levels: data?.holdlist?.view_own_levels,
        update_trainees: data?.holdlist?.update_trainees,
        update_all_trainers: data?.holdlist?.update_all_trainers,
        update_all_levels: data?.holdlist?.update_all_levels,
        update_own_trainees: data?.holdlist?.update_own_trainees,
        update_own_trainers: data?.holdlist?.update_own_trainers,
        update_own_levels: data?.holdlist?.update_own_levels,
        delete_trainees: data?.holdlist?.delete_trainees,
        delete_own_trainees: data?.holdlist?.delete_own_trainees,
      });

      setRefundlist({
        update_trainees_by_branch: data?.refundlist?.update_trainees_by_branch,
        view_trainees_by_branch: data?.refundlist?.view_trainees_by_branch,
        delete_trainees_by_branch: data?.refundlist?.delete_trainees_by_branch,
        move_to_wait_by_branch: data?.refundlist?.move_to_wait_by_branch,
        move_to_wait: data?.refundlist?.move_to_wait,
        assign_trainer: data?.refundlist?.assign_trainer,
        assign_level: data?.refundlist?.assign_level,
        view_trainees: data?.refundlist?.view_trainees,
        view_trainers: data?.refundlist?.view_trainers,
        view_levels: data?.refundlist?.view_levels,
        view_own_trainees: data?.refundlist?.view_own_trainees,
        view_own_trainers: data?.refundlist?.view_own_trainers,
        view_own_levels: data?.refundlist?.view_own_levels,
        update_trainees: data?.refundlist?.update_trainees,
        update_all_trainers: data?.refundlist?.update_all_trainers,
        update_all_levels: data?.refundlist?.update_all_levels,
        update_own_trainees: data?.refundlist?.update_own_trainees,
        update_own_trainers: data?.refundlist?.update_own_trainers,
        update_own_levels: data?.refundlist?.update_own_levels,
        delete_trainees: data?.refundlist?.delete_trainees,
        delete_own_trainees: data?.refundlist?.delete_own_trainees,
      });

      setBlacklist({
        update_trainees_by_branch: data?.blacklist?.update_trainees_by_branch,
        view_trainees_by_branch: data?.blacklist?.view_trainees_by_branch,
        delete_trainees_by_branch: data?.blacklist?.delete_trainees_by_branch,
        move_to_wait_by_branch: data?.blacklist?.move_to_wait_by_branch,

        move_to_wait: data?.blacklist?.move_to_wait,
        assign_trainer: data?.blacklist?.assign_trainer,
        assign_level: data?.blacklist?.assign_level,
        view_trainees: data?.blacklist?.view_trainees,
        view_trainers: data?.blacklist?.view_trainers,
        view_levels: data?.blacklist?.view_levels,
        view_own_trainees: data?.blacklist?.view_own_trainees,
        view_own_trainers: data?.blacklist?.view_own_trainers,
        view_own_levels: data?.blacklist?.view_own_levels,
        update_trainees: data?.blacklist?.update_trainees,
        update_all_trainers: data?.blacklist?.update_all_trainers,
        update_all_levels: data?.blacklist?.update_all_levels,
        update_own_trainees: data?.blacklist?.update_own_trainees,
        update_own_trainers: data?.blacklist?.update_own_trainers,
        update_own_levels: data?.blacklist?.update_own_levels,
        delete_trainees: data?.blacklist?.delete_trainees,
        delete_own_trainees: data?.blacklist?.delete_own_trainees,
      });

      setBatches({
        create_batches_by_branch: data?.batches?.create_batches_by_branch,
        update_batches_by_branch: data?.batches?.update_batches_by_branch,
        view_batches_by_branch: data?.batches?.view_batches_by_branch,
        activate_batches_by_branch: data?.batches?.activate_batches_by_branch,
        end_batches_by_branch: data?.batches?.end_batches_by_branch,
        delete_batches_by_branch: data?.batches?.delete_batches_by_branch,

        activate_batches: data?.batches?.activate_batches,
        activate_own_batches: data?.batches?.activate_own_batches,
        end_batches: data?.batches?.end_batches,
        end_own_batches: data?.batches?.end_own_batches,
        create_batches: data?.batches?.create_batches,
        view_batches: data?.batches?.view_batches,
        view_own_batches: data?.batches?.view_own_batches,
        update_batches: data?.batches?.update_batches,
        update_own_batches: data?.batches?.update_own_batches,
        delete_batches: data?.batches?.delete_batches,
        delete_own_batches: data?.batches?.delete_own_batches,
      });

      setClasses({
        create_classes_by_branch: data?.classes?.create_classes_by_branch,
        update_classes_by_branch: data?.classes?.update_classes_by_branch,
        view_classes_by_branch: data?.classes?.view_classes_by_branch,
        delete_classes_by_branch: data?.classes?.delete_classes_by_branch,
        add_trainer_note_by_branch: data?.classes?.add_trainer_note_by_branch,
        add_admin_note_by_branch: data?.classes?.add_admin_note_by_branch,
        switch_class_by_branch: data?.classes?.switch_class_by_branch,
        move_to_wait_by_branch: data?.classes?.move_to_wait_by_branch,
        move_to_hold_by_branch: data?.classes?.move_to_hold_by_branch,
        move_to_refund_by_branch: data?.classes?.move_to_refund_by_branch,
        move_to_blacklist_by_branch: data?.classes?.move_to_blacklist_by_branch,

        add_trainer_note: data?.classes?.add_trainer_note,
        add_own_trainer_note: data?.classes?.add_own_trainer_note,
        add_admin_note: data?.classes?.add_admin_note,
        add_to_attendance: data?.classes?.add_to_attendance,
        switch_class: data?.classes?.switch_class,
        move_to_wait: data?.classes?.move_to_wait,
        move_to_hold: data?.classes?.move_to_hold,
        move_to_refund: data?.classes?.move_to_refund,
        move_to_blacklist: data?.classes?.move_to_blacklist,
        create_classes: data?.classes?.create_classes,
        view_classes: data?.classes?.view_classes,
        view_own_classes: data?.classes?.view_own_classes,
        update_classes: data?.classes?.update_classes,
        update_own_classes: data?.classes?.update_own_classes,
        delete_classes: data?.classes?.delete_classes,
        delete_own_classes: data?.classes?.delete_own_classes,
      });

      setAttendance({
        view_attendance_by_branch: data?.attendance?.view_attendance_by_branch,
        add_session_notes_by_branch:
          data?.attendance?.add_session_notes_by_branch,
        view_session_notes_by_branch:
          data?.attendance?.view_session_notes_by_branch,

        view_attendance: data?.attendance?.view_attendance,
        view_trainer_attendance: data?.attendance?.view_trainer_attendance,
        add_session_notes: data?.attendance?.add_session_notes,
        view_session_notes: data?.attendance?.view_session_notes,
        add_own_session_notes: data?.attendance?.add_own_session_notes,
        view_own_session_notes: data?.attendance?.view_own_session_notes,
      });

      setAnnouncements({
        create_announcement: data?.announcements?.create_announcement,
        reply_to_announcement: data?.announcements?.reply_to_announcement,
        view_announcement: data?.announcements?.view_announcement,
        view_announcement_replies:
          data?.announcements?.view_announcement_replies,
        update_announcement: data?.announcements?.update_announcement,
        delete_announcement: data?.announcements?.delete_announcement,
      });

      setSettings({
        view_settings: data?.settings?.view_settings,
        update_settings: data?.settings?.update_settings,
      });

      setNotification({
        create_branch: data?.notification?.create_branch,
        update_branch: data?.notification?.update_branch,
        delete_branch: data?.notification?.delete_branch,
        create_role: data?.notification?.create_role,
        update_role: data?.notification?.update_role,
        delete_role: data?.notification?.delete_role,
        create_users: data?.notification?.create_users,
        update_users: data?.notification?.update_users,
        delete_users: data?.notification?.delete_users,
        activate_pending_users: data?.notification?.activate_pending_users,
        delete_pending_users: data?.notification?.delete_pending_users,
        create_trainees_in_waitlist:
          data?.notification?.create_trainees_in_waitlist,
        update_trainees_in_waitlist:
          data?.notification?.update_trainees_in_waitlist,
        delete_trainees_from_waitlist:
          data?.notification?.delete_trainees_from_waitlist,
        assign_class: data?.notification?.assign_class,
        move_trainee_from_wait_to_hold:
          data?.notification?.move_trainee_from_wait_to_hold,
        move_trainee_from_wait_to_refund:
          data?.notification?.move_trainee_from_wait_to_refund,
        move_trainee_from_wait_to_blacklist:
          data?.notification?.move_trainee_from_wait_to_blacklist,
        create_trainees_in_pendinglist:
          data?.notification?.create_trainees_in_pendinglist,
        update_trainees_in_pendinglist:
          data?.notification?.update_trainees_in_pendinglist,
        delete_trainees_from_pendinglist:
          data?.notification?.delete_trainees_from_pendinglist,
        assign_level: data?.notification?.assign_level,
        assign_trainer: data?.notification?.assign_trainer,
        update_trainees_in_holdlist:
          data?.notification?.update_trainees_in_holdlist,
        delete_trainees_from_holdlist:
          data?.notification?.delete_trainees_from_holdlist,
        move_trainee_from_hold_to_wait:
          data?.notification?.move_trainee_from_hold_to_wait,
        update_trainees_in_refundlist:
          data?.notification?.update_trainees_in_refundlist,
        delete_trainees_from_refundlist:
          data?.notification?.delete_trainees_from_refundlist,
        move_trainee_from_refund_to_wait:
          data?.notification?.move_trainee_from_refund_to_wait,
        update_trainees_in_blacklist:
          data?.notification?.update_trainees_in_blacklist,
        delete_trainees_from_blacklist:
          data?.notification?.delete_trainees_from_blacklist,
        move_trainee_from_black_to_wait:
          data?.notification?.move_trainee_from_black_to_wait,
        create_batches: data?.notification?.create_batches,
        update_batches: data?.notification?.update_batches,
        delete_batches: data?.notification?.delete_batches,
        activate_batches: data?.notification?.activate_batches,
        end_batches: data?.notification?.end_batches,
        create_classes: data?.notification?.create_classes,
        update_classes: data?.notification?.update_classes,
        delete_classes: data?.notification?.delete_classes,
        move_from_class_to_wait: data?.notification?.move_from_class_to_wait,
        move_from_class_to_hold: data?.notification?.move_from_class_to_hold,
        move_from_class_to_refund:
          data?.notification?.move_from_class_to_refund,
        move_from_class_to_black: data?.notification?.move_from_class_to_black,
        switch_class: data?.notification?.switch_class,
        add_trainer_note: data?.notification?.add_trainer_note,
        add_admin_note: data?.notification?.add_admin_note,
        add_session_notes: data?.notification?.add_session_notes,
        create_announcement: data?.notification?.create_announcement,
        reply_to_announcement: data?.notification?.reply_to_announcement,
        update_announcement: data?.notification?.update_announcement,
        delete_announcement: data?.notification?.delete_announcement,
        update_settings: data?.notification?.update_settings,
      });
    }
  }, [data]);

  return (
    <Box
      component="form"
      onSubmit={handlerSubmitted}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
        margin: "20px 0 0",
      }}
    >
      <FullName
        id="title_role"
        label="Title Role"
        value={title_role}
        setValue={setTitleRole}
        icon={""}
      />

      {/* Settings Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Settings</p>
          <CheckBox
            id="settings"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setSettings)
            }
            defaultChecked={
              settings?.view_settings || settings?.update_settings
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="view_settings"
            label="View Settings"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setSettings)
            }
            defaultChecked={settings?.view_settings}
          />
          <CheckBox
            name="update_settings"
            label="Update Settings"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setSettings)
            }
            defaultChecked={settings?.update_settings}
          />
        </FormGroup>
      </div>

      {/* General Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>General</p>
          <CheckBox
            id="generalAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setGeneral)
            }
            defaultChecked={
              general?.show_follow_up_list || general?.show_trainers_list
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="show_follow_up_list"
            label="Show in Admin List"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setGeneral)
            }
            defaultChecked={general?.show_follow_up_list}
          />
          <CheckBox
            name="show_trainers_list"
            label="Show in Trainer List"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setGeneral)
            }
            defaultChecked={general?.show_trainers_list}
          />
        </FormGroup>
      </div>

      {/* Branches Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Branches</p>
          <CheckBox
            id="branchesAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setBranches)
            }
            defaultChecked={
              branches?.create_branch ||
              branches?.view_branches ||
              branches?.update_branch ||
              branches?.delete_branch
            }
          />
        </div>

        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_branch"
            label="Create Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBranches)
            }
            defaultChecked={branches?.create_branch}
          />
          <CheckBox
            name="view_branches"
            label="View Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBranches)
            }
            defaultChecked={branches?.view_branches}
          />
          <CheckBox
            name="update_branch"
            label="Update Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBranches)
            }
            defaultChecked={branches?.update_branch}
          />
          <CheckBox
            name="delete_branch"
            label="Delete Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBranches)
            }
            defaultChecked={branches?.delete_branch}
          />
        </FormGroup>
      </div>

      {/* Roles Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Roles</p>
          <CheckBox
            id="rolesAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setRoles)
            }
            defaultChecked={
              roles?.create_role ||
              roles?.view_roles ||
              roles?.view_permissions ||
              roles?.update_role ||
              roles?.delete_role
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_role"
            label="create Role"
            handlePermissionChange={(e) => handlePermissionChange(e, setRoles)}
            defaultChecked={roles?.create_role}
          />
          <CheckBox
            name="view_roles"
            label="View Roles"
            handlePermissionChange={(e) => handlePermissionChange(e, setRoles)}
            defaultChecked={roles?.view_roles}
          />
          <CheckBox
            name="view_permissions"
            label="View Permissions"
            handlePermissionChange={(e) => handlePermissionChange(e, setRoles)}
            defaultChecked={roles?.view_permissions}
          />
          <CheckBox
            name="update_role"
            label="Update Roles"
            handlePermissionChange={(e) => handlePermissionChange(e, setRoles)}
            defaultChecked={roles?.update_role}
          />
          <CheckBox
            name="delete_role"
            label="Delete Roles"
            handlePermissionChange={(e) => handlePermissionChange(e, setRoles)}
            defaultChecked={roles?.delete_role}
          />
        </FormGroup>
      </div>

      {/* Users Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Users</p>
          <CheckBox
            id="usersAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setUsers)
            }
            defaultChecked={
              users?.create_users_by_branch ||
              users?.update_users_by_branch ||
              users?.view_users_by_branch ||
              users?.delete_users_by_branch ||
              users?.view_self_branch ||
              users?.update_self_branch ||
              users?.create_users ||
              users?.assign_user_role ||
              users?.assign_user_status ||
              users?.view_users ||
              users?.view_roles ||
              users?.view_status ||
              users?.view_own_users ||
              users?.view_self ||
              users?.view_self_role ||
              users?.view_self_status ||
              users?.update_users ||
              users?.update_all_roles ||
              users?.update_all_status ||
              users?.update_own_users ||
              users?.update_own_role ||
              users?.update_own_status ||
              users?.update_self ||
              users?.update_self_role ||
              users?.update_self_status ||
              users?.delete_users ||
              users?.delete_own_users ||
              users?.delete_self
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_users_by_branch"
            label="Create Users By Branch"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.create_users_by_branch}
          />
          <CheckBox
            name="update_users_by_branch"
            label="Update Users By Branch"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_users_by_branch}
          />
          <CheckBox
            name="view_users_by_branch"
            label="View Users By Branch"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_users_by_branch}
          />
          <CheckBox
            name="delete_users_by_branch"
            label="Delete Users By Branch"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.delete_users_by_branch}
          />
          <CheckBox
            name="view_self_branch"
            label="View self branch"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_self_branch}
          />
          <CheckBox
            name="update_self_branch"
            label="Update self branch"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_self_branch}
          />
          <CheckBox
            name="create_users"
            label="Create Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.create_users}
          />
          <CheckBox
            name="assign_user_role"
            label="Assign User Role"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.assign_user_role}
          />
          <CheckBox
            name="assign_user_status"
            label="Assign User Status"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.assign_user_status}
          />
          <CheckBox
            name="view_users"
            label="View Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_users}
          />
          <CheckBox
            name="view_roles"
            label="View Roles"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_roles}
          />
          <CheckBox
            name="view_status"
            label="View Status"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_status}
          />
          <CheckBox
            name="view_own_users"
            label="View Own Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_own_users}
          />
          <CheckBox
            name="view_self"
            label="View Self"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_self}
          />
          <CheckBox
            name="view_self_status"
            label="View Self Status"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_self_status}
          />
          <CheckBox
            name="view_self_role"
            label="View Self Roles"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.view_self_role}
          />
          <CheckBox
            name="update_users"
            label="Update Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_users}
          />
          <CheckBox
            name="update_all_roles"
            label="Update Roles for All Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_all_roles}
          />
          <CheckBox
            name="update_all_status"
            label="Update Status for All Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_all_status}
          />
          <CheckBox
            name="update_own_users"
            label="Update Own Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_own_users}
          />
          <CheckBox
            name="update_own_role"
            label="Update Own Role"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_own_role}
          />
          <CheckBox
            name="update_own_status"
            label="Update Own Status"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_own_status}
          />
          <CheckBox
            name="update_self"
            label="Update Self"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_self}
          />
          <CheckBox
            name="update_self_role"
            label="Update Self Role"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_self_role}
          />
          <CheckBox
            name="update_self_status"
            label="Update Self Status"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.update_self_status}
          />
          <CheckBox
            name="delete_users"
            label="Delete Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.delete_users}
          />
          <CheckBox
            name="delete_own_users"
            label="Delete Own Users"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.delete_own_users}
          />
          <CheckBox
            name="delete_self"
            label="Delete Self"
            handlePermissionChange={(e) => handlePermissionChange(e, setUsers)}
            defaultChecked={users?.delete_self}
          />
        </FormGroup>
      </div>

      {/* Pending Users Role  */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Pending Users</p>
          <CheckBox
            id="pendingusersAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setPendingusers)
            }
            defaultChecked={
              pendingusers?.activate_users_by_branch ||
              pendingusers?.view_pending_users_by_branch ||
              pendingusers?.delete_pending_users_by_branch ||
              pendingusers?.assign_activate ||
              pendingusers?.view_pending_users ||
              pendingusers?.delete_pending_users
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="activate_users_by_branch"
            label="Activate users by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendingusers)
            }
            defaultChecked={pendingusers?.activate_users_by_branch}
          />
          <CheckBox
            name="view_pending_users_by_branch"
            label="View pending users by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendingusers)
            }
            defaultChecked={pendingusers?.view_pending_users_by_branch}
          />
          <CheckBox
            name="delete_pending_users_by_branch"
            label="Delete pending users by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendingusers)
            }
            defaultChecked={pendingusers?.delete_pending_users_by_branch}
          />
          <CheckBox
            name="assign_activate"
            label="Assign User to Active"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendingusers)
            }
            defaultChecked={pendingusers?.assign_activate}
          />
          <CheckBox
            name="view_pending_users"
            label="View Pending Users"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendingusers)
            }
            defaultChecked={pendingusers?.view_pending_users}
          />
          <CheckBox
            name="delete_pending_users"
            label="Delete Pending Users"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendingusers)
            }
            defaultChecked={pendingusers?.delete_pending_users}
          />
        </FormGroup>
      </div>

      {/* WaitList Role  */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Wait List</p>
          <CheckBox
            id="waitlistAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setWaitlist)
            }
            defaultChecked={
              waitlist?.create_trainees_by_branch ||
              waitlist?.update_trainees_by_branch ||
              waitlist?.view_trainees_by_branch ||
              waitlist?.delete_trainees_by_branch ||
              waitlist?.move_to_hold_by_branch ||
              waitlist?.move_to_blacklist_by_branch ||
              waitlist?.move_to_refund_by_branch ||
              waitlist?.assign_class_by_branch ||
              waitlist?.move_to_hold ||
              waitlist?.move_to_blacklist ||
              waitlist?.move_to_refund ||
              waitlist?.create_trainees ||
              waitlist?.assign_class ||
              waitlist?.assign_trainer ||
              waitlist?.assign_level ||
              waitlist?.view_trainees ||
              waitlist?.view_trainers ||
              waitlist?.view_levels ||
              waitlist?.view_own_trainees ||
              waitlist?.view_own_trainers ||
              waitlist?.view_own_levels ||
              waitlist?.update_trainees ||
              waitlist?.update_all_trainers ||
              waitlist?.update_all_levels ||
              waitlist?.update_own_trainees ||
              waitlist?.update_own_trainers ||
              waitlist?.update_own_levels ||
              waitlist?.delete_trainees ||
              waitlist?.delete_own_trainees
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_trainees_by_branch"
            label="Create trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.create_trainees_by_branch}
          />
          <CheckBox
            name="update_trainees_by_branch"
            label="Update trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.update_trainees_by_branch}
          />
          <CheckBox
            name="view_trainees_by_branch"
            label="View trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.view_trainees_by_branch}
          />
          <CheckBox
            name="delete_trainees_by_branch"
            label="Delete trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.delete_trainees_by_branch}
          />
          <CheckBox
            name="move_to_hold_by_branch"
            label="Move to holdlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.move_to_hold_by_branch}
          />
          <CheckBox
            name="move_to_blacklist_by_branch"
            label="Move to blacklist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.move_to_blacklist_by_branch}
          />
          <CheckBox
            name="move_to_refund_by_branch"
            label="Move to refundlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.move_to_refund_by_branch}
          />
          <CheckBox
            name="assign_class_by_branch"
            label="Assign Class by Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.assign_class_by_branch}
          />
          <CheckBox
            name="move_to_hold"
            label="Move to HoldList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.move_to_hold}
          />
          <CheckBox
            name="move_to_blacklist"
            label="Move to Blacklist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.move_to_blacklist}
          />
          <CheckBox
            name="move_to_refund"
            label="Move to RefundList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.move_to_refund}
          />
          <CheckBox
            name="create_trainees"
            label="Create Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.create_trainees}
          />
          <CheckBox
            name="assign_class"
            label="Assign Class"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.assign_class}
          />
          <CheckBox
            name="assign_trainer"
            label="Assign Trainer"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.assign_trainer}
          />
          <CheckBox
            name="assign_level"
            label="Assign Level"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.assign_level}
          />
          <CheckBox
            name="view_trainees"
            label="View Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.view_trainees}
          />
          <CheckBox
            name="view_trainers"
            label="View Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.view_trainers}
          />
          <CheckBox
            name="view_levels"
            label="View Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.view_levels}
          />
          <CheckBox
            name="view_own_trainees"
            label="View Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.view_own_trainees}
          />
          <CheckBox
            name="view_own_trainers"
            label="View Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.view_own_trainers}
          />
          <CheckBox
            name="view_own_levels"
            label="View Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.view_own_levels}
          />
          <CheckBox
            name="update_trainees"
            label="Update Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.update_trainees}
          />
          <CheckBox
            name="update_all_trainers"
            label="Update All Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.update_all_trainers}
          />
          <CheckBox
            name="update_all_levels"
            label="Update All Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.update_all_levels}
          />
          <CheckBox
            name="update_own_trainees"
            label="Update Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.update_own_trainees}
          />
          <CheckBox
            name="update_own_trainers"
            label="Update Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.update_own_trainers}
          />
          <CheckBox
            name="update_own_levels"
            label="Update Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.update_own_levels}
          />
          <CheckBox
            name="delete_trainees"
            label="Delete Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.delete_trainees}
          />
          <CheckBox
            name="delete_own_trainees"
            label="Delete Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setWaitlist)
            }
            defaultChecked={waitlist?.delete_own_trainees}
          />
        </FormGroup>
      </div>

      {/* Trainees Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Trainees</p>
          <CheckBox
            id="trainees"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setTrainees)
            }
            defaultChecked={
              trainees?.view_trainees || trainees?.view_trainees_by_branch
            }
          />
        </div>

        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="view_trainees"
            label="View Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setTrainees)
            }
            defaultChecked={trainees?.view_trainees}
          />
          <CheckBox
            name="view_trainees_by_branch"
            label="View trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setTrainees)
            }
            defaultChecked={trainees?.view_trainees_by_branch}
          />
        </FormGroup>
      </div>

      {/* Pending Test List Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Pending Test List</p>
          <CheckBox
            id="pendinglistAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setPendinglist)
            }
            defaultChecked={
              pendinglist?.create_trainees_by_branch ||
              pendinglist?.update_trainees_by_branch ||
              pendinglist?.view_trainees_by_branch ||
              pendinglist?.delete_trainees_by_branch ||
              pendinglist?.assign_trainer_by_branch ||
              pendinglist?.assign_level_by_branch ||
              pendinglist?.create_trainees ||
              pendinglist?.assign_follow_up ||
              pendinglist?.assign_trainer ||
              pendinglist?.assign_level ||
              pendinglist?.view_trainees ||
              pendinglist?.view_follow_up ||
              pendinglist?.view_trainers ||
              pendinglist?.view_levels ||
              pendinglist?.view_own_trainees ||
              pendinglist?.view_own_follow_up ||
              pendinglist?.view_own_trainers ||
              pendinglist?.view_own_levels ||
              pendinglist?.update_trainees ||
              pendinglist?.update_all_trainers ||
              pendinglist?.update_all_levels ||
              pendinglist?.update_own_trainees ||
              pendinglist?.update_own_trainers ||
              pendinglist?.update_own_levels ||
              pendinglist?.delete_trainees ||
              pendinglist?.delete_own_trainees
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_trainees_by_branch"
            label="Create trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.create_trainees_by_branch}
          />
          <CheckBox
            name="update_trainees_by_branch"
            label="Update trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.update_trainees_by_branch}
          />
          <CheckBox
            name="view_trainees_by_branch"
            label="View trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_trainees_by_branch}
          />
          <CheckBox
            name="delete_trainees_by_branch"
            label="Delete trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.delete_trainees_by_branch}
          />
          <CheckBox
            name="assign_trainer_by_branch"
            label="Assign Trainer by Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.assign_trainer_by_branch}
          />
          <CheckBox
            name="assign_level_by_branch"
            label="Assign level by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.assign_level_by_branch}
          />
          <CheckBox
            name="create_trainees"
            label="Create Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.create_trainees}
          />
          <CheckBox
            name="assign_follow_up"
            label="Assign Admin"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.assign_follow_up}
          />
          <CheckBox
            name="assign_trainer"
            label="Assign Trainer"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.assign_trainer}
          />
          <CheckBox
            name="assign_level"
            label="Assign Level"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.assign_level}
          />
          <CheckBox
            name="view_trainees"
            label="View Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_trainees}
          />
          <CheckBox
            name="view_follow_up"
            label="View Admins"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_follow_up}
          />
          <CheckBox
            name="view_trainers"
            label="View Trainers "
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_trainers}
          />
          <CheckBox
            name="view_levels"
            label="View Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_levels}
          />
          <CheckBox
            name="view_own_trainees"
            label="View Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_own_trainees}
          />
          <CheckBox
            name="view_own_follow_up"
            label="View Own Admins"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_own_follow_up}
          />
          <CheckBox
            name="view_own_trainers"
            label="View Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_own_trainers}
          />
          <CheckBox
            name="view_own_levels"
            label="View Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.view_own_levels}
          />
          <CheckBox
            name="update_trainees"
            label="Update Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.update_trainees}
          />
          <CheckBox
            name="update_all_trainers"
            label="Update All Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.update_all_trainers}
          />
          <CheckBox
            name="update_all_levels"
            label="Update All Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.update_all_levels}
          />
          <CheckBox
            name="update_own_trainees"
            label="Update Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.update_own_trainees}
          />
          <CheckBox
            name="update_own_trainers"
            label="Update Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.update_own_trainers}
          />
          <CheckBox
            name="update_own_levels"
            label="Update Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.update_own_levels}
          />
          <CheckBox
            name="delete_trainees"
            label="Delete Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.delete_trainees}
          />
          <CheckBox
            name="delete_own_trainees"
            label="Delete Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setPendinglist)
            }
            defaultChecked={pendinglist?.delete_own_trainees}
          />
        </FormGroup>
      </div>

      {/* HoldList Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Hold List</p>
          <CheckBox
            id="holdlistAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setHoldlist)
            }
            defaultChecked={
              holdlist?.update_trainees_by_branch ||
              holdlist?.view_trainees_by_branch ||
              holdlist?.delete_trainees_by_branch ||
              holdlist?.move_to_wait_by_branch ||
              holdlist?.assign_trainer ||
              holdlist?.assign_level ||
              holdlist?.view_trainees ||
              holdlist?.view_trainers ||
              holdlist?.view_levels ||
              holdlist?.view_own_trainees ||
              holdlist?.view_own_trainers ||
              holdlist?.view_own_levels ||
              holdlist?.update_trainees ||
              holdlist?.update_all_trainers ||
              holdlist?.update_all_levels ||
              holdlist?.update_own_trainees ||
              holdlist?.update_own_trainers ||
              holdlist?.update_own_levels ||
              holdlist?.delete_trainees ||
              holdlist?.delete_own_trainees
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="update_trainees_by_branch"
            label="Update trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.update_trainees_by_branch}
          />
          <CheckBox
            name="view_trainees_by_branch"
            label="View trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.view_trainees_by_branch}
          />
          <CheckBox
            name="delete_trainees_by_branch"
            label="Delete trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.delete_trainees_by_branch}
          />
          <CheckBox
            name="move_to_wait_by_branch"
            label="Move to waitlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.move_to_wait_by_branch}
          />
          <CheckBox
            name="move_to_wait"
            label="Move to waitlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.move_to_wait}
          />
          <CheckBox
            name="assign_trainer"
            label="Assign Trainer"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.assign_trainer}
          />
          <CheckBox
            name="assign_level"
            label="Assign Level"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.assign_level}
          />
          <CheckBox
            name="view_trainees"
            label="View Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.view_trainees}
          />
          <CheckBox
            name="view_trainers"
            label="View Trainers "
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.view_trainers}
          />
          <CheckBox
            name="view_levels"
            label="View Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.view_levels}
          />
          <CheckBox
            name="view_own_trainees"
            label="View Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.view_own_trainees}
          />
          <CheckBox
            name="view_own_trainers"
            label="View Own Trainers "
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.view_own_trainers}
          />
          <CheckBox
            name="view_own_levels"
            label="View Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.view_own_levels}
          />
          <CheckBox
            name="update_trainees"
            label="Update Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.update_trainees}
          />
          <CheckBox
            name="update_all_trainers"
            label="Update All Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.update_all_trainers}
          />
          <CheckBox
            name="update_all_levels"
            label="Update All Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.update_all_levels}
          />
          <CheckBox
            name="update_own_trainees"
            label="Update Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.update_own_trainees}
          />
          <CheckBox
            name="update_own_trainers"
            label="Update Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.update_own_trainers}
          />
          <CheckBox
            name="update_own_levels"
            label="Update Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.update_own_levels}
          />
          <CheckBox
            name="delete_trainees"
            label="Delete Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.delete_trainees}
          />
          <CheckBox
            name="delete_own_trainees"
            label="Delete Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setHoldlist)
            }
            defaultChecked={holdlist?.delete_own_trainees}
          />
        </FormGroup>
      </div>

      {/* RefundList Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Refund List</p>
          <CheckBox
            id="refundlistAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setRefundlist)
            }
            defaultChecked={
              refundlist?.update_trainees_by_branch ||
              refundlist?.view_trainees_by_branch ||
              refundlist?.delete_trainees_by_branch ||
              refundlist?.move_to_wait_by_branch ||
              refundlist?.assign_trainer ||
              refundlist?.assign_level ||
              refundlist?.view_trainees ||
              refundlist?.view_trainers ||
              refundlist?.view_levels ||
              refundlist?.view_own_trainees ||
              refundlist?.view_own_trainers ||
              refundlist?.view_own_levels ||
              refundlist?.update_trainees ||
              refundlist?.update_all_trainers ||
              refundlist?.update_all_levels ||
              refundlist?.update_own_trainees ||
              refundlist?.update_own_trainers ||
              refundlist?.update_own_levels ||
              refundlist?.delete_trainees ||
              refundlist?.delete_own_trainees
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="update_trainees_by_branch"
            label="Update trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.update_trainees_by_branch}
          />
          <CheckBox
            name="view_trainees_by_branch"
            label="View trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.view_trainees_by_branch}
          />
          <CheckBox
            name="delete_trainees_by_branch"
            label="Delete trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.delete_trainees_by_branch}
          />
          <CheckBox
            name="move_to_wait_by_branch"
            label="Move to waitlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.move_to_wait_by_branch}
          />
          <CheckBox
            name="move_to_wait"
            label="Move to waitlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.move_to_wait}
          />
          <CheckBox
            name="assign_trainer"
            label="Assign Trainer"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.assign_trainer}
          />
          <CheckBox
            name="assign_level"
            label="Assign Level"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.assign_level}
          />
          <CheckBox
            name="view_trainees"
            label="View Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.view_trainees}
          />
          <CheckBox
            name="view_trainers"
            label="View Trainers "
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.view_trainers}
          />
          <CheckBox
            name="view_levels"
            label="View Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.view_levels}
          />
          <CheckBox
            name="view_own_trainees"
            label="View Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.view_own_trainees}
          />
          <CheckBox
            name="view_own_trainers"
            label="View Own Trainers "
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.view_own_trainers}
          />
          <CheckBox
            name="view_own_levels"
            label="View Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.view_own_levels}
          />
          <CheckBox
            name="update_trainees"
            label="Update Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.update_trainees}
          />
          <CheckBox
            name="update_all_trainers"
            label="Update All Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.update_all_trainers}
          />
          <CheckBox
            name="update_all_levels"
            label="Update All Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.update_all_levels}
          />
          <CheckBox
            name="update_own_trainees"
            label="Update Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.update_own_trainees}
          />
          <CheckBox
            name="update_own_trainers"
            label="Update Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.update_own_trainers}
          />
          <CheckBox
            name="update_own_levels"
            label="Update Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.update_own_levels}
          />
          <CheckBox
            name="delete_trainees"
            label="Delete Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.delete_trainees}
          />
          <CheckBox
            name="delete_own_trainees"
            label="Delete Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setRefundlist)
            }
            defaultChecked={refundlist?.delete_own_trainees}
          />
        </FormGroup>
      </div>

      {/* BlackList Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Black List</p>
          <CheckBox
            id="blacklistAll"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setBlacklist)
            }
            defaultChecked={
              blacklist?.update_trainees_by_branch ||
              blacklist?.view_trainees_by_branch ||
              blacklist?.delete_trainees_by_branch ||
              blacklist?.move_to_wait_by_branch ||
              blacklist?.assign_trainer ||
              blacklist?.assign_level ||
              blacklist?.view_trainees ||
              blacklist?.view_trainers ||
              blacklist?.view_levels ||
              blacklist?.view_own_trainees ||
              blacklist?.view_own_trainers ||
              blacklist?.view_own_levels ||
              blacklist?.update_trainees ||
              blacklist?.update_all_trainers ||
              blacklist?.update_all_levels ||
              blacklist?.update_own_trainees ||
              blacklist?.update_own_trainers ||
              blacklist?.update_own_levels ||
              blacklist?.delete_trainees ||
              blacklist?.delete_own_trainees
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="update_trainees_by_branch"
            label="Update trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.update_trainees_by_branch}
          />
          <CheckBox
            name="view_trainees_by_branch"
            label="View trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.view_trainees_by_branch}
          />
          <CheckBox
            name="delete_trainees_by_branch"
            label="Delete trainees by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.delete_trainees_by_branch}
          />
          <CheckBox
            name="move_to_wait_by_branch"
            label="Move to waitlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.move_to_wait_by_branch}
          />
          <CheckBox
            name="move_to_wait"
            label="Move to waitlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.move_to_wait}
          />
          <CheckBox
            name="assign_trainer"
            label="Assign Trainer"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.assign_trainer}
          />
          <CheckBox
            name="assign_level"
            label="Assign Level"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.assign_level}
          />
          <CheckBox
            name="view_trainees"
            label="View Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.view_trainees}
          />
          <CheckBox
            name="view_trainers"
            label="View Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.view_trainers}
          />
          <CheckBox
            name="view_levels"
            label="View Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.view_levels}
          />
          <CheckBox
            name="view_own_trainees"
            label="View Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.view_own_trainees}
          />
          <CheckBox
            name="view_own_trainers"
            label="View Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.view_own_trainers}
          />
          <CheckBox
            name="view_own_levels"
            label="View Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.view_own_levels}
          />
          <CheckBox
            name="update_trainees"
            label="Update Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.update_trainees}
          />
          <CheckBox
            name="update_all_trainers"
            label="Update All Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.update_all_trainers}
          />
          <CheckBox
            name="update_all_levels"
            label="Update All Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.update_all_levels}
          />
          <CheckBox
            name="update_own_trainees"
            label="Update Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.update_own_trainees}
          />
          <CheckBox
            name="update_own_trainers"
            label="Update Own Trainers"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.update_own_trainers}
          />
          <CheckBox
            name="update_own_levels"
            label="Update Own Levels"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.update_own_levels}
          />
          <CheckBox
            name="delete_trainees"
            label="Delete Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.delete_trainees}
          />
          <CheckBox
            name="delete_own_trainees"
            label="Delete Own Trainees"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBlacklist)
            }
            defaultChecked={blacklist?.delete_own_trainees}
          />
        </FormGroup>
      </div>

      {/* batches Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Batches</p>
          <CheckBox
            id="batches"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setBatches)
            }
            defaultChecked={
              batches?.create_batches_by_branch ||
              batches?.update_batches_by_branch ||
              batches?.view_batches_by_branch ||
              batches?.activate_batches_by_branch ||
              batches?.end_batches_by_branch ||
              batches?.delete_batches_by_branch ||
              batches?.activate_batches ||
              batches?.activate_own_batches ||
              batches?.end_batches ||
              batches?.end_own_batches ||
              batches?.create_batches ||
              batches?.view_batches ||
              batches?.view_own_batches ||
              batches?.update_batches ||
              batches?.update_own_batches ||
              batches?.delete_batches ||
              batches?.delete_own_batches
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_batches_by_branch"
            label="Create batches by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.create_batches_by_branch}
          />
          <CheckBox
            name="update_batches_by_branch"
            label="Update batches by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.update_batches_by_branch}
          />
          <CheckBox
            name="view_batches_by_branch"
            label="View batches by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.view_batches_by_branch}
          />
          <CheckBox
            name="activate_batches_by_branch"
            label="Activate batches by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.activate_batches_by_branch}
          />
          <CheckBox
            name="end_batches_by_branch"
            label="End batches by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.end_batches_by_branch}
          />
          <CheckBox
            name="delete_batches_by_branch"
            label="Delete batches by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.delete_batches_by_branch}
          />
          <CheckBox
            name="activate_batches"
            label="Activate Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.activate_batches}
          />
          <CheckBox
            name="activate_own_batches"
            label="Activate Own Batches "
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.activate_own_batches}
          />
          <CheckBox
            name="end_batches"
            label="End Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.end_batches}
          />
          <CheckBox
            name="end_own_batches"
            label="End Own Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.end_own_batches}
          />
          <CheckBox
            name="create_batches"
            label="Create Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.create_batches}
          />
          <CheckBox
            name="view_batches"
            label="View Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.view_batches}
          />
          <CheckBox
            name="view_own_batches"
            label="View Own Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.view_own_batches}
          />
          <CheckBox
            name="update_batches"
            label="Update Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.update_batches}
          />
          <CheckBox
            name="update_own_batches"
            label="Update Own Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.update_own_batches}
          />
          <CheckBox
            name="delete_batches"
            label="Delete Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.delete_batches}
          />
          <CheckBox
            name="delete_own_batches"
            label="Delete Own Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setBatches)
            }
            defaultChecked={batches?.delete_own_batches}
          />
        </FormGroup>
      </div>

      {/* Classes Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Classes</p>
          <CheckBox
            id="classes"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setClasses)
            }
            defaultChecked={
              classes?.create_classes_by_branch ||
              classes?.update_classes_by_branch ||
              classes?.view_classes_by_branch ||
              classes?.delete_classes_by_branch ||
              classes?.add_trainer_note_by_branch ||
              classes?.add_admin_note_by_branch ||
              classes?.switch_class_by_branch ||
              classes?.move_to_wait_by_branch ||
              classes?.move_to_hold_by_branch ||
              classes?.move_to_refund_by_branch ||
              classes?.move_to_blacklist_by_branch ||
              classes?.add_trainer_note ||
              classes?.add_own_trainer_note ||
              classes?.add_admin_note ||
              classes?.add_to_attendance ||
              classes?.switch_class ||
              classes?.move_to_wait ||
              classes?.move_to_hold ||
              classes?.move_to_refund ||
              classes?.move_to_blacklist ||
              classes?.create_classes ||
              classes?.view_classes ||
              classes?.view_own_classes ||
              classes?.update_classes ||
              classes?.update_own_classes ||
              classes?.delete_classes ||
              classes?.delete_own_classes
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_classes_by_branch"
            label="Create classes by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.create_classes_by_branch}
          />
          <CheckBox
            name="update_classes_by_branch"
            label="Update classes by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.update_classes_by_branch}
          />
          <CheckBox
            name="view_classes_by_branch"
            label="View classes by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.view_classes_by_branch}
          />
          <CheckBox
            name="delete_classes_by_branch"
            label="Delete classes by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.delete_classes_by_branch}
          />
          <CheckBox
            name="add_trainer_note_by_branch"
            label="Add trainer note by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.add_trainer_note_by_branch}
          />
          <CheckBox
            name="add_admin_note_by_branch"
            label="Add admin note by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.add_admin_note_by_branch}
          />
          <CheckBox
            name="switch_class_by_branch"
            label="Switch class by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.switch_class_by_branch}
          />
          <CheckBox
            name="move_to_wait_by_branch"
            label="Move to waitlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_wait_by_branch}
          />
          <CheckBox
            name="move_to_hold_by_branch"
            label="Move to holdlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_hold_by_branch}
          />
          <CheckBox
            name="move_to_refund_by_branch"
            label="Move to refundlist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_refund_by_branch}
          />
          <CheckBox
            name="move_to_blacklist_by_branch"
            label="Move to blacklist by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_blacklist_by_branch}
          />
          <CheckBox
            name="add_trainer_note"
            label="Add Trainer Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.add_trainer_note}
          />
          <CheckBox
            name="add_own_trainer_note"
            label="Add Own Trainer Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.add_own_trainer_note}
          />
          <CheckBox
            name="add_admin_note"
            label="Add Admin Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.add_admin_note}
          />
          <CheckBox
            name="add_to_attendance"
            label="Add to Attendance"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.add_to_attendance}
          />
          <CheckBox
            name="switch_class"
            label="Switch Class"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.switch_class}
          />
          <CheckBox
            name="move_to_wait"
            label="Move to waitlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_wait}
          />
          <CheckBox
            name="move_to_hold"
            label="Move to holdlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_hold}
          />
          <CheckBox
            name="move_to_refund"
            label="Move to refundlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_refund}
          />
          <CheckBox
            name="move_to_blacklist"
            label="Move to BlackList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.move_to_blacklist}
          />
          <CheckBox
            name="create_classes"
            label="Create Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.create_classes}
          />
          <CheckBox
            name="view_classes"
            label="View Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.view_classes}
          />
          <CheckBox
            name="view_own_classes"
            label="View Own Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.view_own_classes}
          />
          <CheckBox
            name="update_classes"
            label="Update Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.update_classes}
          />
          <CheckBox
            name="update_own_classes"
            label="Update Own Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.update_own_classes}
          />
          <CheckBox
            name="delete_classes"
            label="Delete Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.delete_classes}
          />
          <CheckBox
            name="delete_own_classes"
            label="Delete Own Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setClasses)
            }
            defaultChecked={classes?.delete_own_classes}
          />
        </FormGroup>
      </div>

      {/* Attendance Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Attendance</p>
          <CheckBox
            id="attendance"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setAttendance)
            }
            defaultChecked={
              attendance?.view_attendance_by_branch ||
              attendance?.add_session_notes_by_branch ||
              attendance?.view_session_notes_by_branch ||
              attendance?.view_attendance ||
              attendance?.view_trainer_attendance ||
              attendance?.add_session_notes ||
              attendance?.view_session_notes ||
              attendance?.add_own_session_notes ||
              attendance?.view_own_session_notes
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="view_attendance_by_branch"
            label="View attendance by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.view_attendance_by_branch}
          />
          <CheckBox
            name="add_session_notes_by_branch"
            label="Add session notes by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.add_session_notes_by_branch}
          />
          <CheckBox
            name="view_session_notes_by_branch"
            label="View session notes by branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.view_session_notes_by_branch}
          />
          <CheckBox
            name="view_attendance"
            label="View Attendances"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.view_attendance}
          />
          <CheckBox
            name="view_trainer_attendance"
            label="View Trainer Attendance"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.view_trainer_attendance}
          />
          <CheckBox
            name="add_session_notes"
            label="Add Session Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.add_session_notes}
          />
          <CheckBox
            name="add_own_session_notes"
            label="Add Own Session Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.add_own_session_notes}
          />
          <CheckBox
            name="view_session_notes"
            label="View Session Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.view_session_notes}
          />
          <CheckBox
            name="view_own_session_notes"
            label="View Own Session Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAttendance)
            }
            defaultChecked={attendance?.view_own_session_notes}
          />
        </FormGroup>
      </div>

      {/* Announcements Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Announcements</p>
          <CheckBox
            id="announcements"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setAnnouncements)
            }
            defaultChecked={
              announcements?.create_announcement ||
              announcements?.reply_to_announcement ||
              announcements?.view_announcement ||
              announcements?.view_announcement_replies ||
              announcements?.update_announcement ||
              announcements?.delete_announcement
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_announcement"
            label="Create Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAnnouncements)
            }
            defaultChecked={announcements?.create_announcement}
          />
          <CheckBox
            name="reply_to_announcement"
            label="Reply To Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAnnouncements)
            }
            defaultChecked={announcements?.reply_to_announcement}
          />
          <CheckBox
            name="view_announcement"
            label="View Announcements"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAnnouncements)
            }
            defaultChecked={announcements?.view_announcement}
          />
          <CheckBox
            name="view_announcement_replies"
            label="View Announcement Replies"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAnnouncements)
            }
            defaultChecked={announcements?.view_announcement_replies}
          />
          <CheckBox
            name="update_announcement"
            label="Update Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAnnouncements)
            }
            defaultChecked={announcements?.update_announcement}
          />
          <CheckBox
            name="delete_announcement"
            label="Delete Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setAnnouncements)
            }
            defaultChecked={announcements?.delete_announcement}
          />
        </FormGroup>
      </div>

      {/* notification Role */}
      <div>
        <div className={styles.groupCheckBox}>
          <p className={styles.title_GroupRole}>Notifications</p>
          <CheckBox
            id="notification"
            label=""
            handlePermissionChange={(e) =>
              handleGroupPermissionChange(e, setNotification)
            }
            defaultChecked={
              notification?.create_branch ||
              notification?.update_branch ||
              notification?.delete_branch ||
              notification?.create_role ||
              notification?.update_role ||
              notification?.delete_role ||
              notification?.create_users ||
              notification?.update_users ||
              notification?.delete_users ||
              notification?.activate_pending_users ||
              notification?.delete_pending_users ||
              notification?.create_trainees_in_waitlist ||
              notification?.update_trainees_in_waitlist ||
              notification?.delete_trainees_from_waitlist ||
              notification?.assign_class ||
              notification?.move_trainee_from_wait_to_hold ||
              notification?.move_trainee_from_wait_to_refund ||
              notification?.move_trainee_from_wait_to_blacklist ||
              notification?.create_trainees_in_pendinglist ||
              notification?.update_trainees_in_pendinglist ||
              notification?.delete_trainees_from_pendinglist ||
              notification?.assign_level ||
              notification?.assign_trainer ||
              notification?.update_trainees_in_holdlist ||
              notification?.delete_trainees_from_holdlist ||
              notification?.move_trainee_from_hold_to_wait ||
              notification?.update_trainees_in_refundlist ||
              notification?.delete_trainees_from_refundlist ||
              notification?.move_trainee_from_refund_to_wait ||
              notification?.update_trainees_in_blacklist ||
              notification?.delete_trainees_from_blacklist ||
              notification?.move_trainee_from_black_to_wait ||
              notification?.create_batches ||
              notification?.update_batches ||
              notification?.delete_batches ||
              notification?.activate_batches ||
              notification?.end_batches ||
              notification?.create_classes ||
              notification?.update_classes ||
              notification?.delete_classes ||
              notification?.move_from_class_to_wait ||
              notification?.move_from_class_to_hold ||
              notification?.move_from_class_to_refund ||
              notification?.move_from_class_to_black ||
              notification?.switch_class ||
              notification?.add_trainer_note ||
              notification?.add_admin_note ||
              notification?.add_session_notes ||
              notification?.create_announcement ||
              notification?.reply_to_announcement ||
              notification?.update_announcement ||
              notification?.delete_announcement ||
              notification?.update_settings
            }
          />
        </div>
        <FormGroup sx={{ gap: 1 }}>
          <CheckBox
            name="create_branch"
            label="Create Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_branch}
          />
          <CheckBox
            name="update_branch"
            label="Update Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_branch}
          />
          <CheckBox
            name="delete_branch"
            label="Delete Branch"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_branch}
          />
          <CheckBox
            name="create_role"
            label="Create Role"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_role}
          />
          <CheckBox
            name="update_role"
            label="Update Role"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_role}
          />
          <CheckBox
            name="delete_role"
            label="Delete Role"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_role}
          />
          <CheckBox
            name="create_users"
            label="Create Users"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_users}
          />
          <CheckBox
            name="update_users"
            label="Update Users"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_users}
          />
          <CheckBox
            name="delete_users"
            label="Delete Users"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_users}
          />
          <CheckBox
            name="activate_pending_users"
            label="Activate Pending Users"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.activate_pending_users}
          />
          <CheckBox
            name="delete_pending_users"
            label="Delete Pending Users"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_pending_users}
          />
          <CheckBox
            name="create_trainees_in_waitlist"
            label="Create Trainees in Waitlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_trainees_in_waitlist}
          />
          <CheckBox
            name="update_trainees_in_waitlist"
            label="Update Trainees in Waitlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_trainees_in_waitlist}
          />
          <CheckBox
            name="delete_trainees_from_waitlist"
            label="Delete Trainees in Waitlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_trainees_from_waitlist}
          />
          <CheckBox
            name="assign_class"
            label="Assign Class"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.assign_class}
          />
          <CheckBox
            name="move_trainee_from_wait_to_hold"
            label="Move Trainee from Waitlist to HoldList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_trainee_from_wait_to_hold}
          />
          <CheckBox
            name="move_trainee_from_wait_to_refund"
            label="Move Trainee from Waitlist to RefundList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_trainee_from_wait_to_refund}
          />
          <CheckBox
            name="move_trainee_from_wait_to_blacklist"
            label="Move Trainee from Waitlist to BlackList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_trainee_from_wait_to_blacklist}
          />
          <CheckBox
            name="create_trainees_in_pendinglist"
            label="Create Trainees in PendingList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_trainees_in_pendinglist}
          />
          <CheckBox
            name="update_trainees_in_pendinglist"
            label="Update Trainees in PendingList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_trainees_in_pendinglist}
          />
          <CheckBox
            name="delete_trainees_from_pendinglist"
            label="Delete Trainees in PendingList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_trainees_from_pendinglist}
          />
          <CheckBox
            name="assign_level"
            label="Assign Level"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.assign_level}
          />
          <CheckBox
            name="assign_trainer"
            label="Assign Trainer"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.assign_trainer}
          />
          <CheckBox
            name="update_trainees_in_holdlist"
            label="Update Trainees in Holdlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_trainees_in_holdlist}
          />
          <CheckBox
            name="delete_trainees_from_holdlist"
            label="Delete Trainees in Holdlist"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_trainees_from_holdlist}
          />
          <CheckBox
            name="move_trainee_from_hold_to_wait"
            label="Move Trainee From Holdlist to WaitList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_trainee_from_hold_to_wait}
          />
          <CheckBox
            name="update_trainees_in_refundlist"
            label="Update Trainees in RefundList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_trainees_in_refundlist}
          />
          <CheckBox
            name="delete_trainees_from_refundlist"
            label="Delete Trainees in RefundList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_trainees_from_refundlist}
          />
          <CheckBox
            name="move_trainee_from_refund_to_wait"
            label="Move Trainee From RefundList to WaitList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_trainee_from_refund_to_wait}
          />
          <CheckBox
            name="update_trainees_in_blacklist"
            label="Update Trainees in BlackList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_trainees_in_blacklist}
          />
          <CheckBox
            name="delete_trainees_from_blacklist"
            label="Delete Trainees from BlackList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_trainees_from_blacklist}
          />
          <CheckBox
            name="move_trainee_from_black_to_wait"
            label="Move Trainee from BlackList to WaitList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_trainee_from_black_to_wait}
          />
          <CheckBox
            name="create_batches"
            label="Create Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_batches}
          />
          <CheckBox
            name="update_batches"
            label="Update Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_batches}
          />
          <CheckBox
            name="delete_batches"
            label="Delete Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_batches}
          />
          <CheckBox
            name="activate_batches"
            label="Activate Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.activate_batches}
          />
          <CheckBox
            name="end_batches"
            label="End Batches"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.end_batches}
          />
          <CheckBox
            name="create_classes"
            label="Create Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_classes}
          />
          <CheckBox
            name="update_classes"
            label="Update Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_classes}
          />
          <CheckBox
            name="delete_classes"
            label="Delete Classes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_classes}
          />
          <CheckBox
            name="move_from_class_to_wait"
            label="Move From Class to WaitList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_from_class_to_wait}
          />
          <CheckBox
            name="move_from_class_to_hold"
            label="Move From Class to HoldList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_from_class_to_hold}
          />
          <CheckBox
            name="move_from_class_to_refund"
            label="Move From Class to RefundList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_from_class_to_refund}
          />
          <CheckBox
            name="move_from_class_to_black"
            label="Move From Class to BlackList"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.move_from_class_to_black}
          />
          <CheckBox
            name="switch_class"
            label="Switch Class"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.switch_class}
          />
          <CheckBox
            name="add_trainer_note"
            label="Add Trainer Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.add_trainer_note}
          />
          <CheckBox
            name="add_admin_note"
            label="Add Admin Note"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.add_admin_note}
          />
          <CheckBox
            name="add_session_notes"
            label="Add Session Notes"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.add_session_notes}
          />
          <CheckBox
            name="create_announcement"
            label="Create Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.create_announcement}
          />
          <CheckBox
            name="reply_to_announcement"
            label="Reply to Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.reply_to_announcement}
          />
          <CheckBox
            name="update_announcement"
            label="Update Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_announcement}
          />
          <CheckBox
            name="delete_announcement"
            label="Delete Announcement"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.delete_announcement}
          />
          <CheckBox
            name="update_settings"
            label="Update Settings"
            handlePermissionChange={(e) =>
              handlePermissionChange(e, setNotification)
            }
            defaultChecked={notification?.update_settings}
          />
        </FormGroup>
      </div>

      <Button type="submit" fullWidth variant="contained" sx={{ gap: 1 }}>
        {isLoading && <Spinner />} {edit ? "Edit" : "Add"} Role
      </Button>
    </Box>
  );
};

FormRole.propTypes = {
  onSubmit: PropTypes.func,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
  data: PropTypes.object,
};

export default FormRole;
