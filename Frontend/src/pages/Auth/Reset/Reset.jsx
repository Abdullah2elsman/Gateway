import { useEffect, useState } from "react";
import styles from "@styles/Auth.module.css";
import { Helmet } from "react-helmet";
import { UserData } from "@src/util/UserData";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "@src/store/reducers/Settings/SettingsSlice";
import { Box, Button, FormControl, Typography } from "@mui/material";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import { clearError, resetPassword } from "@src/store/reducers/Auth/Login/LoginSlice";
import Password from "@src/components/Gateway-System/Inputs/Password";
import PasswordChecklist from "react-password-checklist";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";

const Reset = () => {
  const User = UserData();
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { settings } = useSelector((state) => state.settings);
  const { isLoading } = useSelector((state) => state.login);

  // Read token and email directly from URL
  const urlParams = new URLSearchParams(search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [PasswordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    dispatch(fetchSettings());
    return () => dispatch(clearError());
  }, [dispatch]);

  // If already logged in, redirect home
  if (User?.token) {
    return <Navigate to="/" replace />;
  }

  // If no token in URL, show error
  if (!token || !email) {
    return (
      <div className={styles.auth}>
        <div className={styles.overlay}></div>
        <div className={styles.auth_content}>
          <Typography component="h1" variant="h4" sx={{ fontSize: "22px", mb: 2 }}>
            Invalid Reset Link
          </Typography>
          <Typography sx={{ mb: 3, color: "var(--text-color)" }}>
            This link is invalid or has expired. Please request a new one.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/forget-password")}
            sx={{ padding: "12px", textTransform: "none", fontSize: "15px" }}
          >
            Request New Link
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!PasswordMatch) {
      ToastError("Passwords do not match or do not meet the required criteria.");
      return;
    }

    // Exactly what the API needs
    const payload = {
      email: email,
      token: token,
      password: password,
      password_confirmation: passwordAgain,
    };

    dispatch(resetPassword(payload))
      .unwrap()
      .then(({ status }) => {
        ToastSuccess(status || "Password reset successfully!");
        navigate("/login");
      })
      .catch((error) => {
        const message = error?.status || error?.message || "An error occurred.";
        ToastError(message);
      });
  };

  return (
    <div className={styles.auth}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${settings?.site_title || "Gateway System"} | Reset Password`}</title>
      </Helmet>

      <div className={styles.overlay}></div>
      <div className={styles.auth_content}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "25px", marginBottom: "10px" }}
        >
          Reset Password
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--text-color)", mb: 2 }}>
          Resetting password for: <strong>{email}</strong>
        </Typography>

        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}
        >
          <FormControl sx={{ gap: 1 }}>
            <Password
              id="password"
              label="New Password"
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
                display: password.length > 0 || passwordAgain.length > 0 ? "block" : "none",
              }}
              onChange={(isValid) => setPasswordMatch(isValid)}
            />
          </FormControl>

          <FormControl sx={{ gap: "10px" }}>
            <Password
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
            disabled={isLoading}
            sx={{ gap: 1, padding: "12px", fontSize: "16px", textTransform: "none" }}
          >
            {isLoading && <Spinner />} Reset Password
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Reset;
