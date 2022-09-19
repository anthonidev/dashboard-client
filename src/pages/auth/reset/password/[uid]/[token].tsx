import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Submit from "../../../../../components/button/Submit";
import Form from "../../../../../components/forms/Form";
import Input from "../../../../../components/forms/Input";
import ShowPassword from "../../../../../components/forms/ShowPassword";
import AuthLayout from "../../../../../components/layouts/AuthLayout";
import { resetPasswordConfirmService } from "../../../../../redux/api/auth";

import { AppDispatch, RootState } from "../../../../../redux/store";

export interface FormResetPassword {
  new_password: string;
  re_new_password: string;
}
const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const { redirect } = useSelector((state: RootState) => state.auth?.message);

  const {
    query: { uid, token },
    push,
  } = useRouter();

  const onSubmit: SubmitHandler<FormResetPassword> = (data) => {
    if (uid !== undefined && token !== undefined) {
      dispatch(
        resetPasswordConfirmService(
          uid,
          token,
          data.new_password,
          data.re_new_password
        )
      );
    }
  };
  useEffect(() => {
    if (redirect) push("/auth/login");
  }, [push, redirect]);

  return (
    <section className="flex justify-center items-center  flex-wrap h-full g-6 text-gray-800">
      <div className="md:w-8/12 lg:w-6/12 md:mb-0"></div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        <Form<FormResetPassword>
          title="Restablecer la contraseña"
          onSubmit={onSubmit}
        >
          {({ register, watch, formState: { errors } }) => (
            <>
              <p className="text-center text-gray-500 text-xs md:text-md lg:text-lg mt-2 mb-6">
                Introduce tu dirección de correo electrónico
              </p>
              <div className="relative">
                <Input
                  title="Nueva contraseña"
                  type={`${showPassword ? "text" : "password"}`}
                  id="new_password"
                  placeholder="Ingresa tu nueva contraseña"
                  // about="La contraseña debe tener al menos 8 caracteres"
                  aria-errormessage={
                    errors.new_password
                      ? "El formato de contraseña no es valido"
                      : undefined
                  }
                  {...register("new_password", {
                    required: true,
                    maxLength: 50,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                />
                {
                  <ShowPassword
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    shouldshowbutton={watch("new_password") ? true : false}
                  />
                }
              </div>
              <div className="relative">
                <Input
                  title="Confirmar contraseña"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  id="re_new_password"
                  placeholder="Confirma tu nueva contraseña"
                  // about="La contraseña debe tener al menos 8 caracteres"
                  aria-errormessage={
                    errors.re_new_password
                      ? "El formato de contraseña no es valido"
                      : undefined
                  }
                  {...register("re_new_password", {
                    required: true,
                    maxLength: 50,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                />
                {
                  <ShowPassword
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                    shouldshowbutton={watch("re_new_password") ? true : false}
                  />
                }
              </div>
              <Submit loading={loading}>Restablecer contraseña</Submit>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};
ResetPassword.getLayout = function getLayout(page: ReactElement) {
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
export default ResetPassword;
