export interface AlertState {
  msg: string | null;
  type: string | null;
}
export interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: User | null;
  loading: boolean;
  redirectConfirmed: boolean;
  redirect: Redirect;
  message: Message;
}

export interface Message {
  msg: string;
  redirect: boolean;
}

export interface User {
  id: number;
  email: string;
}
export interface Redirect {
  login: boolean;
  confirm: Confirm;
}

export interface Confirm {
  state: boolean;
  msg: string;
}

export interface EventState {
  sidebarOpen: boolean;
}
