import Head from "next/head";
import { PropsLayout } from "../../utils/types/pageProps";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  checkAuthenticatedService,
  loadUserService,
  refreshService,
} from "../../redux/api/auth";
import NavbarMain from "../navigation/NavbarMain";
import Footer from "../navigation/Footer";

const AuthLayout: React.FC<PropsLayout> = ({
  title,
  content,
  children,
  banner,
}: PropsLayout) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthenticatedService());
    dispatch(loadUserService());
    dispatch(refreshService());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <div className="bg-gray-900 h-screen">
        <NavbarMain />
        <main className="container px-6  h-full">{children}</main>
        <Footer />
      </div>
    </>
  );
};
export default AuthLayout;
