import { createRoot } from "react-dom/client";

import Router from "@Router/Router";
import axios from "axios";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/store";
import "./styles/globalStyle.css";
import { UserData } from "./util/UserData";

const user = UserData();

if (user?.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

axios.defaults.headers.common["X-API-KEY"] = `${
  import.meta.env.VITE_API_URL_KEY
}`;

// Disable axios caching to always fetch fresh data
axios.defaults.headers.common["Cache-Control"] = "no-cache, no-store, must-revalidate";
axios.defaults.headers.common["Pragma"] = "no-cache";
axios.defaults.headers.common["Expires"] = "0";

// Add request interceptor to add timestamp to prevent browser caching
axios.interceptors.request.use(
  (config) => {
    // Add timestamp to GET requests to prevent caching
    if (config.method === 'get' || config.method === 'put') {
      config.params = {
        ...config.params,
        _t: new Date().getTime()
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<p>Loading</p>}>
      <RouterProvider router={Router} />
      <ToastContainer />
    </Suspense>
  </Provider>
);
