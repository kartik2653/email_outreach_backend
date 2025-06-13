import { ReactNode } from "react";
import FeatureCarousel from "@/components/FeatureCarousel";
import logo from "@/assests/svg/appLogo.svg";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  carouselSlides: Array<{
    title: string;
    subtitle: string;
    hashtag: string;
    description: string;
  }>;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  description,
  carouselSlides,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex p-8">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-xl w-full relative h-full flex items-center justify-center">
          <h1 className="text-3xl font-bold absolute top-0 left-0 text-gray-900">
            <img src={logo} alt="Logo" />
          </h1>
          <div className="w-full space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 font-bricolage-grotesque">
                  {title}
                </h2>
                <h3 className="text-5xl font-bold text-gray-900 font-bricolage-grotesque">
                  {subtitle}
                </h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </div>

      {/* Right Side - Feature Carousel */}
      <div className="flex-[0.7]">
        <FeatureCarousel />
      </div>
    </div>
  );
};

export default AuthLayout;
