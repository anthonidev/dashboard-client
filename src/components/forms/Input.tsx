import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React from "react";
type ExtraProps = {
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  shouldShowButton?: boolean;
};
type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement> & ExtraProps,
  HTMLInputElement
>;

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { showPassword, setShowPassword, shouldShowButton } =
    props as ExtraProps;
  const handleVisibility = () => {
    setShowPassword && setShowPassword(!showPassword);
  };
  return (
    <div className="mb-3">
      <label
        className={`${props.className} block  text-sm font-bold mb-2 ${
          props["aria-errormessage"] ? "text-red-800" : "text-gray-700"
        }`}
        htmlFor={props.id}
      >
        {props.title}
      </label>

      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={`${
            props.className
          } mt-2  block w-full px-4 py-2 text-xl font-normal ${
            props["aria-errormessage"]
              ? "bg-red-50 text-red-700 border-red-300 focus:bg-red-50  focus:border-red-600"
              : "text-gray-700 bg-white border-gray-300 focus:bg-white   focus:border-blue-600"
          }  bg-clip-padding border border-solid  rounded transition ease-in-out m-0 focus:outline-none focus:text-gray-700 `}
        />

        {props.role === "password" && shouldShowButton && (
          <div className="absolute right-5 bottom-1">
            <button type="button" onClick={handleVisibility}>
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-indigo-500" />
              ) : (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        )}
      </div>

      {props["aria-errormessage"] && (
        <span className="text-red-500 text-xs">
          {props["aria-errormessage"]}
        </span>
      )}
    </div>
  );
});

export default Input;
