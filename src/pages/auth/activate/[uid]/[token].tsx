import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { AppDispatch, RootState } from "../../../../redux/store";
import AuthLayout from "../../../../components/layouts/AuthLayout";
import { activateService } from "../../../../redux/api/auth";
import { ClipLoader } from "react-spinners";
// import { activateService } from "../../../../redux/api/auth";
// import MainLayout from "../../../../components/layouts/MainLayout";

const Token = () => {
  const [activated, setActivated] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const { msg, redirect } = useSelector(
    (state: RootState) => state.auth?.message
  );
  const { push } = useRouter();

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { uid, token } = router.query;
  console.log(uid, token);
  useEffect(() => {
    if (redirect) push("/auth/login");
  }, [push, redirect]);

  const handleActivated = () => {
    if (uid !== undefined && token !== undefined)
      dispatch(activateService(uid, token));
    setActivated(true);
  };

  // if (activated && !loading) router.push("/auth/login");

  return (
    <section className="flex justify-center items-center  flex-wrap h-full g-6 text-gray-800">
      <div className="bg-white border-4 border-gray-300 px-10 py-10 shadow-2xl rounded-lg relative">
        <div className="mx-auto  my-auto ">
          <div className="absolute -top-10 bg-gray-300  rounded-xl  z-0">
            <CheckCircleIcon className="text-gray-600 h-20 w-20" />
          </div>
          <h1 className="text-4xl text-center mb-3 font-bold tracking-wider text-gray-700 ">
            Bienvenido
          </h1>
          <p className="text-lg mt-5 text-gray-700">
            Para activar su cuenta pulse en el boton inferior{" "}
          </p>

          {loading ? (
            <button
              className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled
            >
              <ClipLoader
                className="w-auto "
                color="#ffffff"
                loading={loading}
                size={15}
                speedMultiplier={0.7}
              />
            </button>
          ) : (
            <button
              onClick={handleActivated}
              className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-lg  md:text-2xl font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CheckCircleIcon className="w-6 h-6 mr-2" />
              <span>Activar cuenta</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

Token.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Activar Cuenta | Belnmont"
      content="Content Page"
      banner="/assets/img/Signup-banner.PNG"
    >
      {page}
    </AuthLayout>
  );
};

export default Token;
