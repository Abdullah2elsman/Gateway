import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    dispatch(forgetPassword(data.get("forget_password")))
      .unwrap()
      .then(({ status }) => {
        ToastSuccess(status);
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
        } | Forget-Password`}</title>
      </Helmet>

      <div className={styles.overlay}></div>
      <div className={styles.auth_content}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "25px" }}
        >
          Forget Password
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",

            gap: 5,
            margin: "20px 0 0",
          }}
        >
          <Input
            id="forget_password"
            label="Email"
            placeholder="example@example.com"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={styles.button}
          >
            {isLoading && <Spinner />} Send
          </Button>
        </Box>

        <div style={{ paddingTop: "20px" }}>
          <Link to={"/login"} style={{ color: "#2b6cb0" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
