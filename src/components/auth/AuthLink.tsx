
import { Link } from "react-router-dom";

interface AuthLinkProps {
  text: string;
  linkText: string;
  to: string;
}

const AuthLink = ({ text, linkText, to }: AuthLinkProps) => {
  return (
    <div>
      <span className="text-gray-600">{text} </span>
      <Link to={to} className="text-black font-semibold hover:underline">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthLink;
