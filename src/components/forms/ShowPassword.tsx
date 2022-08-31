import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React from "react";

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  shouldshowbutton: boolean;
};

const ShowPassword = ({
  showPassword,
  setShowPassword,
  shouldshowbutton,
}: Props) => {
  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {shouldshowbutton && (
        <div className="absolute right-5 top-10">
          <button type="button" onClick={handleVisibility}>
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ShowPassword;
