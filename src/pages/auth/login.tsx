import React, { ReactElement, useState, useEffect } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";

import { SubmitHandler } from "react-hook-form";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Link from "next/link";
import Submit from "../../components/button/Submit";

import ShowPassword from "../../components/forms/ShowPassword";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginService } from "../../redux/api/auth";
import { useRouter } from "next/router";

export interface FormLogin {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch: AppDispatch = useDispatch();
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    dispatch(loginService(data.email, data.password));
  };
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      push("/dashboard/");
    }
  }, [isAuthenticated, push]);

  return (
    <section className="flex justify-center items-center  flex-wrap h-full g-6 text-gray-800">
      <div className="md:w-8/12 lg:w-6/12 md:mb-0"></div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        <Form<FormLogin> title="Bienvenido" onSubmit={onSubmit}>
          {({ register, watch, formState: { errors } }) => (
            <>
              <p className="text-center text-gray-500 text-xs md:text-md lg:text-lg mt-2 mb-6">
                No tienes una cuenta?
                <Link href={"/auth/signup"}>
                  <a className="text-blue-500 font-bold ml-2">Registrate</a>
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
                  // about="La contraseña debe tener al menos 8 caracteres"
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
                {
                  <ShowPassword
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    shouldshowbutton={watch("password") ? true : false}
                  />
                }
              </div>

              <div className="flex justify-end items-center mb-6">
                <a
                  href="#!"
                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Submit loading={loading}>Ingresar</Submit>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Ingresar | Belnmont"
      content="Iniciar Session en Belnmont"
      banner="/assets/img/login-banner.PNG"
    >
      {page}
    </AuthLayout>
  );
};

export default Login;
