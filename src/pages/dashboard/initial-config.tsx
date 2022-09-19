import React, { ReactElement } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Submit from "../../components/button/Submit";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import DasboardLayout from "../../components/layouts/DashboardLayout";
import { configInitialService } from "../../redux/api/company";
import { AppDispatch, RootState } from "../../redux/store";
export interface FormConfig {
  firstname: string;
  lastname: string;
  phone: string;
  dni: string;
  enterprice: string;
  ruc: string;
}

const InitialConfig = () => {
  const dispatch: AppDispatch = useDispatch();
  const onSubmit: SubmitHandler<FormConfig> = (data) => {
    dispatch(
      configInitialService(
        data.firstname,
        data.lastname,
        data.phone,
        data.dni,
        data.enterprice,
        data.ruc
      )
    );
  };
  const { loading } = useSelector((state: RootState) => state.comapany);
  return (
    <section className="flex justify-center items-center  flex-wrap h-full g-6 text-gray-800">
      <div className="md:w-8/12 lg:w-6/12 md:mb-0"></div>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        <Form<FormConfig> title="Configuracion Inicial" onSubmit={onSubmit}>
          {({ register, watch, formState: { errors } }) => (
            <>
              <p className="text-center text-gray-500 text-xs md:text-md lg:text-lg mt-2 mb-6">
                Esta configuracion es necesaria para poder usar el sistema
              </p>
              <Input
                title="Nombres"
                type="text"
                id="firstname"
                placeholder="ej. Juan"
                aria-errormessage={
                  errors.firstname ? "Formato no valido" : undefined
                }
                {...register("firstname", {
                  required: true,
                  maxLength: 30,
                })}
              />
              <Input
                title="Apellidos"
                type="text"
                id="lastname"
                placeholder="ej. Perez"
                aria-errormessage={
                  errors.lastname ? "Formato no valido" : undefined
                }
                {...register("lastname", {
                  required: true,
                  maxLength: 50,
                })}
              />
              <Input
                title="Telefono"
                type="text"
                id="phone"
                placeholder="ej. 999999999"
                aria-errormessage={
                  errors.phone ? "Formato no valido" : undefined
                }
                {...register("phone", {
                  required: true,
                  maxLength: 9,
                })}
              />
              <Input
                title="DNI"
                type="text"
                id="dni"
                placeholder="ej. 99999999"
                aria-errormessage={errors.dni ? "Formato no valido" : undefined}
                {...register("dni", {
                  required: true,
                  maxLength: 8,
                })}
              />
              <Input
                title="Razon Social"
                type="text"
                id="enterprice"
                placeholder="ej. Empresa S.A.C"
                aria-errormessage={
                  errors.enterprice ? "Formato no valido" : undefined
                }
                {...register("enterprice", {
                  required: true,
                  maxLength: 50,
                })}
              />
              <Input
                title="RUC"
                type="text"
                id="ruc"
                placeholder="ej. 99999999999"
                aria-errormessage={errors.ruc ? "Formato no valido" : undefined}
                {...register("ruc", {
                  required: true,
                  maxLength: 11,
                })}
              />
              <Submit loading={loading}>Guardar</Submit>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};

InitialConfig.getLayout = function getLayout(page: ReactElement) {
  return (
    <DasboardLayout title="Dashboard | Belnmont" content="Content Page">
      {page}
    </DasboardLayout>
  );
};
export default InitialConfig;
