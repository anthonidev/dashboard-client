import type { NextPage } from "next";
import { ReactElement } from "react";
import AuthLayout from "../components/layouts/AuthLayout";

const Home = () => {
  return <h1 className="text-3xl">Hola</h1>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Dashboard | Belnmont" content="Content Page" banner="">
      {page}
    </AuthLayout>
  );
};
export default Home;
