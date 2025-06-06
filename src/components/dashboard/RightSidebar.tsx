import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import arrowLogo from "@/assests/svg/arrow.svg";

interface RightSidebarProps {
  onClose: () => void;
}

const RightSidebar = ({ onClose }: RightSidebarProps) => {
  const setupItems = [
    {
      title: "Brand Identity",
      subtitle: "1 month later",
      percentage: 60,
      color: "#D3F26B",
      trailColor: "#EDFAC4",
    },
    {
      title: "Language",
      subtitle: "3 month later",
      percentage: 70,
      color: "#37D395",
      trailColor: "#9BE9CA",
    },
    {
      title: "Other Resources",
      subtitle: "1 month later",
      percentage: 43,
      color: "#FB7FE8",
      trailColor: "#FDCCF6",
    },
    {
      title: "LinkedIn Integration",
      subtitle: "4 month later",
      percentage: 10,
      color: "#C880FF",
      trailColor: "#E9CCFF",
    },
  ];

  return (
    <div className="relative w-80 bg-white border-l border-gray-200 animate-slide-in-right">
      <div
        onClick={() => {
          onClose();
        }}
        className="cursor-pointer absolute top-0 left-[-33px] w-[32px] h-[40px] bg-gray-100 flex justify-center items-center rounded-tl-md rounded-bl-md"
      >
        <img src={arrowLogo} alt="expand" className="w-[6px] h-[12px]" />
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          {setupItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 hover:border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar
                    value={item?.percentage}
                    strokeWidth={10}
                    text={`${item?.percentage}%`}
                    styles={buildStyles({
                      pathColor: item?.color,
                      trailColor: item?.trailColor || "#F3E8FF",
                      textColor: "#000",
                      strokeLinecap: "round",
                    })}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Setup your Spotboi !!</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            It will help us to customize your results, you can do it later in settings as well.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
