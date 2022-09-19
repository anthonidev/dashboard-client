import { useState } from "react";

function useShowPassword() {
  const [showpassword, setShowPassword] = useState(false);

  const handlevisibility = () => {
    setShowPassword(!showpassword);
  };
  return { showpassword, handlevisibility };
}

export { useShowPassword };
