import { useState } from "react";

function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return { showPassword, handleVisibility };
}

export { useShowPassword };
