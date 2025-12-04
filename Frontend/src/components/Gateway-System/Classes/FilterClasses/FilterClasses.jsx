import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilterClasses.module.css";
import Select from "../../Inputs/Select";
import LevelClasses from "../../Inputs/Classes/Level Classes/LevelClasses";
import TrainerClasses from "../../Inputs/Classes/TrainerClasses/TrainerClasses";
import TimeSlotsClasses from "../../Inputs/Classes/TimeSlots Classes/TimeSlotsClasses";
import GateClasses from "../../Inputs/Classes/Gate Classes/GateClasses";
import { useDispatch, useSelector } from "react-redux";
import { filterClasses } from "@src/store/reducers/Batches/Classes/ClassesSlice";
import checkPermission from "@src/util/CheckPermission";
import Branch from "../../Inputs/Branch";

const FilterClasses = ({ batch_id }) => {
  const [level_id, setLevelID] = useState("");
  const [gate_id, setGateID] = useState("");
  const [timeSlot_id, setTimeSlotID] = useState("");
  const [trainer_id, setTrainerID] = useState("");
  const [attend_type, setAttendType] = useState("");
  const [branch, setBranch] = useState("");

  const dispatch = useDispatch();
  const { page_branches } = useSelector((state) => state.branches);

  const handlerFilters = useCallback(() => {
    let filter = {};

    if (attend_type) filter.class_type = attend_type;
    if (level_id) filter.level = level_id;
    if (gate_id) filter.gate = gate_id;
    if (timeSlot_id) filter.time_slot = timeSlot_id;
    if (trainer_id) filter.trainer_id = trainer_id;
    if (branch) filter.branch = branch;

    dispatch(filterClasses({ batch_id, filter }));
  }, [
    dispatch,
    batch_id,
    attend_type,
    level_id,
    gate_id,
    timeSlot_id,
    trainer_id,
    branch,
  ]);

  useEffect(() => {
    handlerFilters();
  }, [handlerFilters]);

  return (
    <div style={{ direction: "rtl" }}>
      <div className={styles.filter_classes}>
        <div className={styles.filter_wapper}>
          <div className={styles.filter_info}>
            {checkPermission({
              name: "classes",
              children: ["view_classes", "view_own_classes"],
            }) && (
              <>
                {page_branches?.current_branch && (
                  <Branch
                    label={true}
                    branches={page_branches.branches}
                    current_branch={""}
                    setBranch={setBranch}
                  />
                )}
              </>
            )}
          </div>

          <div className={styles.filter_info}>
            <Select
              id="class_type"
              label=""
              options={[
                { id: 1, label: "Online" },
                { id: 2, label: "Offline" },
                { id: 3, label: "Hybrid" },
                { id: 4, label: "Private" },
              ]}
              placeholder="Type"
              onChange={(e, v) => setAttendType(v?.label)}
            />
          </div>

          <div className={styles.filter_info}>
            <GateClasses setStateId={setGateID} Button={false} label="" />
          </div>

          <div className={styles.filter_info}>
            <TimeSlotsClasses
              label=""
              setStateId={setTimeSlotID}
              attend_type={attend_type}
              button={false}
            />
          </div>

          <div className={styles.filter_info}>
            <LevelClasses label="" Button={false} setStateId={setLevelID} />
          </div>

          <div className={styles.filter_info}>
            <TrainerClasses label="" setStateId={setTrainerID} />
          </div>
        </div>
      </div>
    </div>
  );
};

FilterClasses.propTypes = {
  batch_id: PropTypes.number.isRequired,
};

export default FilterClasses;
