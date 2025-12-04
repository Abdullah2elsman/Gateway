import Cookies from "js-cookie";
import { AES, enc } from "crypto-js";

export const Permissions = () => {
  const cookie = Cookies.get("GateWay_VR");
  const cookie2 = Cookies.get("GateWay_VR2");
  const cookie3 = Cookies.get("GateWay_VR3");

  if (cookie || cookie2 || cookie3) {
    let permission = AES.decrypt(
      cookie,
      import.meta.env.VITE_WEBSITE_COOKIES_KEY
    );

    let permission2 = AES.decrypt(
      cookie2,
      import.meta.env.VITE_WEBSITE_COOKIES_KEY
    );

    let permission3 = AES.decrypt(
      cookie3,
      import.meta.env.VITE_WEBSITE_COOKIES_KEY
    );

    permission = JSON.parse(permission.toString(enc.Utf8));
    permission2 = JSON.parse(permission2.toString(enc.Utf8));
    permission3 = JSON.parse(permission3.toString(enc.Utf8));

    let permissions = { ...permission, ...permission2, ...permission3 };

    return permissions;
  }

  return null;
};
