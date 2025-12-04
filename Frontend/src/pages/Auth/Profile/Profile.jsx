import { useEffect, useState } from "react";
import styles from "@styles/styles.module.css";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import profile_Img from "@assets/image/Avatar.png";
import { Box, Button } from "@mui/material";
import FullName from "@src/components/Gateway-System/Inputs/FullName";
import Email from "@src/components/Gateway-System/Inputs/Email";
import Password from "@src/components/Gateway-System/Inputs/Password";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import PhoneNumber from "@src/components/Gateway-System/Inputs/PhoneNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getUserSelf,
  updateUserProfile,
} from "@src/store/reducers/Auth/Profile/ProfileSlice";
import Select from "@src/components/Gateway-System/Inputs/Select";
import { countries } from "@src/shared/Countries";
import { BiWorld } from "react-icons/bi";
import PasswordChecklist from "react-password-checklist";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import Input from "@src/components/Gateway-System/Inputs/Input";
import { getBranchesAllPages } from "@src/store/reducers/Branches/BrancheSlice";
import { UserData } from "@src/util/UserData";
import checkPermission from "@src/util/CheckPermission";
import { MdOutlineEmail } from "react-icons/md";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [emailError, setEmailError] = useState({
    message: "",
    status: false,
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [showConfirmPasswords, setShowConfirmPasswords] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [PasswordMatch, setPasswordMatch] = useState(false);
  const [phoneError, setPhoneError] = useState({
    status: false,
    message: "",
  });
  const [country, setCountry] = useState("");
  const [img_profile, setImgProfile] = useState("");
  const [defaultValue, setDefalutValue] = useState({});

  const { token } = UserData();

  const dispatch = useDispatch();
  const { profile, error, loading } = useSelector((state) => state.profile);
  const { page_branches } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(getUserSelf());
    dispatch(getBranchesAllPages());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.user) {
      setFullName(profile?.user?.full_name || "");
      setDefalutValue(profile?.user);
    }
  }, [profile]);

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    let user;
    if (data?.phone_number_1) {
      user = {
        image: img_profile?.Img,
        full_name: data?.full_name,
        phone_numbers: [
          data?.phone_number_0.replace(/\s/g, ""),
          data?.phone_number_1.replace(/\s/g, ""),
        ],
        email: `${data?.email}@gatewaycommunity.net `,
        country: data?.country,
        branch: data?.branch,
      };
    } else {
      user = {
        image: img_profile?.Img,
        full_name: data?.full_name,
        phone_numbers: [data?.phone_number_0.replace(/\s/g, "")],
        email: `${data?.email}@gatewaycommunity.net `,
        country: data?.country,
        branch: data?.branch,
      };
    }

    if (data?.password) user.password = data?.password;
    if (data?.confirm_password) user.confirm_password = data?.confirm_password;
    if (data?.personal_email) user.personal_email = data?.personal_email;

    if (password !== passwordAgain) return;

    dispatch(updateUserProfile(user))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(getUserSelf());
      });
  };

  // show Error
  useEffect(() => {
    if (error) {
      ToastError(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  if (
    !checkPermission({
      name: "users",
      children: ["view_self"],
    })
  ) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div className={styles.containerPage}>
      <PathName path="Profile" />
      <div className={styles.containerPage_content}>
        <div className={styles.profile}>
          <div className={styles.profileTilte}>
            <img
              src={
                img_profile?.URL ||
                `${import.meta.env.VITE_API_URL_image}${
                  profile?.user?.user_image || ""
                }/${token}` ||
                profile_Img
              }
              loading="lazy"
              alt="profile"
            />

            <div className={styles.uploadFile}>
              <label htmlFor="fileUpload" className={styles.fileUpload}>
                <span>Upload Image</span>
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={(e) =>
                  setImgProfile({
                    URL: URL.createObjectURL(e.target.files[0]),
                    Img: e.target.files[0],
                  })
                }
              />
            </div>
          </div>
          <Box component={"form"} onSubmit={onSubmit} sx={{ width: "100%" }}>
            <FullName id="full_name" setValue={setFullName} value={fullName} />

            <Email
              value={defaultValue?.email}
              Error={emailError}
              setError={setEmailError}
            />

            {!defaultValue?.personal_email && (
              <Input
                id="personal_email"
                label="Personal Email"
                type="email"
                placeholder="Personal Email"
                required={false}
                Icon={<MdOutlineEmail size={25} />}
              />
            )}

            {defaultValue?.personal_email && (
              <Input
                id="personal_email"
                label="Personal Email"
                type="email"
                placeholder="Personal Email"
                required={false}
                defaultValue={defaultValue?.personal_email}
                Icon={<MdOutlineEmail size={25} />}
              />
            )}

            <Password
              id="password"
              label="Password"
              showType={showPasswords}
              setShowType={() => setShowPasswords(!showPasswords)}
              required={false}
              setValue={setPassword}
            />

            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={passwordAgain}
              style={{
                display:
                  password.length > 0 ||
                  passwordAgain.length > 0 ||
                  PasswordMatch
                    ? "block"
                    : "none",
              }}
              onChange={(isValid) => setPasswordMatch(isValid)}
            />

            <Password
              id="confirm_password"
              label="Confirm Password"
              showType={showConfirmPasswords}
              setShowType={() => setShowConfirmPasswords(!showConfirmPasswords)}
              required={false}
              setValue={setPasswordAgain}
            />

            <PhoneNumber
              id="phone_number_0"
              label="Mobile"
              value={defaultValue?.phone_number_0}
              setCountry={setCountry}
            />

            <PhoneNumber
              id="phone_number_1"
              label="Second Mobile"
              value={defaultValue?.phone_number_1}
            />

            <Select
              id="country"
              label="Country"
              options={countries}
              value={country || defaultValue?.country || ""}
              Icon={<BiWorld size={25} />}
              placeholder="Country"
              required={true}
              onChange={(e, v) => setCountry(v?.label)}
            />
            {checkPermission({
              name: "users",
              children: ["view_self_branch"],
            }) && (
              <>
                {page_branches?.current_branch && (
                  <Branch
                    defaultValue={defaultValue?.branch}
                    branches={page_branches.branches}
                    current_branch={page_branches.current_branch}
                  />
                )}
              </>
            )}

            <Button type="sumbit" variant="contained" sx={{ gap: 1 }}>
              {loading && <Spinner />} Edit Profile
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
