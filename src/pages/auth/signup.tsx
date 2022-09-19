import React, { ReactElement, useState, useEffect } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";

import { SubmitHandler } from "react-hook-form";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Link from "next/link";
import Submit from "../../components/button/Submit";
import ShowPassword from "../../components/forms/ShowPassword";
import { signupService } from "../../redux/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useRouter } from "next/router";

export interface FormSignup {
  email: string;
  password: string;
  re_password: string;
  acept_terms: boolean;
}

//asdasd@gmail.com PassSegure3$

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { redirect } = useSelector((state: RootState) => state.auth.message);
  const { push } = useRouter();

  const onSubmit: SubmitHandler<FormSignup> = (data) => {
    dispatch(
      signupService(
        data.email,
        data.password,
        data.re_password,
        data.acept_terms
      )
    );
  };
  useEffect(() => {
    if (redirect) push("/auth/message");
  }, [push, redirect]);

  return (
    <section className="flex justify-center items-center  flex-wrap h-full g-6 text-gray-800">
      <div className="md:w-8/12 lg:w-6/12 md:mb-0"></div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        <Form<FormSignup> title="Registrate" onSubmit={onSubmit}>
          {({ register, watch, formState: { errors } }) => (
            <>
              <p className="text-center text-gray-500 text-xs md:text-md lg:text-lg mt-2 mb-6">
                Ya tienes una cuenta?
                <Link href={"/auth/login"}>
                  <a className="text-blue-500 font-bold ml-2">Ingresar</a>
                </Link>
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
              <div className="relative">
                <Input
                  title="Contraseña"
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  placeholder="Contraseña"
                  aria-errormessage={
                    errors.password
                      ? "El formato de contraseña no es valido"
                      : undefined
                  }
                  {...register("password", {
                    required: true,
                    maxLength: 50,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                />
                <ShowPassword
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  shouldshowbutton={watch("password") ? true : false}
                />
              </div>
              <div className="relative">
                <Input
                  title="Repetir contraseña"
                  type={`${showRePassword ? "text" : "password"}`}
                  id="re_password"
                  placeholder="Repetir contraseña"
                  aria-errormessage={
                    errors.password
                      ? "El formato de contraseña no es valido"
                      : undefined
                  }
                  {...register("re_password", {
                    required: true,
                    maxLength: 50,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                />
                <ShowPassword
                  showPassword={showRePassword}
                  setShowPassword={setReShowPassword}
                  shouldshowbutton={watch("re_password") ? true : false}
                />
              </div>

              <div className="flex items-center text-sm"></div>

              <div className="flex justify-end items-center mb-6">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  {...register("acept_terms")}
                  id="acept_terms"
                />
                <p className=" ">
                  <span className=""> Acepto los</span>
                  <Link href={"/belnmont/terminos-y-condiciones"}>
                    <a className="ml-1 text-indigo-500">
                      terminos y condiciones
                    </a>
                  </Link>
                </p>
              </div>
              <Submit loading={loading}>Registrarce</Submit>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Ingresar | Belnmont"
      content="Iniciar Session en Belnmont"
      banner="/assets/img/Signup-banner.PNG"
    >
      {page}
    </AuthLayout>
  );
};

export default Signup;
