
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RightSidebarProps {
  onClose: () => void;
}

const RightSidebar = ({ onClose }: RightSidebarProps) => {
  const setupItems = [
    {
      title: "Brand Identity",
      subtitle: "1 month later",
      percentage: 60,
      color: "bg-yellow-400",
    },
    {
      title: "Language", 
      subtitle: "3 month later",
      percentage: 70,
      color: "bg-green-400",
    },
    {
      title: "Other Resources",
      subtitle: "1 month later", 
      percentage: 43,
      color: "bg-pink-400",
    },
    {
      title: "LinkedIn Integration",
      subtitle: "4 month later",
      percentage: 10,
      color: "bg-purple-400",
    },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-100 p-6 animate-slide-in-right">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Setup your Spotboi !!</h2>
        <p className="text-sm text-gray-600">
          It will help us to customize your results, you can do it later in settings as well.
        </p>

        <div className="space-y-4">
          {setupItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{item.percentage}%</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
