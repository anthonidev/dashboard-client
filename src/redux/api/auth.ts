/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { getStoreLocal } from "../../utils/helpers/helpStore";
import { Message } from "../../utils/types/reduxInterface";
import {
  loginOk,
  failClear,
  loadingOn,
  loadingOff,
  loadedUser,
  userFail,
  authenticatedOk,
  refreshOk,
  redirectConfirmed,
  redirectLogin,
  redirectConfirm,
  onMessage,
  offMessage,
} from "../slices/authSlice";
import { AppDispatch } from "../store";

const messageService =
  (msg: string, redirect = true, timeout = 60000) =>
  (dispatch: AppDispatch) => {
    const res: Message = {
      msg,
      redirect,
    };

    dispatch(onMessage(res));
    return setTimeout(() => dispatch(offMessage()), timeout);
  };

const checkAuthenticatedService = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("access")) {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/verify/`,
        JSON.stringify({ token: getStoreLocal("access") }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(authenticatedOk());
      })
      .catch((err) => {
        dispatch(failClear());
      });
  }
};

const loadUserService = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("access")) {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${getStoreLocal("access") || "default"}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch(loadedUser(res.data));
      })
      .catch((err) => {
        dispatch(userFail());
      });
  } else {
    dispatch(userFail());
  }
};

const loginService =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingOn());
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        dispatch(loginOk(res.data));
        toast.success("Bienvenido");
      })
      .catch((err) => {
        dispatch(failClear());
        if (err.code !== "ERR_NETWORK") toast.warn(err.response.data.detail);
        else toast.warn("Error de conexión, intentar más tarde");
      })
      .finally(() => {
        dispatch(loadingOff());
      });
  };

const refreshService = () => async (dispatch: AppDispatch) => {
  if (getStoreLocal("refresh")) {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/refresh/`,
        JSON.stringify({
          refresh: getStoreLocal("refresh"),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(refreshOk(res.data));
      })
      .catch((err) => {
        dispatch(failClear());
      });
  } else {
    dispatch(failClear());
  }
};

const signupService =
  (
    email: string,
    password: string,
    // eslint-disable-next-line camelcase
    re_password: string,
    // eslint-disable-next-line camelcase
    acept_terms: boolean
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(loadingOn());
    // eslint-disable-next-line camelcase
    if (acept_terms) {
      // eslint-disable-next-line camelcase
      if (password === re_password) {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
            JSON.stringify({
              email,
              password,
              // eslint-disable-next-line camelcase
              re_password,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            dispatch(
              messageService(
                "Se ha enviado un correo para confirmar tu cuenta, por favor revise su bandeja de entrada."
              )
            );
            console.log(res);
            toast.info("Revisa tu bandeja de entrada");
          })
          .catch((err) => {
            console.log(err);

            if (err.response.status === 400) {
              if (err.response.data.password) {
                err.response.data.password.map((error: string) => {
                  toast.error(error);
                });
              } else if (err.response.data.email) {
                err.response.data.email.map((error: string) => {
                  toast.error(error);
                });
              } else {
                toast.error("Comuniquese con el administrador  ");
              }
            } else {
              toast.error("Error de conexión, intentar más tarde");
            }
          });
      } else {
        toast.warn("Las contraseñas no coinciden");
      }
    } else {
      toast.warn("Debes aceptar los terminos y condiciones");
    }
    dispatch(loadingOff());
  };
const activateService =
  (uid: string | string[] | undefined, token: string | string[] | undefined) =>
  async (dispatch: AppDispatch) => {
    dispatch(loadingOn());
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/activation/`,
        JSON.stringify({
          uid,
          token,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(messageService("Cuenta Activada, ya puedes iniciar sesión"));
        toast.success("Cuenta Activada, ya puedes iniciar sesión");
      })
      .catch((err) => {
        toast.warn(err.response.data.detail);
      })
      .finally(() => {
        dispatch(loadingOff());
      });
  };

const logoutService = () => (dispatch: AppDispatch) => {
  dispatch(failClear());
  toast.info("Sesión cerrada");
};
const resetPasswordService =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingOn());
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password/`,
        JSON.stringify({ email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(
          messageService(
            "Se ha enviado un correo para cambiar tu contraseña , por favor revise su bandeja de entrada."
          )
        );
        toast.info("Revisa tu bandeja de entrada");
      })
      .catch((err) => {
        toast.error("Error de conexión, intentar más tarde");
      });
    dispatch(loadingOff());
  };
const redirecLoginService =
  (timeout = 500) =>
  (dispatch: AppDispatch) => {
    dispatch(redirectLogin(true));
    return setTimeout(() => dispatch(redirectLogin(false)), timeout);
  };

const resetPasswordConfirmService =
  (
    uid: string | string[] | undefined,
    token: string | string[] | undefined,
    // eslint-disable-next-line camelcase
    new_password: string,
    // eslint-disable-next-line camelcase
    re_new_password: string
  ) =>
  async (dispatch: AppDispatch) => {
    console.log(uid, token, new_password, re_new_password);

    dispatch(loadingOn());
    // eslint-disable-next-line camelcase
    if (new_password === re_new_password) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password_confirm/`,
          JSON.stringify({
            uid,
            token,
            // eslint-disable-next-line camelcase
            new_password,
            // eslint-disable-next-line camelcase
            re_new_password,
          }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          dispatch(
            messageService(
              "Contraseña cambiada, ya puedes iniciar sesión con tu nueva contraseña"
            )
          );
          toast.success("Contraseña cambiada, ya puedes iniciar sesión");
        })
        .catch((err) => {
          toast.error("Comuniquese con el administrador");
        });
    } else {
      toast.warn("Las Contraseñas no coinciden  ");
    }
    dispatch(loadingOff());
  };

export {
  checkAuthenticatedService,
  loadUserService,
  loginService,
  refreshService,
  signupService,
  activateService,
  resetPasswordService,
  resetPasswordConfirmService,
  logoutService,
};
