import Head from "next/head";
import Image from "next/image";
import { PropsLayout } from "../../utils/types/pageProps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  checkAuthenticatedService,
  loadUserService,
  refreshService,
} from "../../redux/api/auth";

const AuthLayout: React.FC<PropsLayout> = ({
  title,
  content,
  children,
  banner,
}: PropsLayout) => {
  const dispatch: AppDispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(checkAuthenticatedService());
  //   dispatch(loadUserService());
  //   dispatch(refreshService());
  // }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <main className="bg-gray-900 h-screen">
        <div className="container px-6  h-full">{children}</div>
      </main>
    </>
  );
};
export default AuthLayout;
