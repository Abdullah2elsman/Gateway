import Cookies from "js-cookie";

const DarkTheme = (darkmode, setDarkMode) => {
  const Theme = Cookies.get("Theme");

  if (Theme) {
    Cookies.set("Theme", Theme === "true" ? "false" : "true", {
      expires: Number(import.meta.env.VITE_DARKMODE_EXPIRES),
    });
    setDarkMode((prev) => (prev === "true" ? "false" : "true"));
    return;
  }

  Cookies.set("Theme", darkmode === "true" ? "false" : "true", {
    expires: Number(import.meta.env.VITE_DARKMODE_EXPIRES),
  });
  setDarkMode((prev) => (prev === "true" ? "false" : "true"));
};

export default DarkTheme;
