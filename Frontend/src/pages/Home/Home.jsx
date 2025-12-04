import { useEffect } from "react";
import styles from "@styles/Home.module.css";

import Card from "@components/Gateway-System/Card/Card";
import Announcements from "@components/Gateway-System/Announcements/Announcements";
import { FaUsers } from "react-icons/fa";
import { BiSolidTimer } from "react-icons/bi";
import Simple from "@components/Gateway-System/Table/Simple";
import Title from "@src/components/Gateway-System/Title/Title";
import {
  HoldListCloumns,
  PendingTestCloumns,
  pendingUserCloumns,
  waitListCloumns,
} from "@src/shared/SimpleTable";
import { TbCreditCardRefund } from "react-icons/tb";
import { GoBlocked } from "react-icons/go";
import { GiSandsOfTime } from "react-icons/gi";
import Batches from "@src/components/Gateway-System/Batches/Batches";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingTestList } from "@src/store/reducers/PendingTestList/PendingTestSlice";
import { fetchWaitList } from "@src/store/reducers/WaitList/WaitListSlice";
import { fetchPendingUsers } from "@src/store/reducers/PendingUser/PendingUserSlice";
import { fetchRefundList } from "@src/store/reducers/Refund/RefundSlice";
import { TableCell, TableRow } from "@mui/material";
import { fetchHoldlist } from "@src/store/reducers/HoldList/HoldListSlice";
import { fetchBlackList } from "@src/store/reducers/BlackList/BlackListSlice";
import { fetchTrainees } from "@src/store/reducers/Trainees/TraineesSlice";
import checkPermission from "@src/util/CheckPermission";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const dispatch = useDispatch();

  const context = useOutletContext();

  var { pendingUser } = useSelector((state) => state.pendingUsers);
  var { pendingTestList } = useSelector((state) => state.pendingTestList);
  var { waitList } = useSelector((state) => state.waitList);
  var { refundList } = useSelector((state) => state.refundList);
  let { holdList } = useSelector((state) => state.holdList);
  let { blackList } = useSelector((state) => state.blackList);
  const { trainees } = useSelector((state) => state.Trainees);

  useEffect(() => {
    checkPermission({
      name: "trainees",
      children: ["view_trainees", "view_trainees_by_branch"],
    }) && dispatch(fetchTrainees());

    checkPermission({
      name: "pendingusers",
      children: ["view_pending_users", "view_pending_users_by_branch"],
    }) && dispatch(fetchPendingUsers());

    checkPermission({
      name: "waitlist",
      children: [
        "view_trainees",
        "view_own_trainees",
        "view_trainees_by_branch",
      ],
    }) && dispatch(fetchWaitList());

    checkPermission({
      name: "pendinglist",
      children: [
        "view_trainees",
        "view_own_trainees",
        "view_trainees_by_branch",
      ],
    }) && dispatch(fetchPendingTestList());

    checkPermission({
      name: "refundlist",
      children: ["view_trainees", "view_own_trainees"],
    }) && dispatch(fetchRefundList());

    checkPermission({
      name: "holdlist",
      children: [
        "view_trainees",
        "view_own_trainees",
        "view_trainees_by_branch",
      ],
    }) && dispatch(fetchHoldlist());

    checkPermission({
      name: "blacklist",
      children: [
        "view_trainees",
        "view_own_trainees",
        "view_trainees_by_branch",
      ],
    }) && dispatch(fetchBlackList());
  }, [dispatch]);

  return (
    <div className={styles.Home}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Home`}</title>
      </Helmet>

      <div className={styles.Home_content}>
        <PathName path="Dashboard" />

        <div className={styles.statistics}>
          {checkPermission({
            name: "trainees",
            children: ["view_trainees", "view_trainees_by_branch"],
          }) && (
            <Card
              title_name="Trainees"
              total={trainees?.length || 0}
              Icon={<FaUsers className={`${styles.icon} ${styles.icon}`} />}
              bg_color="icon"
            />
          )}
          {checkPermission({
            name: "pendingusers",
            children: ["view_pending_users", "view_pending_users_by_branch"],
          }) && (
            <Card
              title_name="Pending Users"
              total={pendingUser?.users?.length || 0}
              Icon={<FaUsers className={`${styles.icon} ${styles.icon}`} />}
              bg_color="icon"
            />
          )}
          {checkPermission({
            name: "waitlist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <Card
              title_name="Total Waiting"
              total={waitList?.trainees?.length || 0}
              Icon={
                <BiSolidTimer className={`${styles.icon} ${styles.icon}`} />
              }
              bg_color="icon"
            />
          )}
          {checkPermission({
            name: "pendinglist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <Card
              title_name="Total Pending Test"
              total={pendingTestList?.trainees?.length || 0}
              Icon={
                <GiSandsOfTime className={`${styles.icon} ${styles.icon}`} />
              }
              bg_color="icon"
            />
          )}
          {checkPermission({
            name: "refundlist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <Card
              title_name="Total Refunded"
              total={refundList?.trainees?.length || 0}
              Icon={
                <TbCreditCardRefund
                  className={`${styles.icon} ${styles.icon}`}
                />
              }
              bg_color="icon"
            />
          )}
          {checkPermission({
            name: "blacklist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <Card
              title_name="Total Black List"
              total={blackList?.trainees?.length || 0}
              Icon={<GoBlocked className={`${styles.icon} ${styles.icon}`} />}
              bg_color="icon"
            />
          )}
        </div>

        <div className={styles.tables}>
          {/* Announcements */}
          {checkPermission({
            name: "announcements",
            children: ["view_announcement"],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <Announcements />
              </div>
            </div>
          )}

          {/* Pending users */}
          {checkPermission({
            name: "pendingusers",
            children: ["view_pending_users", "view_pending_users_by_branch"],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <div className={[`${styles.Table}`]}>
                  <Title title="Pending Users" />
                  <Simple
                    cloumns={pendingUserCloumns || []}
                    rows={
                      pendingUser?.users?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.email}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.country}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    type={"pending"}
                    height="325px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pending Test */}
          {checkPermission({
            name: "pendinglist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <div className={[`${styles.Table}`]}>
                  <Title title="Pending Test" />
                  <Simple
                    rows={
                      pendingTestList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.country}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.age_group}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.test_date}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={PendingTestCloumns || []}
                    type={"PendingTest"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Wait List */}
          {checkPermission({
            name: "waitlist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <div className={[`${styles.Table}`]}>
                  <Title title="Wait List" />
                  <Simple
                    rows={
                      waitList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.payment_type}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.test_date}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={waitListCloumns || []}
                    type={"wait"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Batches */}
          {checkPermission({
            name: "batches",
            children: [
              "view_batches",
              "view_own_batches",
              "view_batches_by_branch",
            ],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <Batches />
              </div>
            </div>
          )}

          {/* holdlist */}
          {checkPermission({
            name: "holdlist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <div className={[`${styles.Table}`]}>
                  <Title title="Hold List" />
                  <Simple
                    rows={
                      holdList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.notes}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={HoldListCloumns || []}
                    type={"hold"}
                    height="325px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* refund list */}
          {checkPermission({
            name: "refundlist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <div className={[`${styles.Table}`]}>
                  <Title title="Refunded" />
                  <Simple
                    rows={
                      refundList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.notes}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={HoldListCloumns || []}
                    type={"hold"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* black list */}
          {checkPermission({
            name: "blacklist",
            children: [
              "view_trainees",
              "view_own_trainees",
              "view_trainees_by_branch",
            ],
          }) && (
            <div className={styles.Table_Boxes}>
              <div className={styles.wapper_content}>
                <div className={[`${styles.Table}`]}>
                  <Title title="Blacklist" />
                  <Simple
                    rows={
                      blackList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.notes}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={HoldListCloumns || []}
                    type={"hold"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 

          {/* statistics Waiting List and  Announcements
          <div className={styles.Table_Boxes}>
            <div className={styles.wapper_content}>
              {checkPermission({
                name: "announcements",
                children: ["view_announcement"],
              }) && <Announcements />}

              {checkPermission({
                name: "pendingusers",
                children: [
                  "view_pending_users",
                  "view_pending_users_by_branch",
                ],
              }) && (
                <div className={[`${styles.Table}`]}>
                  <Title title="Pending Users" />
                  <Simple
                    cloumns={pendingUserCloumns || []}
                    rows={
                      pendingUser?.users?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.email}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.country}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    type={"pending"}
                    height="325px"
                  />
                </div>
              )}
            </div>
          </div>

          {/* WaitList and Pending Test List 
          <div className={styles.Table_Boxes}>
            <div className={styles.wapper_content}>
              {checkPermission({
                name: "pendinglist",
                children: [
                  "view_trainees",
                  "view_own_trainees",
                  "view_trainees_by_branch",
                ],
              }) && (
                <div className={[`${styles.Table}`]}>
                  <Title title="Pending Test" />
                  <Simple
                    rows={
                      pendingTestList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.country}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.age_group}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.test_date}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={PendingTestCloumns || []}
                    type={"PendingTest"}
                  />
                </div>
              )}

              {checkPermission({
                name: "waitlist",
                children: [
                  "view_trainees",
                  "view_own_trainees",
                  "view_trainees_by_branch",
                ],
              }) && (
                <div className={[`${styles.Table}`]}>
                  <Title title="Wait List" />
                  <Simple
                    rows={
                      waitList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.payment_type}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.test_date}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={waitListCloumns || []}
                    type={"wait"}
                  />
                </div>
              )}
            </div>
          </div>

      Batches and Hold 
          <div className={styles.Table_Boxes}>
            <div className={styles.wapper_content}>
              {checkPermission({
                name: "batches",
                children: [
                  "view_batches",
                  "view_own_batches",
                  "view_batches_by_branch",
                ],
              }) && <Batches />}

              {checkPermission({
                name: "holdlist",
                children: [
                  "view_trainees",
                  "view_own_trainees",
                  "view_trainees_by_branch",
                ],
              }) && (
                <div className={[`${styles.Table}`]}>
                  <Title title="Hold List" />
                  <Simple
                    rows={
                      holdList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.notes}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={HoldListCloumns || []}
                    type={"hold"}
                    height="325px"
                  />
                </div>
              )}
            </div>
          </div>

          blacklist and Refund
          <div className={styles.Table_Boxes}>
            <div className={styles.wapper_content}>
              {checkPermission({
                name: "refundlist",
                children: [
                  "view_trainees",
                  "view_own_trainees",
                  "view_trainees_by_branch",
                ],
              }) && (
                <div className={[`${styles.Table}`]}>
                  <Title title="Refunded" />
                  <Simple
                    rows={
                      refundList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.notes}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={HoldListCloumns || []}
                    type={"hold"}
                  />
                </div>
              )}

              {checkPermission({
                name: "blacklist",
                children: [
                  "view_trainees",
                  "view_own_trainees",
                  "view_trainees_by_branch",
                ],
              }) && (
                <div className={[`${styles.Table}`]}>
                  <Title title="Blacklist" />
                  <Simple
                    rows={
                      blackList?.trainees?.map((user, index) => {
                        if (index < 5) {
                          return (
                            <TableRow key={user.id}>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.full_name}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.notes}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_0}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.phone_number_1}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.branch}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.level}
                              </TableCell>
                              <TableCell sx={{ color: "var(--text-black)" }}>
                                {user.attend_type}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      }) || []
                    }
                    cloumns={HoldListCloumns || []}
                    type={"hold"}
                  />
                </div>
              )}
            </div>
            </div>
            
                */}
        </div>
      </div>
    </div>
  );
};

export default Home;
