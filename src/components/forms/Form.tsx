import { useForm, UseFormReturn, SubmitHandler } from "react-hook-form";

type FormProps<TFormValues extends Record<string, any>> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  title: string;
};

const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children,
  title = "Formulario",
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>();
  return (
    <form
      className="bg-white px-6 py-10 shadow-2xl rounded-lg"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl text-center mb-3 font-bold tracking-wider text-gray-700 ">
        {title}
      </h1>

      {children(methods)}
    </form>
  );
};

export default Form;
