import { Box, Button } from "@mui/material";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import GateClasses from "@src/components/Gateway-System/Inputs/Classes/Gate Classes/GateClasses";
import LevelClasses from "@src/components/Gateway-System/Inputs/Classes/Level Classes/LevelClasses";
import TimeSlotsClasses from "@src/components/Gateway-System/Inputs/Classes/TimeSlots Classes/TimeSlotsClasses";
import TrainerClasses from "@src/components/Gateway-System/Inputs/Classes/TrainerClasses/TrainerClasses";
import Input from "@src/components/Gateway-System/Inputs/Input";
import Select from "@src/components/Gateway-System/Inputs/Select";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import checkPermission from "@src/util/CheckPermission";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddClasses = ({ onSubmit, isLoading, Class, edit }) => {
  const [level_id, setLevelID] = useState("");
  const [gate_id, setGateID] = useState("");
  const [timeSlot_id, setTimeSlotID] = useState("");
  const [trainer_id, setTrainerID] = useState("");
  const [attend_type, setAttendType] = useState(Class?.class_type || "");

  const { page_branches } = useSelector((state) => state.branches);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let classes = {
      class_type: data.get("class_type"),
      branch: data.get("branch"),
    };

    if (level_id) classes = { ...classes, level_id };
    if (gate_id) classes = { ...classes, gate_id };
    if (timeSlot_id) classes = { ...classes, time_id: timeSlot_id };
    if (trainer_id) classes = { ...classes, trainer_id };
    if (data.get("gate_url")) classes.gate_url = data.get("gate_url");
    if (data.get("gate_password"))
      classes.gate_password = data.get("gate_password");

    edit ? onSubmit({ id: Class.id, classes }) : onSubmit(classes);
  };

  return (
    <div>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
          margin: "20px 0 0",
        }}
      >
        {checkPermission({
          name: "classes",
          children: ["create_classes"],
        }) && (
          <>
            {page_branches?.current_branch && (
              <Branch
                defaultValue={Class?.branch}
                branches={page_branches.branches}
                current_branch={page_branches.current_branch}
              />
            )}
          </>
        )}

        <Select
          id="class_type"
          label="Class Type"
          options={[
            { id: 1, label: "Online" },
            { id: 2, label: "Offline" },
            { id: 3, label: "Hybrid" },
            { id: 4, label: "Private" },
          ]}
          placeholder="Class Type"
          value={attend_type}
          onChange={(e, v) => setAttendType(v.label)}
          required={true}
        />
        {attend_type === "Online" && (
          <>
            <Input
              id="gate_url"
              label="Gate Account"
              type="text"
              placeholder="Gate Account"
              required={false}
              defaultValue={Class?.gate_url}
            />

            <Input
              id="gate_password"
              label="Gate Password"
              placeholder="Password"
              required={false}
              defaultValue={Class?.gate_password}
            />
          </>
        )}

        <GateClasses
          label="Gate"
          Button={true}
          showRemoveButton={true}
          setStateId={setGateID}
          defaultValue={Class?.gate}
          required={false}
        />

        <TimeSlotsClasses
          label="Time Slot"
          setStateId={setTimeSlotID}
          defaultValue={Class?.time_slot}
          attend_type={attend_type || Class?.class_type}
          Button={true}
          showRemoveButton={true}
          required={true}
        />

        <TrainerClasses
          label="Trainer"
          setStateId={setTrainerID}
          defaultValue={Class?.trainer}
          required={false}
        />

        <LevelClasses
          label="Level"
          setStateId={setLevelID}
          defaultValue={Class?.level}
          Button={true}
          showRemoveButton={true}
          required={false}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => ""}
          sx={{ margin: "20px 0 0px" }}
        >
          {isLoading && <Spinner />} {edit ? "Edit" : "Add"} Class
        </Button>
      </Box>
    </div>
  );
};

AddClasses.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  Class: PropTypes.object,
  edit: PropTypes.bool,
};

export default AddClasses;
