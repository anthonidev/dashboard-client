import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LinksHomeAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      setIsRender(true);
    } else {
      setIsRender(false);
    }
  }, [isAuthenticated]);

  const render = () => {
    if (!isRender) {
      return (
        <Link href={"/dashboard"}>
          <a className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <span> Dashboard</span>
          </a>
        </Link>
      );
    } else {
      return (
        <div className="flex items-center md:ml-12">
          <Link href={"/auth/login"}>
            <a className="text-base font-medium text-gray-500 hover:text-gray-900">
              <span> Sign in</span>
            </a>
          </Link>
          <Link href={"/auth/signup"}>
            <a className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <span>Sign up</span>
            </a>
          </Link>
        </div>
      );
    }
  };

  return <>{render()}</>;
};

export default LinksHomeAuth;
