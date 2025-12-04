import { toast } from "react-toastify";

export const ToastSuccess = (message, position) => {
  return toast.success(message, {
    position: position || "top-right",
    autoClose: 5000,
    closeOnClick: true,
  });
};

export const ToastError = (message) => {
  return toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
  });
};
