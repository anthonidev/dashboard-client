interface AlertState {
  msg: string | null;
  type: string | null;
}
interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: User | null;
  loading: boolean;
  redirectConfirmed: boolean;
  redirect: Redirect;
  message: Message;
}

interface Message {
  msg: string;
  redirect: boolean;
}

interface User {
  id: number;
  email: string;
  is_configured: boolean;
}
interface Redirect {
  login: boolean;
  confirm: Confirm;
}

interface Confirm {
  state: boolean;
  msg: string;
}

interface EventState {
  sidebarOpen: boolean;
}

interface CompanyState {
  loading: boolean;
}

export {
  AlertState,
  AuthState,
  Message,
  User,
  Redirect,
  Confirm,
  EventState,
  CompanyState,
};
