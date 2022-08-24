import { useForm, UseFormReturn, SubmitHandler } from "react-hook-form";
import { PresentationChartBarIcon } from "@heroicons/react/solid";

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
      className="bg-white border-4 border-gray-300 px-10 py-10 shadow-2xl rounded-lg relative"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl text-center mb-3 font-bold tracking-wider text-gray-700 ">
        {title}
      </h1>
      <div className="absolute -top-10 bg-gray-300  rounded-xl  z-0">
        <PresentationChartBarIcon className="text-gray-600 h-20 w-20" />
      </div>

      {children(methods)}
    </form>
  );
};

export default Form;
