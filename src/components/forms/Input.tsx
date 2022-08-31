import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
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
      {props["aria-errormessage"] && (
        <span className="text-red-500 text-xs">
          {props["aria-errormessage"]}
        </span>
      )}
    </div>
  );
});

export default Input;
