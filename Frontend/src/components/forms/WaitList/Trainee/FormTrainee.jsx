import FullName from "@components/Gateway-System/Inputs/FullName";
import { Box, Button } from "@mui/material";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import Input from "@src/components/Gateway-System/Inputs/Input";
import PhoneNumber from "@src/components/Gateway-System/Inputs/PhoneNumber";
import Select from "@src/components/Gateway-System/Inputs/Select";
import TextArea from "@src/components/Gateway-System/Inputs/TextArea";
import LevelsWait from "@src/components/Gateway-System/Inputs/WaitList/Levels Wait/LevelsWait";
import PaymentType from "@src/components/Gateway-System/Inputs/WaitList/PaymentType/PaymentType";
import PreferableTime from "@src/components/Gateway-System/Inputs/WaitList/PreferableTime Wait/PreferableTime";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { countries } from "@src/shared/Countries";
import { getBranchesAllPages } from "@src/store/reducers/Branches/BrancheSlice";
import { fetchTrainerForWaitList } from "@src/store/reducers/WaitList/WaitListSlice";
import checkPermission from "@src/util/CheckPermission";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdDateRange, MdOutlineEmail, MdOutlinePaid } from "react-icons/md";
import { PiCity, PiStudentBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const FormTrainee = ({ onSubmit, edit, isLoading, trainee, type }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fullName, setFullName] = useState(trainee?.full_name || "");
  const [country, setCountry] = useState(trainee?.country || "");
  const [trainer_id, setTrainerid] = useState("");
  const [level_id, setLevelid] = useState("");
  const [payment_id, setPaymentid] = useState("");
  const [time_id, setTimeid] = useState("");
  const [secondTime_id, setSecondTimeid] = useState("");
  const [attend_type, setAttendtype] = useState(trainee?.attend_type || "");
  const [age_group, setAgeGroup] = useState(trainee?.age_group || "Adult");

  const dispatch = useDispatch();
  const { trainers } = useSelector((state) => state.waitList);
  const { page_branches } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(fetchTrainerForWaitList());
    dispatch(getBranchesAllPages());
  }, [dispatch]);

  // Handler Array submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let myData = [];
    let Trainees = {};
    myData.push(
      { value: data?.branch, name: "branch" },
      { value: data?.full_name, name: "full_name" },
      { value: data?.phone_numbers_0, name: "phone_numbers_0" },
      { value: data?.phone_numbers_1, name: "phone_numbers_1" },
      { value: data?.country, name: "country" },
      { value: data?.age_group, name: "age_group" },
      { value: data?.attend_type, name: "attend_type" },
      { value: trainer_id, name: "trainer" },
      { value: data?.notes, name: "notes" },
      { value: data?.confirmation, name: "confirmation" },
      { value: time_id, name: "preferable_time" },
      { value: secondTime_id, name: "sec_preferable_time" },
      { value: level_id, name: "level" },
      { value: data?.job, name: "job" },
      { value: data?.education, name: "education" },
      { value: data?.email, name: "email" },
      { value: data?.city, name: "city" },
      { value: data?.brith_date, name: "brith_date" },
      { value: payment_id, name: "payment_type" },
      { value: data?.paid_value, name: "paid_value" },
      { value: data?.remaining_value, name: "remaining_value" }
    );

    myData.map((e) => {
      if (e.name === "phone_numbers_0") {
        Trainees = { ...Trainees, phone_numbers: [e.value.replace(/\s/g, "")] };
      }

      if (e.value && e.name === "phone_numbers_1") {
        Trainees = {
          ...Trainees,
          phone_numbers: [
            ...Trainees.phone_numbers,
            e.value.replace(/\s/g, ""),
          ],
        };
      }

      // Always include level, even when cleared (null)
      if (e.name === "level") {
        Trainees = { ...Trainees, level: e.value ?? null };
        return;
      }

      if (e.value) {
        if (e.name === "phone_numbers_0" || e.name === "phone_numbers_1")
          return;

        Trainees = {
          ...Trainees,
          [e.name]: e.value,
        };
      }
    });

    onSubmit(Trainees);
  };

  useEffect(() => {
    if (!edit && country === "Egypt") setAttendtype("Offline");
    if (!edit && age_group === "Teen") setAttendtype("Online");
  }, [country, edit, age_group]);

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
          margin: "20px 0 0",
          overflow: "auto",
        }}
      >
        {checkPermission({
          name: type,
          children: [
            "create_trainees",
            "update_trainees",
            "update_own_trainees",
          ],
        }) && (
            <>
              {page_branches?.current_branch && (
                <Branch
                  defaultValue={trainee?.branch}
                  branches={page_branches.branches}
                  current_branch={page_branches.current_branch}
                />
              )}
            </>
          )}

        <FullName value={fullName} setValue={setFullName} />

        <PhoneNumber
          id="phone_numbers_0"
          label="Mobile"
          required={true}
          setCountry={setCountry}
          value={trainee?.phone_number_0}
        />
        <PhoneNumber
          id="phone_numbers_1"
          label="secondary Mobile (Optional)"
          required={false}
          value={trainee?.phone_number_1}
        />
        <Select
          id="country"
          label="Country"
          options={countries}
          defaultValue={country}
          value={country}
          Icon={<BiWorld size={25} />}
          placeholder="Country"
          required={true}
        />
        <Select
          id="age_group"
          label="Age Group"
          options={[
            { id: 1, label: "Adult" },
            { id: 2, label: "Teen" },
          ]}
          defaultValue={trainee?.age_group || "Adult"}
          Icon={<FaPeopleGroup size={25} />}
          placeholder="Age Group"
          required={true}
          value={age_group}
          onChange={(e, v) => setAgeGroup(v.label)}
        />

        <Select
          id="attend_type"
          label="Attend Type"
          options={[
            { id: 1, label: "Online" },
            { id: 2, label: "Offline" },
            { id: 3, label: "Hybrid" },
            { id: 4, label: "Private" },
          ]}
          placeholder="Attend Type"
          defaultValue={trainee?.attend_type}
          value={attend_type}
          required={true}
          onChange={(e, v) => setAttendtype(v.label)}
        />

        <LevelsWait
          defaultValue={trainee?.level}
          required={false}
          onChange={(e, v) => setLevelid(v ? Number(v.id) : null)}
        />

        <Select
          id="trainer"
          label="Trainer"
          options={
            trainers?.users?.map((trainer) => ({
              id: trainer.id,
              label: trainer.full_name,
            })) || []
          }
          placeholder="Trainer"
          defaultValue={trainee?.trainer}
          required={true}
          onChange={(e) => setTrainerid(Number(e.target.dataset.value))}
        />

        <PreferableTime
          id="preferable_time"
          defaultValue={trainee?.preferable_time}
          onChange={(e) => setTimeid(Number(e.target.dataset.value))}
          attend_type={attend_type || trainee?.attend_type}
          age_group={age_group || trainee?.age_group}
          Button={true}
          required={false}
        />

        <PreferableTime
          id="sec_preferable_time"
          label={"Second Preferable time of slot (Optional)"}
          defaultValue={trainee?.sec_preferable_time}
          onChange={(e) => setSecondTimeid(Number(e.target.dataset.value))}
          attend_type={attend_type || trainee?.attend_type}
          age_group={age_group || trainee?.age_group}
          Button={false}
          showRemoveButton={false}
          required={false}
        />

        <PaymentType
          defaultValue={trainee?.payment_type}
          onChange={(e) => setPaymentid(Number(e.target.dataset.value))}
        />

        <Input
          id="paid_value"
          label="Paid Value (Optional)"
          placeholder="Paid Value"
          Icon={<MdOutlinePaid size={25} />}
          defaultValue={trainee?.paid_value}
        />

        <Input
          id="remaining_value"
          label="Remaining Value (Optional)"
          placeholder="Remaining Value"
          Icon={<MdOutlinePaid size={25} />}
          defaultValue={trainee?.remaining_value}
        />

        <TextArea
          id="notes"
          label="Notes"
          placeholder="Notes"
          defaultValue={trainee?.notes}
        />

        {/* ---Inside Advanced---  */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            width: "fit-content",
            color: "var(--bg-button)",
            cursor: "pointer",
            margin: "10px 0 0",
          }}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced <FaAngleDoubleRight />
        </span>

        {showAdvanced && (
          <>
            <Input
              id="job"
              label="Job (Optional)"
              placeholder="Job"
              defaultValue={trainee?.job}
            />

            <Input
              id="education"
              label="Education (Optional)"
              placeholder="Education"
              Icon={<PiStudentBold size={25} />}
              defaultValue={trainee?.education}
            />

            <Input
              id="email"
              label="Email (Optional)"
              type="email"
              placeholder="Email"
              Icon={<MdOutlineEmail size={25} />}
              defaultValue={trainee?.email}
            />

            <Input
              id="city"
              label="City (Optional)"
              placeholder="City"
              Icon={<PiCity size={25} />}
              defaultValue={trainee?.city}
            />

            <Input
              id="brith_date"
              label="Date of Birth (Optional)"
              placeholder="Date of Birth"
              type="date"
              Icon={<MdDateRange size={25} />}
              defaultValue={trainee?.brith_date}
            />
          </>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => ""}
          sx={{ margin: "20px 0 0px", gap: 1 }}
        >
          {isLoading && <Spinner />} {edit ? "Edit" : "Add"} Trainee
        </Button>
      </Box>
    </div>
  );
};

FormTrainee.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
  trainee: PropTypes.object,
  type: PropTypes.string,
};

export default FormTrainee;
