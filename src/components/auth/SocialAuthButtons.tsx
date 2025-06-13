import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import googleIcon from "@/assests/svg/googleIcon.svg";
import linkedinIcon from "@/assests/svg/linkedinIcon.svg";

interface SocialAuthButtonsProps {
  onGoogleAuth: () => void;
  onLinkedInAuth: () => void;
  mode: "login" | "signup";
}

const SocialAuthButtons = ({ onGoogleAuth, onLinkedInAuth, mode }: SocialAuthButtonsProps) => {
  const actionText = mode === "login" ? "continue" : "continue";

  return (
    <div className="space-y-4">
      <div className="text-center text-gray-500">Or {actionText} with</div>

      <div className="grid grid-cols-2 gap-8">
        <Button
          variant="outline"
          onClick={onGoogleAuth}
          className="flex items-center justify-center space-x-2 rounded-standard "
        >
          <img src={googleIcon} alt="Google Icon" />
          <span>Google</span>
        </Button>

        <Button
          variant="outline"
          onClick={onLinkedInAuth}
          className="flex items-center justify-center space-x-2 rounded-standard"
        >
          <img src={linkedinIcon} alt="LinkedIn Icon" />
          <span>LinkedIn</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialAuthButtons;
