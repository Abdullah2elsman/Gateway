import propTypes from "prop-types";
import { Box, Button, FormControl, FormLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import PasswordChecklist from "react-password-checklist";
import FullName from "@src/components/Gateway-System/Inputs/FullName";
import Email from "@src/components/Gateway-System/Inputs/Email";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import Password from "@src/components/Gateway-System/Inputs/Password";
import PhoneNumber from "@src/components/Gateway-System/Inputs/PhoneNumber";
import { validationSignUp } from "@src/validation/Auth/Auth";
import Select from "@src/components/Gateway-System/Inputs/Select";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "@src/store/reducers/Role/RoleSlice";
import { countries } from "@src/shared/Countries";
import { BiWorld } from "react-icons/bi";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { getBranchesAllPages } from "@src/store/reducers/Branches/BrancheSlice";
import checkPermission from "@src/util/CheckPermission";

const FormUser = ({ onSubmit, updateUser, edit, error, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameError, setNameError] = useState({
    status: false,
    message: "",
  });
  const [emailError, setEmailError] = useState({
    status: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });
  const [confirmpasswordError, setConfirmPasswordError] = useState({
    status: false,
    message: "",
  });
  const [fullName, setFullName] = useState(updateUser?.full_name || "");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [PasswordMatch, setPasswordMatch] = useState(false);
  const [phoneError, setPhoneError] = useState({
    status: false,
    message: "",
  });
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const { page_branches } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(getBranchesAllPages());
  }, [dispatch]);

  const validateInputs = () => {
    const name = document.getElementById("full_name");
    const email = document.getElementById("email");
    const branch = document.getElementById("branch");
    const phoneNumber = document.getElementsByName("phone")[0];

    validationSignUp(
      name,
      email,
      branch,
      phoneNumber,
      PasswordMatch,
      setNameError,
      setEmailError,
      setPasswordError,
      setConfirmPasswordError,
      setPhoneError
    );
  };

  const {
    roles: { roles },
  } = useSelector((state) => state.role);

  useEffect(() => {
    checkPermission({ name: "users", children: ["view_roles"] }) &&
      dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <div style={{ padding: "50px auto" }}>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
          margin: "20px 0 0",
          overflow: "auto",
        }}
      >
        <FullName Error={nameError} value={fullName} setValue={setFullName} />
        <Email
          Error={emailError}
          setError={setEmailError}
          value={updateUser?.email}
        />
        <FormControl sx={{ gap: "10px" }}>
          <Password
            Error={edit ? "" : passwordError}
            label="Password"
            id="password"
            value={password}
            setValue={setPassword}
            showType={showPassword}
            setShowType={setShowPassword}
            required={edit ? false : true}
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            style={{
              color: "var(--text-gray)",
              display:
                password.length > 0 || passwordAgain.length > 0 || PasswordMatch
                  ? "block"
                  : "none",
            }}
            onChange={(isValid) => setPasswordMatch(isValid)}
          />
        </FormControl>
        <FormControl sx={{ gap: "10px" }}>
          <Password
            Error={edit ? "" : confirmpasswordError}
            label="Confirm Password"
            id="confirm_password"
            value={passwordAgain}
            setValue={setPasswordAgain}
            showType={showConfirmPassword}
            setShowType={setShowConfirmPassword}
          />
        </FormControl>
        <PhoneNumber
          id="phone"
          label="Mobile"
          Error={phoneError}
          value={updateUser?.phone_number_0 || ""}
          required={true}
          setCountry={setCountry}
        />
        <PhoneNumber
          id="second_Phone"
          label="second Mobile (Optional)"
          value={updateUser?.phone_number_1 || ""}
          required={false}
        />
        <Select
          id="country"
          label="Country"
          options={countries}
          defaultValue={country || updateUser?.country || ""}
          value={country || updateUser?.country || ""}
          Icon={<BiWorld size={25} />}
          placeholder="Country"
        />

        {checkPermission({
          name: "users",
          children: ["create_users", "update_users"],
        }) && (
          <>
            {page_branches?.current_branch && (
              <Branch
                id="branch_user"
                branches={page_branches.branches}
                current_branch={page_branches.current_branch}
                defaultValue={updateUser?.branch}
              />
            )}
          </>
        )}

        {edit && (
          <>
            {checkPermission({
              name: "users",
              children: ["update_all_roles", "update_own_role"],
            }) && (
              <Select
                id="role"
                label="Role"
                options={
                  roles?.map((role) => ({
                    id: role.id,
                    label: role?.role_title,
                  })) || []
                }
                defaultValue={updateUser?.role}
                placeholder="Choose a role"
              />
            )}

            {checkPermission({
              name: "users",
              children: ["update_all_status", "update_all_status"],
            }) && (
              <FormControl sx={{ gap: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel sx={{ color: "var(--text-gray)" }}>
                    Active
                  </FormLabel>
                  <Switch
                    id="is_activated"
                    name="is_activated"
                    defaultChecked={updateUser?.status}
                  />
                </Box>
              </FormControl>
            )}
          </>
        )}
        <p className="Error">{error}</p>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          sx={{ margin: "20px 0 0px", gap: 1 }}
        >
          {isLoading && <Spinner />} {edit ? "Edit" : "Add"} User
        </Button>
      </Box>
    </div>
  );
};

FormUser.propTypes = {
  onSubmit: propTypes.func,
  updateUser: propTypes.any,
  edit: propTypes.bool,
  error: propTypes.string,
  isLoading: propTypes.bool,
};

export default FormUser;
