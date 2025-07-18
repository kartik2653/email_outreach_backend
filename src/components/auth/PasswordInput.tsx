import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import openEyeIcon from "@/assests/svg/openEye.svg";
import closedEyeIcon from "@/assests/svg/closedEye.svg";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  placeholder?: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = "Enter your password", error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className={`mt-1 pr-10 ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <img src={openEyeIcon} alt="Open Eye" />
            ) : (
              <img src={closedEyeIcon} alt="Closed Eye" />
            )}
          </button>
        </div>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
