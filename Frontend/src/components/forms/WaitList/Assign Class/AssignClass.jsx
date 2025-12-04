import { Box, Button } from "@mui/material";
import Select from "@src/components/Gateway-System/Inputs/Select";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import Alert from "@src/components/feedback/Alert/Alert";
import {
  clearError,
  createAssignClass,
  fetchLevelAssignClass,
  fetchTimeSlotAssignClass,
  updateClassesAssignClass,
} from "@src/store/reducers/WaitList/AssignClass/AssignClassSlice";
import { fetchWaitList } from "@src/store/reducers/WaitList/WaitListSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AssignClass = ({
  getAssignId,
  selectAllIds,
  closeAssignClass,
  type,
  handlerBulkDispatch,
}) => {
  const [class_id, setClassID] = useState("");
  const [assign_id, setAssignId] = useState({
    trainee_id: getAssignId,
  });
  const [attend_type, setAttendType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { level, timeSlot, classes, error, loading } = useSelector(
    (state) => state.assginClass
  );

  // store trainees in state
  useEffect(() => {
    if (selectAllIds) {
      setAssignId((prev) => ({ ...prev, trainees: selectAllIds }));
    }
  }, [selectAllIds, dispatch]);

  // View Assign class
  useEffect(() => {
    if (type !== "bulkAssignClass") {
      attend_type &&
        dispatch(
          fetchTimeSlotAssignClass({ trainee_id: getAssignId, attend_type })
        );
      dispatch(fetchLevelAssignClass({ trainee_id: getAssignId }));
      dispatch(updateClassesAssignClass(assign_id));
    }
  }, [dispatch, attend_type, getAssignId, type, assign_id]);

  // View bulk Assign class
  useEffect(() => {
    if (type === "bulkAssignClass") {
      attend_type &&
        dispatch(
          fetchTimeSlotAssignClass({
            trainees: selectAllIds,
            attend_type,
          })
        );
      dispatch(fetchLevelAssignClass({ trainees: selectAllIds }));
      if (assign_id?.trainees?.length > 0) {
        dispatch(updateClassesAssignClass(assign_id));
      }
    }
  }, [dispatch, attend_type, getAssignId, type, assign_id, selectAllIds]);

  const handlerDispatch = () => {
    dispatch(createAssignClass({ id: getAssignId, class_id }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchWaitList());
        closeAssignClass();
      });
  };

  const handlerONBulk = () => {
    handlerBulkDispatch(class_id);
    closeAssignClass();
  };

  const handlerSubmitted = (event) => {
    event.preventDefault();

    const selectedClass = classes?.find((Class) => Class.id === class_id);
    const currentTraineesCount = selectedClass?.num_of_trainees || 0;

    // Calculate how many trainees are being added
    let traineesToAdd = 1; // Default for single trainee assignment
    if (type === "bulkAssignClass" && selectAllIds) {
      traineesToAdd = selectAllIds.length;
    }

    // Check if adding these trainees would exceed the limit of 10
    const totalAfterAssignment = currentTraineesCount + traineesToAdd;

    if (totalAfterAssignment > 10) {
      setIsOpen(true);
      return;
    } else {
      type === "bulkAssignClass" ? handlerONBulk() : handlerDispatch();
    }
  };

  // Generate alert message
  const getAlertMessage = () => {
    const selectedClass = classes?.find((Class) => Class.id === class_id);
    const currentCount = selectedClass?.num_of_trainees || 0;
    const traineesToAdd = type === "bulkAssignClass" && selectAllIds ? selectAllIds.length : 1;
    const totalAfter = currentCount + traineesToAdd;

    return `The selected class "${selectedClass?.class_name}" currently has ${currentCount} trainees. Adding ${traineesToAdd} more trainee${traineesToAdd > 1 ? 's' : ''} will result in ${totalAfter} total trainees, which exceeds the recommended limit of 10. Do you want to continue?`;
  };

  // Change All select classType -  time - level  Assign id
  const handleChangeAssignID = (data) => {
    if (data.value) {
      setAssignId((prev) => ({ ...prev, [data.name]: data.value }));
    } else {
      setAssignId((prev) => ({ ...prev, [data.name]: "" }));
    }
  };

  // filter class
  useEffect(() => {
    if (assign_id?.class_type || assign_id?.level || assign_id?.time_slot) {
      dispatch(updateClassesAssignClass(assign_id));
    }
  }, [assign_id, dispatch]);

  // show error message
  useEffect(() => {
    if (error) {
      ToastError(error.message);

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <>
      {isOpen && (
        <Alert
          isOpen={isOpen}
          zIndex={999999}
          Continue={() =>
            type === "bulkAssignClass" ? handlerONBulk() : handlerDispatch()
          }
          Cancel={() => setIsOpen(false)}
          isLoading={loading}
          message={getAlertMessage()}
        />
      )}

      <Box
        component={"form"}
        onSubmit={handlerSubmitted}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: "20px 0 0",
        }}
      >
        <Select
          id="class_type"
          label="Class Type"
          options={[
            { id: 1, label: "Online" },
            { id: 2, label: "Offline" },
            { id: 3, label: "Hybrid" },
            { id: 4, label: "Private" },
          ]}
          placeholder="Choose Class Type"
          onChange={(e, v) => {
            handleChangeAssignID({
              value: v?.label,
              name: "class_type",
            });
            setAttendType(v?.label);
          }}
        />

        <Select
          id="time_slot"
          label="Time Slot"
          options={
            timeSlot?.map((time) => ({ id: time.id, label: time.time_slot })) ||
            []
          }
          placeholder="Choose Time Slot"
          onChange={(e) =>
            handleChangeAssignID({
              value: Number(e.target.dataset.value) || "",
              name: "time_slot",
            })
          }
        />
        <Select
          id="level"
          label="Level"
          options={
            level?.map((level) => ({
              id: level.id,
              label: level.level_name,
            })) || []
          }
          placeholder="Choose Level"
          onChange={(e) =>
            handleChangeAssignID({
              value: Number(e.target.dataset.value),
              name: "level",
            })
          }
        />

        <Select
          id="classes"
          label="Classes"
          options={
            classes?.map((classItem) => {
              const currentCount = classItem.num_of_trainees || 0;
              const traineesToAdd = type === "bulkAssignClass" && selectAllIds ? selectAllIds.length : 1;
              const totalAfter = currentCount + traineesToAdd;
              const warningText = totalAfter > 10 ? " ⚠️ (Will exceed limit)" : "";

              return {
                id: classItem.id,
                label: `${classItem.class_name} - Current: ${currentCount}, After: ${totalAfter}${warningText}`,
              };
            }) || []
          }
          placeholder="Choose Classes"
          required={true}
          onChange={(e) => setClassID(Number(e.target.dataset.value))}
        />

        {class_id && (
          <Box sx={{
            padding: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            marginTop: 1
          }}>
            {(() => {
              const selectedClass = classes?.find((Class) => Class.id === class_id);
              const currentCount = selectedClass?.num_of_trainees || 0;
              const traineesToAdd = type === "bulkAssignClass" && selectAllIds ? selectAllIds.length : 1;
              const totalAfter = currentCount + traineesToAdd;

              if (totalAfter > 10) {
                return (
                  <p style={{
                    margin: 0,
                    color: '#d32f2f',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ⚠️ Warning: This assignment will exceed the class limit of 10 trainees
                    (Current: {currentCount}, Adding: {traineesToAdd}, Total: {totalAfter})
                  </p>
                );
              } else {
                return (
                  <p style={{
                    margin: 0,
                    color: '#2e7d32',
                    fontSize: '14px'
                  }}>
                    ✓ Assignment is within limits
                    (Current: {currentCount}, Adding: {traineesToAdd}, Total: {totalAfter})
                  </p>
                );
              }
            })()}
          </Box>
        )}

        <Button type="submit" variant="contained" sx={{ gap: 1 }}>
          {loading && <Spinner />} Assign
        </Button>
      </Box>
    </>
  );
};

AssignClass.propTypes = {
  getAssignId: PropTypes.any,
  selectAllIds: PropTypes.array,
  closeAssignClass: PropTypes.func,
  type: PropTypes.string,
  handlerBulkDispatch: PropTypes.func,
};

export default AssignClass;
