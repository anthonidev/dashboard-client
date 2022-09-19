import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuthenticated,
  getStoreLocal,
  setStoreLocal,
} from "../../utils/helpers/helpStore";
import {
  AuthState,
  Confirm,
  Message,
  User,
} from "../../utils/types/reduxInterface";

const initialState: AuthState = {
  access: getStoreLocal("access"),
  refresh: getStoreLocal("refresh"),
  isAuthenticated: getAuthenticated("access"),
  user: {
    id: 0,
    email: "",
    is_configured: false,
  },
  loading: false,
  redirectConfirmed: false,
  redirect: {
    login: false,
    confirm: {
      state: false,
      msg: "",
    },
  },

  message: {
    msg: "",
    redirect: false,
  },
};

export const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    onMessage: (state: AuthState, action: PayloadAction<Message>) => {
      state.message = action.payload;
    },
    offMessage: (state: AuthState) => {
      state.message.msg = "";
      state.message.redirect = false;
    },

    loginOk: (state: AuthState, action: PayloadAction<AuthState>) => {
      setStoreLocal(
        "access",
        action.payload.access ? action.payload.access : ""
      );
      setStoreLocal(
        "refresh",
        action.payload.refresh ? action.payload.refresh : ""
      );
      state.isAuthenticated = true;
      state.access = getStoreLocal("access");
      state.refresh = getStoreLocal("refresh");
    },
    failClear: (state: AuthState) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
    loadingOn: (state: AuthState) => {
      state.loading = true;
    },
    loadingOff: (state: AuthState) => {
      state.loading = false;
    },
    loadedUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    userFail: (state: AuthState) => {
      state.user = null;
    },
    authenticatedOk: (state: AuthState) => {
      state.isAuthenticated = true;
    },
    redirectConfirmed: (state: AuthState) => {
      state.redirectConfirmed = true;
    },
    redirectLogin: (state: AuthState, action: PayloadAction<boolean>) => {
      state.redirect.login = action.payload;
    },
    redirectConfirm: (state: AuthState, action: PayloadAction<Confirm>) => {
      state.redirect.confirm = action.payload;
    },

    refreshOk: (state: AuthState, action: PayloadAction<AuthState>) => {
      setStoreLocal(
        "access",
        action.payload.access ? action.payload.access : ""
      );
      state.access = getStoreLocal("access");
    },
  },
});

export const {
  loginOk,
  failClear,
  loadingOn,
  loadingOff,
  loadedUser,
  userFail,
  authenticatedOk,
  refreshOk,
  redirectConfirmed,
  redirectConfirm,
  redirectLogin,
  onMessage,
  offMessage,
} = authSlice.actions;

export default authSlice.reducer;
