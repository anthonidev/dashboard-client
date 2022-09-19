import { ReactElement } from "react";
import AuthLayout from "../components/layouts/AuthLayout";

const Pricing = () => {
  return <h1 className="text-3xl">Hola</h1>;
};

Pricing.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout title="Precios | Belnmont" content="Content Page" banner="">
      {page}
    </AuthLayout>
  );
};
export default Pricing;
