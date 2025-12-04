import { Box, FormControl, FormLabel } from "@mui/material";
import Input from "@src/components/Gateway-System/Inputs/Input";
import PathName from "@src/components/Gateway-System/PathName/PathName";
import Spinner from "@src/components/Gateway-System/Spinner/Spinner";
import {
  clearError,
  fetchSettings,
  updateSettings,
} from "@src/store/reducers/Settings/SettingsSlice";
import checkPermission from "@src/util/CheckPermission";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import styles from "@styles/Settings.module.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useOutletContext } from "react-router-dom";

const Settings = () => {
  const context = useOutletContext();

  const dispatch = useDispatch();
  const { settings, error, loading, loadingSave } = useSelector(
    (state) => state.settings
  );

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const onSumbit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    let setting = {};

    if (data.get("site_title")) setting.site_title = data.get("site_title");
    if (data.get("site_logo")?.name) setting.site_logo = data.get("site_logo");

    dispatch(updateSettings(setting))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchSettings());
      });
  };

  useEffect(() => {
    if (error) {
      ToastError(error.message);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [dispatch, error]);

  if (
    !checkPermission({
      name: "settings",
      children: ["view_settings"],
    })
  ) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <div className={styles.Settings}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${context} | Settings`}</title>
      </Helmet>

      <PathName path="Settings" />
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner color="var(--text-black)" />
        </div>
      ) : (
        <div className={styles.Settings_content}>
          <Box
            component={"form"}
            onSubmit={onSumbit}
            sx={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
            <FormControl sx={{ gap: "5px", width: "100%" }}>
              <FormLabel htmlFor="site_title">Site Title</FormLabel>
              <Input
                type="text"
                id="site_title"
                placeholder="Site Title"
                defaultValue={settings?.site_title}
              />
            </FormControl>
            <FormControl sx={{ gap: "5px", width: "100%" }}>
              <FormLabel htmlFor="site_logo">Site Logo</FormLabel>
              <Input type="file" id="site_logo" placeholder="Site Logo" />
            </FormControl>

            <button
              disabled={
                !checkPermission({
                  name: "settings",
                  children: ["update_settings"],
                })
              }
            >
              {loadingSave && <Spinner color="var(--text-white)" />} Save
            </button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Settings;
