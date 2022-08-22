import { toast } from "react-toastify";
import { offAlert, onAlert } from "../slices/alertSlice";
import { AppDispatch } from "../store";

export const setAlert =
  (msg: string, type: string, timeout = 4000) =>
  (dispatch: AppDispatch) => {
    dispatch(onAlert({ msg, type }));
    return setTimeout(() => dispatch(offAlert()), timeout);
  };

export const setError = (msg: string) => toast.warn(msg);
