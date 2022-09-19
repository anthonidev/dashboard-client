import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Submit from "../../../components/button/Submit";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import AuthLayout from "../../../components/layouts/AuthLayout";
import { resetPasswordService } from "../../../redux/api/auth";
import { AppDispatch, RootState } from "../../../redux/store";

export interface FormForgotPassword {
  email: string;
}
const ForgotPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { redirect } = useSelector((state: RootState) => state.auth.message);
  const { push } = useRouter();

  const onSubmit: SubmitHandler<FormForgotPassword> = (data) => {
    dispatch(resetPasswordService(data.email));
  };
  useEffect(() => {
    if (redirect) push("/auth/message");
  }, [push, redirect]);

  return (
    <section className="flex justify-center items-center  flex-wrap h-full g-6 text-gray-800">
      <div className="md:w-8/12 lg:w-6/12 md:mb-0"></div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        <Form<FormForgotPassword>
          title="Restablecer la contraseña"
          onSubmit={onSubmit}
        >
          {({ register, watch, formState: { errors } }) => (
            <>
              <p className="text-center text-gray-500 text-xs md:text-md lg:text-lg mt-2 mb-6">
                Introduce tu dirección de correo electrónico
              </p>

              <Input
                title="Correo"
                type="email"
                id="email"
                placeholder="Correo electrónico"
                aria-errormessage={
                  errors.email ? "Formato no valido" : undefined
                }
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  maxLength: 50,
                  minLength: 5,
                })}
              />

              <Submit loading={loading}>Enviar correo</Submit>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};
ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="R pass | Belnmont"
      content="Content Page"
      banner="/assets/img/Signup-banner.PNG"
    >
      {page}
    </AuthLayout>
  );
};
export default ForgotPassword;
