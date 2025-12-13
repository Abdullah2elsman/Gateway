import profile_Img from "@assets/image/Avatar.png";
import { Box, Button } from "@mui/material";
import Branch from "@src/components/Gateway-System/Inputs/Branch";
import Email from "@src/components/Gateway-System/Inputs/Email";
import FullName from "@src/components/Gateway-System/Inputs/FullName";
import Input from "@src/components/Gateway-System/Inputs/Input";
import Password from "@src/components/Gateway-System/Inputs/Password";
import PhoneNumber from "@src/components/Gateway-System/Inputs/PhoneNumber";
import Select from "@src/components/Gateway-System/Inputs/Select";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { countries } from "@src/shared/Countries";
import {
    clearError,
    getUserSelf,
    updateUserProfile,
} from "@src/store/reducers/Auth/Profile/ProfileSlice";
import { getBranchesAllPages } from "@src/store/reducers/Branches/BrancheSlice";
import checkPermission from "@src/util/CheckPermission";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { UserData } from "@src/util/UserData";
import styles from "@styles/styles.module.css";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import PasswordChecklist from "react-password-checklist";
import { useDispatch, useSelector } from "react-redux";
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
      console.log("Profile data updated:", profile.user);
      console.log("User image path:", profile.user.user_image);
      setFullName(profile?.user?.full_name || "");
      setDefalutValue(profile?.user);
    }
  }, [profile]);

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Create a new FormData object for proper multipart/form-data submission
    const submitFormData = new FormData();
    
    // Add the image file if selected
    if (img_profile?.Img) {
      submitFormData.append('image', img_profile.Img);
    }
    
    // Add other form fields
    submitFormData.append('full_name', data?.full_name || '');
    submitFormData.append('email', `${data?.email}@gatewaycommunity.net`);
    submitFormData.append('country', data?.country || '');
    submitFormData.append('branch', data?.branch || '');
    
    // Handle phone numbers as array
    const phoneNumbers = [data?.phone_number_0?.replace(/\s/g, "") || ''];
    if (data?.phone_number_1) {
      phoneNumbers.push(data?.phone_number_1.replace(/\s/g, ""));
    }
    
    // Append phone numbers as array elements
    phoneNumbers.forEach((phone, index) => {
      submitFormData.append(`phone_numbers[${index}]`, phone);
    });
    
    // Add optional fields
    if (data?.password) submitFormData.append('password', data.password);
    if (data?.confirm_password) submitFormData.append('confirm_password', data.confirm_password);
    if (data?.personal_email) submitFormData.append('personal_email', data.personal_email);

    if (password !== passwordAgain) return;

    // Debug: Log what's being sent
    console.log("Submitting profile update with image:", img_profile?.Img);
    for (let [key, value] of submitFormData.entries()) {
      console.log(key, value);
    }

    dispatch(updateUserProfile(submitFormData))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        // Refresh user data first, then clear preview
        dispatch(getUserSelf()).then(() => {
          // Clear the selected image preview after user data is refreshed
          setImgProfile("");
        });
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        ToastError(error.message || "Failed to update profile");
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
              src={(() => {
                const imageUrl = img_profile?.URL || // Show preview of selected image
                  (profile?.user?.user_image 
                    ? `${import.meta.env.VITE_API_URL_image}${profile.user.user_image}/${token}`
                    : profile_Img); // Fallback to default avatar
                
                console.log("Image URL:", imageUrl);
                console.log("Profile user image:", profile?.user?.user_image);
                console.log("Token:", token);
                console.log("API URL Image:", import.meta.env.VITE_API_URL_image);
                
                return imageUrl;
              })()}
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
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    console.log("Image selected:", file.name, file.size, file.type);
                    setImgProfile({
                      URL: URL.createObjectURL(file),
                      Img: file,
                    });
                  }
                }}
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
