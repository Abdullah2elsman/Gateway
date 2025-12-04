import { useEffect, useState } from "react";
import styles from "@styles/Auth.module.css";
import { Helmet } from "react-helmet";
import { UserData } from "@src/util/UserData";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "@src/store/reducers/Settings/SettingsSlice";
import { Box, Button, FormControl, Typography } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import {
  clearError,
  resetPassword,
} from "@src/store/reducers/Auth/Login/LoginSlice";
import Password from "@src/components/Gateway-System/Inputs/Password";
import PasswordChecklist from "react-password-checklist";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });
  const [confirmpasswordError, setConfirmPasswordError] = useState({
    status: false,
    message: "",
  });
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [PasswordMatch, setPasswordMatch] = useState(false);

  const User = UserData();
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { settings } = useSelector((state) => state.settings);
  const { isLoading, isError } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const validateInputs = () => {
    let isValid = true;

    if (!PasswordMatch) {
      setPasswordError({
        status: true,
        message: "Password is required.",
      });

      setConfirmPasswordError({
        status: true,
        message: "Confirm Password is required.",
      });

      isValid = false;
    } else {
      setPasswordError({
        status: false,
        message: "",
      });
      setConfirmPasswordError({
        status: false,
        message: "",
      });
    }

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let Reset = {
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      token: search.slice(7, search.length),
    };

    if (Reset.password !== Reset.password_confirmation) return;

    dispatch(resetPassword(Reset))
      .unwrap()
      .then(({ status }) => {
        ToastSuccess(status);
        navigate("/login");
      });
  };

  useEffect(() => {
    if (isError) {
      ToastError(isError.status);
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [isError, dispatch]);

  if (User?.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.auth}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${
          settings?.site_title ? settings.site_title : "Gateway System"
        } | reset-password`}</title>
      </Helmet>

      <div className={styles.overlay}></div>
      <div className={styles.auth_content}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "25px" }}
        >
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 3,
            margin: "20px 0 0",
          }}
        >
          <Input
            id="email"
            label="Email"
            placeholder="example@example.com"
            required={true}
          />

          <FormControl sx={{ gap: 1 }}>
            <Password
              id="password"
              label="New Password"
              Error={passwordError}
              value={password}
              setValue={setPassword}
              showType={showPassword}
              setShowType={setShowPassword}
              required={true}
            />
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={passwordAgain}
              style={{
                color: "var(--text-gray)",
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
            <Password
              Error={confirmpasswordError}
              label="Confirm New Password"
              id="password_confirmation"
              value={passwordAgain}
              setValue={setPasswordAgain}
              showType={showConfirmPassword}
              setShowType={setShowConfirmPassword}
              required={true}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={styles.button}
            onClick={validateInputs}
            sx={{ gap: 1 }}
          >
            {isLoading && <Spinner />} Reset Password
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Reset;
