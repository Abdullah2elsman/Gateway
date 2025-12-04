import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdDateRange, MdOutlineEmail, MdOutlinePaid } from "react-icons/md";
import { FaAngleDoubleRight } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

import FullName from "@components/Gateway-System/Inputs/FullName";
import PhoneNumber from "@src/components/Gateway-System/Inputs/PhoneNumber";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import Select from "@src/components/Gateway-System/Inputs/Select";
import TextArea from "@src/components/Gateway-System/Inputs/TextArea";
import Date from "@src/components/Gateway-System/Inputs/DateAndTime";
import { countries } from "@src/shared/Countries";
import Input from "@src/components/Gateway-System/Inputs/Input";
import { PiCity, PiStudentBold } from "react-icons/pi";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import FollowUp from "@src/components/Gateway-System/Inputs/PendingTest/FollowUp/FollowUp";
import PaymentType from "@src/components/Gateway-System/Inputs/PendingTest/PaymentType/PaymentType";
import { useDispatch, useSelector } from "react-redux";
import { getBranchesAllPages } from "@src/store/reducers/Branches/BrancheSlice";
import checkPermission from "@src/util/CheckPermission";

const PendingTest = ({ onSubmit, edit, isLoading, data }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fullName, setFullName] = useState(data?.full_name || "");
  const [country, setCountry] = useState(data?.country || "");
  const [payment_id, setPaymentId] = useState("");
  const [follow_id, setFollowId] = useState("");
  const [attend_type, setAttendtype] = useState(data?.attend_type || "");
  const [age_group, setAgeGroup] = useState(data?.age_group || "");

  const dispatch = useDispatch();

  const { page_branches } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(getBranchesAllPages());
  }, [dispatch]);

  const handlerSubmit = (event) => {
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
      { value: data?.notes, name: "notes" },
      { value: data?.job, name: "job" },
      { value: data?.education, name: "education" },
      { value: data?.email, name: "email" },
      { value: data?.city, name: "city" },
      { value: data?.brith_date, name: "brith_date" },
      { value: Number(payment_id), name: "payment_type" },
      { value: data?.paid_value, name: "paid_value" },
      { value: data?.remaining_value, name: "remaining_value" },
      { value: Number(follow_id), name: "follow_up" },
      { value: data?.test_date, name: "test_date" }
    );

    myData.map((e) => {
      if (e.name === "phone_numbers_0") {
        Trainees = {
          ...Trainees,
          phone_numbers: [e.value.replace(/\s/g, "")],
        };
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

      if (e.value) {
        if (e.name === "phone_numbers_0" || e.name === "phone_numbers_1")
          return;

        Trainees = { ...Trainees, [e.name]: e.value };
      }
    });

    onSubmit(Trainees);
  };

  useEffect(() => {
    if (!edit && country === "Egypt") setAttendtype("Offline");
    if (!edit && age_group === "Teen") setAttendtype("Online");
  }, [country, edit, age_group]);

  return (
    <Box
      component="form"
      onSubmit={handlerSubmit}
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
        name: "pendinglist",
        children: ["create_trainees", "update_trainees", "update_own_trainees"],
      }) && (
        <>
          {page_branches?.current_branch && (
            <Branch
              branches={page_branches.branches}
              current_branch={page_branches.current_branch}
              defaultValue={data?.branch}
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
        value={data?.phone_number_0}
      />
      <PhoneNumber
        id="phone_numbers_1"
        label="secondary Mobile (Optional)"
        required={false}
        value={data?.phone_number_1}
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
        options={[{ label: "Adult" }, { label: "Teen" }]}
        defaultValue={data?.age_group || "Adult"}
        Icon={<FaPeopleGroup size={25} />}
        placeholder="Age Group"
        required={true}
        onChange={(e, v) => setAgeGroup(v.label)}
      />
      <Select
        id="attend_type"
        label="Attend Type"
        options={[
          { label: "Online" },
          { label: "Offline" },
          { label: "Hybrid" },
          { label: "Private" },
        ]}
        placeholder="Attend Type"
        defaultValue={data?.attend_type}
        required={true}
        value={attend_type}
        onChange={(e, v) => setAttendtype(v.label)}
      />
      <Date id="test_date" label="Test Date" defaultValue={data?.test_date} />

      <PaymentType
        defaultValue={data?.payment_type}
        onChange={(e) => setPaymentId(e.target.dataset.value)}
      />

      <Input
        id="paid_value"
        label="Paid Value (Optional)"
        placeholder="Paid Value"
        Icon={<MdOutlinePaid size={25} />}
        defaultValue={data?.paid_value}
      />

      <Input
        id="remaining_value"
        label="Remaining Value (Optional)"
        placeholder="Remaining Value"
        Icon={<MdOutlinePaid size={25} />}
        defaultValue={data?.remaining_value}
      />

      <TextArea
        id="notes"
        label="Notes"
        placeholder="Notes"
        defaultValue={data?.notes}
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
            id="brith_date"
            label="Date of Birth (Optional)"
            placeholder="Date of Birth"
            type="date"
            Icon={<MdDateRange size={25} />}
            defaultValue={data?.brith_date}
          />
          <Input
            id="city"
            label="City (Optional)"
            placeholder="City"
            Icon={<PiCity size={25} />}
            defaultValue={data?.city}
          />
          <Input
            id="email"
            label="Email (Optional)"
            type="email"
            placeholder="Email"
            Icon={<MdOutlineEmail size={25} />}
            defaultValue={data?.email}
          />
          <Input
            id="education"
            label="Eduction (Optional)"
            placeholder="Eduction"
            Icon={<PiStudentBold size={25} />}
            defaultValue={data?.education}
          />
          <Input
            id="job"
            label="Job (Optional)"
            placeholder="Job"
            defaultValue={data?.job}
          />

          <FollowUp
            defaultValue={data?.follow_up}
            setStateId={setFollowId}
            required={false}
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
        {isLoading && <Spinner />} {edit ? "Edit" : "Add"} Pending Test
      </Button>
    </Box>
  );
};

PendingTest.propTypes = {
  onSubmit: PropTypes.func,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
  data: PropTypes.object,
};

export default PendingTest;
