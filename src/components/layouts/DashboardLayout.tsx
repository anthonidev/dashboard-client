import Head from "next/head";
import { PropsLayoutDashboard } from "../../utils/types/pageProps";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  checkAuthenticatedService,
  loadUserService,
  refreshService,
} from "../../redux/api/auth";
import Sidebar from "../navigation/Sidebar";
import OpenSidebar from "../navigation/OpenSidebar";
import NavbarDashboard from "../navigation/NavbarDashboard";

const DasboardLayout: React.FC<PropsLayoutDashboard> = ({
  title,
  content,
  children,
}: PropsLayoutDashboard) => {
  const { push } = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthenticatedService());
    dispatch(loadUserService());
    dispatch(refreshService());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      push("/auth/login");
    }
  }, [isAuthenticated, push]);
  useEffect(() => {
    if (!user?.is_configured) {
      push("/dashboard/initial-config");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      {user?.is_configured ? (
        <main className="bg-slate-900 h-screen">
          <OpenSidebar />
          <Sidebar />
          <div className="md:pl-64 flex flex-col flex-1">
            <NavbarDashboard />
            {children}
          </div>
        </main>
      ) : (
        <main className="bg-slate-900 h-screen">{children}</main>
      )}
    </>
  );
};
export default DasboardLayout;
