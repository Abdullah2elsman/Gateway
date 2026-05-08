import { useEffect, useState } from "react";
import styles from "@styles/Auth.module.css";
import { UserData } from "@src/util/UserData";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "@src/store/reducers/Settings/SettingsSlice";
import { Helmet } from "react-helmet";
import { Box, Button, Typography } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import {
  clearError,
  forgetPassword,
} from "@src/store/reducers/Auth/Login/LoginSlice";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";

const ForgetPassword = () => {
  const User = UserData();
  const dispatch = useDispatch();

  const { settings } = useSelector((state) => state.settings);
  const { isLoading, isError } = useSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ status: false, message: "" });

  // Clear global errors when leaving the page
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Handle API errors
  useEffect(() => {
    if (isError) {
      if (isError.errors && isError.errors.email) {
        // Extract exact validation error (e.g., "The selected email is invalid.")
        setEmailError({ status: true, message: isError.errors.email[0] });
      } else {
        // Fallback for general server errors (like 500 Network Error)
        const errorMessage =
          isError.status || isError.message || "An error occurred";
        ToastError(errorMessage);
      }
    }
  }, [isError]);

  const onSubmit = (e) => {
    e.preventDefault();
    setEmailError({ status: false, message: "" });
    dispatch(clearError());

    // Basic frontend validation to prevent empty submissions
    if (!email.trim()) {
      setEmailError({ status: true, message: "Email is required." });
      return;
    }

    dispatch(forgetPassword(email))
      .unwrap()
      .then((response) => {
        ToastSuccess(response.status || "Password reset link sent to your email.");
        setEmail(""); // Clear the input after success
      })
      .catch((error) => {
        // Rejections are handled by the useEffect watching `isError`
        console.error("Submission failed:", error);
      });
  };

  if (User?.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.auth}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${
          settings?.site_title ? settings.site_title : "Gateway System"
        } | Forget-Password`}</title>
      </Helmet>

      <div className={styles.overlay}></div>
      <div className={styles.auth_content}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "25px", marginBottom: "10px" }}
        >
          Forget Password
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "var(--text-color)", marginBottom: "20px" }}
        >
          Enter your email address and we will send you a link to reset your password.
        </Typography>
        
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
        >
          <Input
            id="forget_password"
            label="Email Address"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError.status) {
                setEmailError({ status: false, message: "" });
                dispatch(clearError());
              }
            }}
            Error={emailError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={styles.button}
            disabled={isLoading}
            sx={{ padding: "12px", fontSize: "16px", textTransform: "none" }}
          >
            {isLoading && <Spinner />} Send Reset Link
          </Button>
        </Box>

        <div style={{ paddingTop: "25px", textAlign: "center" }}>
          <Link to={"/login"} style={{ color: "#2b6cb0", textDecoration: "none", fontWeight: "600" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
