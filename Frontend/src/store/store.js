import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./reducers/Auth/Login/LoginSlice";
import SignUpSlice from "./reducers/Auth/Signup/SignupSlice";
import ProfileSlice from "./reducers/Auth/Profile/ProfileSlice";
import BrancheSlice from "./reducers/Branches/BrancheSlice";
import UsersSlice from "./reducers/Users/UsersSlice";
import PendingUserSlice from "./reducers/PendingUser/PendingUserSlice";
import RoleSlice from "./reducers/Role/RoleSlice";
import PendingTestListSlice from "./reducers/PendingTestList/PendingTestSlice";
import PendingTestAssignSlice from "./reducers/PendingTestList/Assign/PendingTestAssign";
import WaitListSlice from "./reducers/WaitList/WaitListSlice";
import viewWaitListSlice from "./reducers/WaitList/View/ViewSlice";
import MoveWaitListSlice from "./reducers/WaitList/Move/MoveWaitListSlice";
import AssignClassSlice from "./reducers/WaitList/AssignClass/AssignClassSlice";
import HoldListSlice from "./reducers/HoldList/HoldListSlice";
import RefundListSlice from "./reducers/Refund/RefundSlice";
import BlackListSlice from "./reducers/BlackList/BlackListSlice";
import BatchesSlice from "./reducers/Batches/BatchesSlice";
import ClassesSlice from "./reducers/Batches/Classes/ClassesSlice";
import MoveClassSlice from "./reducers/Batches/Classes/Move/MoveClassSlice";
import BulkClassSlice from "./reducers/Batches/Classes/Bulk/BulkClass";
import levelClassesSlice from "./reducers/Batches/Classes/Levels/LevelsSlice";
import GatesSlice from "./reducers/Batches/Classes/Gates/GatesSlice";
import TimeSlotsSlice from "./reducers/Batches/Classes/TimeSlots/TimeSlots";
import TraineesSlice from "./reducers/Trainees/TraineesSlice";
import StatisticsSlice from "./reducers/Trainees/StatisticsSlice";
import AttendanceSlice from "./reducers/Attendance/AttendanceSlice";
import SessionNoteSlice from "./reducers/Attendance/Session Note/SessionNoteSlice";
import AnnouncementsSlice from "./reducers/Announcements/AnnouncementsSlice";
import SettingsSlice from "./reducers/Settings/SettingsSlice";
import NotificationsSlice from "./reducers/Notification/NotificationSlice";
import LogsSlice from "./reducers/LogsOperations/LogsSlice";

// Hook
import clearSelection from "./Hook/clearSelection";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    register: SignUpSlice,
    profile: ProfileSlice,
    branches: BrancheSlice,
    users: UsersSlice,
    pendingUsers: PendingUserSlice,
    role: RoleSlice,
    pendingTestList: PendingTestListSlice,
    pendingTestAssign: PendingTestAssignSlice,
    Trainees: TraineesSlice,
    Statistics: StatisticsSlice,
    waitList: WaitListSlice,
    viewWaitList: viewWaitListSlice,
    moveWaitList: MoveWaitListSlice,
    assginClass: AssignClassSlice,
    holdList: HoldListSlice,
    refundList: RefundListSlice,
    blackList: BlackListSlice,
    batches: BatchesSlice,
    classes: ClassesSlice,
    levelClasses: levelClassesSlice,
    moveClass: MoveClassSlice,
    bulkClass: BulkClassSlice,
    gatesClassesSlice: GatesSlice,
    timeSlotClassesSlice: TimeSlotsSlice,
    Attendance: AttendanceSlice,
    SessionNote: SessionNoteSlice,
    Announcements: AnnouncementsSlice,
    settings: SettingsSlice,
    notifications: NotificationsSlice,
    logsOperations: LogsSlice,

    // Hooks
    clearSelection: clearSelection,
  },
});

export default store;
