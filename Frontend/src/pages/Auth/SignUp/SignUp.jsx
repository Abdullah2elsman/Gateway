import { useEffect, useState } from "react";
import styles from "@styles/Auth.module.css";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment } from "@mui/material";
import {
  MdLockOutline,
  MdOutlineEmail,
  MdOutlineLockPerson,
  MdOutlineVisibilityOff,
  MdVisibility,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PasswordChecklist from "react-password-checklist";
import { validationSignUp } from "@validation/Auth/Auth";
import { FullNameValidator } from "@src/validation/FullName";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSuccess,
  createSignUp,
} from "@src/store/reducers/Auth/Signup/SignupSlice";
import Select from "@src/components/Gateway-System/Inputs/Select";
import { countries } from "@src/shared/Countries";
import { BiWorld } from "react-icons/bi";
import { UserData } from "@src/util/UserData";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { clearError } from "@src/store/reducers/Users/UsersSlice";
import BranchGuest from "@src/components/Gateway-System/Inputs/BranchGuest";
import { fetchSettings } from "@src/store/reducers/Settings/SettingsSlice";
import { Helmet } from "react-helmet";

export default function SignUp() {
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
  const [branchError, setBranchError] = useState({
    status: false,
    message: "",
  });
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [PasswordMatch, setPasswordMatch] = useState(false);
  const [phoneError, setPhoneError] = useState({
    status: false,
    message: "",
  });
  const [country, setCountry] = useState("");

  const User = UserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector((state) => state.register);
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Validation errors Form
  const validateInputs = () => {
    const name = document.getElementById("full_name");
    const email = document.getElementById("email");
    const branch = document.getElementById("branch");
    const phoneNumber = document.getElementsByName("phone_numbers_0")[0];

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
      setBranchError,
      setPhoneError
    );
  };

  // Submit Signup
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirm_password) return;

    let user;

    if (data.phone_numbers_1) {
      user = {
        full_name: data.full_name,
        email: `${data.email}@gatewaycommunity.net`,
        password: data.password,
        confirm_password: data.confirm_password,
        branch: data.branch,
        phone_numbers: [
          data.phone_numbers_0.replace(/\s/g, ""),
          data.phone_numbers_1.replace(/\s/g, ""),
        ],
        country: data.country,
      };
    } else {
      user = {
        full_name: data.full_name,
        email: `${data.email}@gatewaycommunity.net`,
        password: data.password,
        confirm_password: data.confirm_password,
        branch: data.branch,
        phone_numbers: [data.phone_numbers_0.replace(/\s/g, "")],
        country: data.country,
      };
    }

    dispatch(createSignUp(user))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        navigate("/login");
      });
  };

  useEffect(() => {
    if (error) {
      ToastError(error?.message);

      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }

    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }
  }, [error, success, dispatch]);

  if (User?.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.auth}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${
          settings?.site_title ? settings.site_title : "Gateway System"
        } | Signup`}</title>
      </Helmet>

      <div className={styles.overlay}></div>
      <div className={styles.auth_content}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
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
          <FormControl sx={{ gap: "10px" }}>
            <FormLabel htmlFor="full_name">Full name</FormLabel>
            <TextField
              autoComplete="full_name"
              name="full_name"
              required
              fullWidth
              id="full_name"
              placeholder="Full name"
              error={nameError.status}
              helperText={nameError.message}
              color={nameError.status ? "error" : "primary"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegUser size={20} />
                    </InputAdornment>
                  ),
                },
              }}
              value={fullName}
              onChange={(e) => {
                FullNameValidator(e.target.value, setFullName);
              }}
              onKeyDown={(e) => /^[a-zA-Z\s]+$/.test(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ gap: "10px" }}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError.status}
              helperText={emailError.message}
              color={emailError.status ? "error" : "primary"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineEmail size={25} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <span>@gatewaycommunity.net</span>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ gap: "10px" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError.status}
              helperText={passwordError.message}
              color={passwordError.status ? "error" : "primary"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLockOutline size={25} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <MdVisibility size={25} />
                        ) : (
                          <MdOutlineVisibilityOff size={25} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
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
          </FormControl>
          <FormControl sx={{ gap: "10px" }}>
            <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
            <TextField
              required
              fullWidth
              name="confirm_password"
              placeholder="••••••"
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              autoComplete="new-password"
              variant="outlined"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              error={confirmpasswordError.status}
              helperText={confirmpasswordError.message}
              color={confirmpasswordError.status ? "error" : "primary"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineLockPerson size={25} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <MdVisibility size={25} />
                        ) : (
                          <MdOutlineVisibilityOff size={25} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ gap: "10px" }}>
            <FormLabel htmlFor="phone_numbers_0">Mobile</FormLabel>
            <PhoneInput
              name="phone_numbers_0"
              country={"eg"}
              required
              containerStyle={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
              inputStyle={{
                width: "100%",
                paddingTop: "27px",
                paddingBottom: "27px",
              }}
              inputClass={styles.phoneInput}
              buttonClass={styles.buttonInput}
              containerClass={styles.ContainerphoneInput}
              inputProps={{
                name: "phone_numbers_0",
                inputMode: "numeric",
                required: true,
              }}
              isValid={() => {
                return phoneError.status ? false : true;
              }}
              defaultErrorMessage={phoneError.message}
              onChange={(value, country) =>
                setCountry ? setCountry(country.name) : ""
              }
            />
          </FormControl>
          <FormControl sx={{ gap: "10px" }}>
            <FormLabel htmlFor="phone_numbers_1">
              Second Mobile (Optional)
            </FormLabel>
            <PhoneInput
              name="phone_numbers_1"
              required
              containerStyle={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
              inputStyle={{
                width: "100%",
                paddingTop: "27px",
                paddingBottom: "27px",
              }}
              inputClass={styles.phoneInput}
              buttonClass={styles.buttonInput}
              containerClass={styles.ContainerphoneInput}
              inputProps={{
                name: "phone_numbers_1",
                inputMode: "numeric",
              }}
            />
          </FormControl>

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

          <BranchGuest Error={branchError} />

          <p className="Error">{error?.message}</p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            className={styles.button}
          >
            {isLoading && <Spinner />} Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <span>
              <NavLink to={"/login"} className={styles.link}>
                Sign in
              </NavLink>
            </span>
          </Typography>
        </Box>
      </div>
    </div>
  );
}
