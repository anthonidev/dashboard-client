import { LockClosedIcon } from "@heroicons/react/solid";
import React from "react";
import ClipLoader from "react-spinners/PulseLoader";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
};
const Submit = ({ children, loading }: Props) => {
  return (
    <>
      {loading ? (
        <button
          disabled={true}
          className="group relative cursor-not-allowed  w-full flex justify-center py-3 uppercase font-bold px-4 border tracking-wider border-transparent text-sm  rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-blue-300 group-hover:text-blue-400"
              aria-hidden="true"
            />
          </span>
          <ClipLoader
            className="w-auto "
            color="#ffffff"
            loading={loading}
            size={15}
            speedMultiplier={0.7}
          />
        </button>
      ) : (
        <button
          type="submit"
          className="group relative  w-full flex justify-center py-3 uppercase font-bold px-4 border tracking-wider border-transparent text-sm  rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-blue-300 group-hover:text-blue-400"
              aria-hidden="true"
            />
          </span>
          {children}
        </button>
      )}
    </>
  );
};

export default Submit;
