import Header from "@components/common/Header/Header";
import Sidebar from "@components/common/Sidebar/Sidebar";
import { useCallback, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import DarkTheme from "@src/util/DarkMode";
import Footer from "@src/components/common/Footer/Footer";
import { UserData } from "@src/util/UserData";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "@src/store/reducers/Settings/SettingsSlice";

const MainLayout = () => {
  const [darkmode, setDarkMode] = useState(Cookies.get("Theme") || "false");
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const User = UserData();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Dark Mode
  useEffect(() => {
    if (darkmode === "true") {
      document.body.classList.add("dark");
    } else if (darkmode === "false") {
      document.body.classList.remove("dark");
    }
  }, [darkmode]);

  // close sidebar menu
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpenMenu(false);
      }
    });
  }, []);

  // Dark Mode
  const handleDarkMode = useCallback(() => {
    DarkTheme(darkmode, setDarkMode);
  }, [darkmode]);

  if (!User?.token) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <Sidebar
        darkmode={darkmode}
        handleDarkMode={handleDarkMode}
        isOpenMenu={isOpenMenu}
        isCloseMenu={() => setIsOpenMenu(false)}
      />
      <div className="content">
        <Header handleOpenMenu={() => setIsOpenMenu(!isOpenMenu)} />
        <Outlet context={settings?.site_title || "Gateway System"} />
        <Footer site_title={settings?.site_title || "Gateway System"} />
      </div>
    </div>
  );
};

export default MainLayout;
