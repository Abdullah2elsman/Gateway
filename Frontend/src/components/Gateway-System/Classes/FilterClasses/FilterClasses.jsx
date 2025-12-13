import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const EMPTY_FILTERS = {
  level_id: "",
  gate_id: "",
  timeSlot_id: "",
  trainer_id: "",
  attend_type: "",
  branch: "",
};

const TYPE_OPTIONS = [
  { id: 1, label: "Online" },
  { id: 2, label: "Offline" },
  { id: 3, label: "Hybrid" },
  { id: 4, label: "Private" },
];

const FilterClasses = ({ batch_id }) => {
  const dispatch = useDispatch();
  const { page_branches } = useSelector((state) => state.branches);

  const STORAGE_KEY = useMemo(
    () => `batch_${batch_id}_class_filters`,
    [batch_id]
  );

  const hydratedRef = useRef(false);
  const skipDispatchRef = useRef(false);
  const lastPayloadRef = useRef("");
  const debounceRef = useRef(null);

  const loadInitialFilters = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...EMPTY_FILTERS, ...JSON.parse(saved) } : EMPTY_FILTERS;
    } catch {
      return EMPTY_FILTERS;
    }
  }, [STORAGE_KEY]);

  const [filters, setFilters] = useState(() => loadInitialFilters());

  const buildFilterPayload = useCallback((f) => {
    const payload = {};
    if (f.attend_type) payload.class_type = f.attend_type;
    if (f.level_id) payload.level = f.level_id;
    if (f.gate_id) payload.gate = f.gate_id;
    if (f.timeSlot_id) payload.time_slot = f.timeSlot_id;
    if (f.trainer_id) payload.trainer_id = f.trainer_id;
    if (f.branch) payload.branch = f.branch;
    return payload;
  }, []);

  const dispatchFilters = useCallback(
    (nextFilters) => {
      const payload = buildFilterPayload(nextFilters);
      const serialized = JSON.stringify(payload);

      if (serialized === lastPayloadRef.current) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        lastPayloadRef.current = serialized;
        dispatch(filterClasses({ batch_id, filter: payload }));
      }, 250);
    },
    [dispatch, batch_id, buildFilterPayload]
  );

  // hydrate once per batch
  useEffect(() => {
    hydratedRef.current = false;
    skipDispatchRef.current = true;

    const initial = loadInitialFilters();
    setFilters(initial);
    dispatchFilters(initial);

    hydratedRef.current = true;

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [loadInitialFilters, dispatchFilters]);

  // react to changes
  useEffect(() => {
    if (!hydratedRef.current) return;

    if (skipDispatchRef.current) {
      skipDispatchRef.current = false;
      return;
    }

    dispatchFilters(filters);
  }, [filters, dispatchFilters]);

  // persist
  useEffect(() => {
    if (!hydratedRef.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters, STORAGE_KEY]);

  const selectedType =
    TYPE_OPTIONS.find((o) => o.label === filters.attend_type) || null;

  return (
    <div style={{ direction: "rtl" }}>
      <div className={styles.filter_classes}>
        <div className={styles.filter_wapper}>
          {/* Branch */}
          <div className={styles.filter_info}>
            {checkPermission({
              name: "classes",
              children: ["view_classes", "view_own_classes"],
            }) &&
              page_branches?.current_branch && (
                <Branch
                  label
                  branches={page_branches.branches}
                  key={`branch_${filters.branch || "none"}`}
                  current_branch={filters.branch}
                  selectedId={filters.branch}
                  setBranch={(val) =>
                    setFilters((prev) =>
                      prev.branch === val ? prev : { ...prev, branch: val || "" }
                    )
                  }
                />
              )}
          </div>

          {/* Type */}
          <div className={styles.filter_info}>
            <Select
              id="class_type"
              placeholder="Type"
              options={TYPE_OPTIONS}
              value={selectedType}
              onChange={(e, v) =>
                setFilters((prev) =>
                  prev.attend_type === v?.label
                    ? prev
                    : { ...prev, attend_type: v?.label || "" }
                )
              }
            />
          </div>

          {/* Gate */}
          <div className={styles.filter_info}>
            <GateClasses
              key={`gate_${filters.gate_id || "none"}`}
              Button={false}
              selectedId={filters.gate_id}
              setStateId={(id) =>
                setFilters((prev) =>
                  prev.gate_id === id ? prev : { ...prev, gate_id: id || "" }
                )
              }
            />
          </div>

          {/* Time Slot */}
          <div className={styles.filter_info}>
            <TimeSlotsClasses
              key={`slot_${filters.timeSlot_id || "none"}_${filters.attend_type}`}
              button={false}
              attend_type={filters.attend_type}
              selectedId={filters.timeSlot_id}
              setStateId={(id) =>
                setFilters((prev) =>
                  prev.timeSlot_id === id
                    ? prev
                    : { ...prev, timeSlot_id: id || "" }
                )
              }
            />
          </div>

          {/* Level */}
          <div className={styles.filter_info}>
            <LevelClasses
              Button={false}
              selectedId={filters.level_id}
              setStateId={(id) =>
                setFilters((prev) =>
                  prev.level_id === id ? prev : { ...prev, level_id: id || "" }
                )
              }
            />
          </div>

          {/* Trainer */}
          <div className={styles.filter_info}>
            <TrainerClasses
              selectedId={filters.trainer_id}
              setStateId={(id) =>
                setFilters((prev) =>
                  prev.trainer_id === id
                    ? prev
                    : { ...prev, trainer_id: id || "" }
                )
              }
            />
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
