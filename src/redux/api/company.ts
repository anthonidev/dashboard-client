import axios from "axios";
import { toast } from "react-toastify";
import { getStoreLocal } from "../../utils/helpers/helpStore";
import { setLoading } from "../slices/companySlice";
import { AppDispatch } from "../store";
import { loadUserService } from "./auth";

const configInitialService =
  (
    firstname: string,
    lastname: string,
    phone: string,
    dni: string,
    enterprice: string,
    ruc: string
  ) =>
  async (dispatch: AppDispatch) => {
    if (getStoreLocal("access")) {
      dispatch(setLoading());
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/company/config`,
          JSON.stringify({
            firstname,
            lastname,
            phone,
            dni,
            enterprice,
            ruc,
          }),
          {
            headers: {
              Accept: "application/json",
              Authorization: `JWT ${getStoreLocal("access")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.ok);
          dispatch(loadUserService());
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        })
        .finally(() => {
          dispatch(setLoading());
        });
    } else {
      toast.error("No hay token de acceso");
    }
  };

export { configInitialService };
