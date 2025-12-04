import { useEffect, useState } from "react";
import styles from "@styles/Auth.module.css";

import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment, Link } from "@mui/material";
import {
  MdLockOutline,
  MdOutlineVisibilityOff,
  MdVisibility,
} from "react-icons/md";
import { validationLogin } from "@validation/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createLogin,
} from "@src/store/reducers/Auth/Login/LoginSlice";
import Email from "@src/components/Gateway-System/Inputs/Email";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import { UserData } from "@src/util/UserData";
import { ToastSuccess } from "@src/util/Toast";
import { fetchSettings } from "@src/store/reducers/Settings/SettingsSlice";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState({
    status: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });
  const User = UserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.login);
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Submit the login
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    let user = {
      email: `${data.email}@gatewaycommunity.net`,
      password: data.password,
      remember: data.remember === "remember" ? true : false,
    };

    dispatch(createLogin(user))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        navigate("/", { replace: true });
      });
  };

  // Validation
  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    validationLogin(email, password, setEmailError, setPasswordError);
  };

  useEffect(() => {
    if (isError?.message) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [dispatch, isError]);

  if (User?.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.auth}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${
          settings?.site_title ? settings.site_title : "Gateway System"
        } | Login`}</title>
      </Helmet>

      <div className={styles.overlay}></div>
      <div className={styles.auth_content}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",

            gap: 5,
            margin: "20px 0 0",
          }}
        >
          <Email Error={emailError} setError={setEmailError} />

          <FormControl sx={{ gap: "10px" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              placeholder="Password"
              autoComplete="password"
              error={passwordError.status}
              helperText={passwordError.message}
              color={passwordError.status ? "error" : "primary"}
              sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#265255', 
                        borderWidth: 2, 
                      },
                    },
                  }}
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
          </FormControl>

          <Box
            component={"div"}
            sx={{
              display: "fex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
              margin: "auto",
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="#265255" />}
              label="Keep me logged in"
              name="remember"
            />
            <div>
              <Link
                onClick={() => navigate("/forget-password")}
                variant="body2"
                sx={{ cursor: "pointer", alignSelf: "baseline", color:"#265255" }}
              >
                Forgot your password?
              </Link>
            </div>
          </Box>

          <p className="Error">{isError?.message}</p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            className={styles.button}
          >
            {isLoading && <Spinner />} Login
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?
            <span>
              <NavLink to={"/signup"} className={styles.link}>
                Sign up
              </NavLink>
            </span>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Login;
