
import { useState, useEffect } from "react";

interface CarouselSlide {
  title: string;
  subtitle: string;
  hashtag: string;
  description: string;
}

interface FeatureCarouselProps {
  slides: CarouselSlide[];
}

const FeatureCarousel = ({ slides }: FeatureCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full w-full">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-full flex flex-col justify-center items-center text-center space-y-8 p-8">
            {/* Social Media Post Mockup */}
            <div className="bg-white rounded-xl shadow-lg p-4 max-w-sm w-full">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">SpotBOI</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">@spotboi.ai</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                From strategy to reporting - SpotBoi is the first AI Social Media Agent that takes care of everything, so you can shine in the spotlight! 🌟
                <span className="text-blue-500"> #DigitalHarmony</span>
              </p>
              <div className="text-xs text-gray-500">See translation</div>
            </div>

            {/* Feature Highlight */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <span className={`px-4 py-2 rounded-full text-black font-semibold ${
                  slide.hashtag === '#Automate' ? 'bg-lime-400' : 
                  slide.hashtag === '#Create' ? 'bg-pink-400' : 'bg-green-400'
                }`}>
                  {slide.hashtag}
                </span>
                <span className="bg-gray-800 text-white px-4 py-2 rounded-full">
                  Meet
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white">
                {slide.title}
              </h3>
              
              <p className="text-white/90 text-lg">
                {slide.subtitle}
              </p>
            </div>

            {/* Key Features Section */}
            <div className="bg-lime-300 rounded-xl p-6 max-w-sm w-full">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Key features</h4>
              <p className="text-gray-700">
                {slide.description}
              </p>
              <div className="flex space-x-2 mt-4">
                <div className="w-8 h-2 bg-gray-800 rounded"></div>
                <div className="w-2 h-2 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
