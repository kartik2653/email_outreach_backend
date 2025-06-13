
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface LoaderProps {
  className?: string;
  size?: number;
  text?: string;
}

const ThemeLoader = ({ className, size = 24, text }: LoaderProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <Loader className="animate-spin text-gray-600" size={size} />
      {text && <p className="text-sm text-gray-600 font-manrope">{text}</p>}
    </div>
  );
};

export { ThemeLoader };
