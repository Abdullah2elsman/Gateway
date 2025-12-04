import { createRoot } from "react-dom/client";

import "./styles/globalStyle.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "@Router/Router";
import store from "./store/store";
import { UserData } from "./util/UserData";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

const user = UserData();

if (user?.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

axios.defaults.headers.common["X-API-KEY"] = `${
  import.meta.env.VITE_API_URL_KEY
}`;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<p>Loading</p>}>
      <RouterProvider router={Router} />
      <ToastContainer />
    </Suspense>
  </Provider>
);
