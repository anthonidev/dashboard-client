import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div className="mb-3">
    <label className="text-sm text-gray-700 " htmlFor={props.id}>
      {props.title}
    </label>
    <input ref={ref} {...props} />
  </div>
));

export default Input;
