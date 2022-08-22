import React from "react";
import { useForm, Resolver, useWatch, Control } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

function IsolateReRender({ control }: { control: Control<FormData> }) {
  const email = useWatch({
    control,
    name: "email",
    defaultValue: "default",
  });

  return <div>{email}</div>;
}

const Examplee = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("email")} />
      {errors?.email && <p>{errors.email.message}</p>}
      <label>Last Name</label>
      <input {...register("password")} />
      <IsolateReRender control={control} />
      <button type="submit">SetValue</button>
    </form>
  );
};

export default Examplee;
