import Cookies from "js-cookie";
import { AES, enc } from "crypto-js";

export const UserData = () => {
  const cookie = Cookies.get("GateWay_user");

  if (cookie) {
    let user = AES.decrypt(cookie, import.meta.env.VITE_WEBSITE_COOKIES_KEY);
    user = user.toString(enc.Utf8);

    // console.log(JSON.parse(user));
    return JSON.parse(user);
  }

  return null;
};
