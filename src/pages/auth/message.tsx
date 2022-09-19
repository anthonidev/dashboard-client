import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/solid";
import AuthLayout from "../../components/layouts/AuthLayout";
import { RootState } from "../../redux/store";
// import { activateService } from "../../../../redux/api/auth";

const Message = () => {
  // const { loading } = useSelector((state: RootState) => state.auth);
  const { msg, redirect } = useSelector(
    (state: RootState) => state.auth?.message
  );
  const { push } = useRouter();

  // const handleActivated = () => {
  //   if (uid !== undefined && Message !== undefined)
  //     dispatch(activateService(uid, Message));
  //   setActivated(true);
  // };

  useEffect(() => {
    if (!redirect) push("/auth/login");
  }, [push, redirect]);

  return (
    <section className="flex justify-center items-center  flex-wrap h-full g-6 text-gray-800">
      <div className="bg-white border-4 border-gray-300 px-10 py-10 shadow-2xl rounded-lg relative">
        <div className="mx-auto  my-auto ">
          <div className="absolute -top-10 bg-gray-300  rounded-xl  z-0">
            <CheckCircleIcon className="text-gray-600 h-20 w-20" />
          </div>
          <h1 className="text-4xl text-center mb-3 font-bold tracking-wider text-gray-700 ">
            Correo enviado con éxito
          </h1>
          <p className="text-lg mt-5 text-gray-700">{msg}</p>

          {/* {loading ? (
          <button className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            ...
          </button>
        ) : (
          <button
            onClick={handleActivated}
            className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-lg  md:text-2xl font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <CheckCircleIcon className="w-6 h-6 mr-2" />
            <span>Activar cuenta</span>
          </button>
        )} */}
          <button className="flex mt-12  px-4 py-2 border border-transparent text-lg  md:text-2xl font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <span>Volver a enviar</span>
          </button>
        </div>
      </div>
    </section>
  );
};

Message.getLayout = function getLayout(page: ReactElement) {
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

export default Message;
