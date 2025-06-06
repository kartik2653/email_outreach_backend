
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
      color: "bg-orange-400",
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
    <div className="w-80 bg-white border-l border-gray-200 animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Setup Progress</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Setup your Spotboi !!</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            It will help us to customize your results, you can do it later in settings as well.
          </p>
        </div>

        <div className="space-y-4">
          {setupItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 hover:border-gray-200">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center shadow-sm`}>
                  <span className="text-white font-bold text-sm">{item.percentage}%</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">46%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{width: '46%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
