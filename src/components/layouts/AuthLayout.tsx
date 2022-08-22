import Head from "next/head";
import Image from "next/image";
import { PropsLayout } from "../../utils/types/pageProps";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthLayout: React.FC<PropsLayout> = ({
  title,
  content,
  children,
  banner,
}: PropsLayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <main className="">{children}</main>
      <ToastContainer autoClose={4000} />
    </>
  );
};
export default AuthLayout;
