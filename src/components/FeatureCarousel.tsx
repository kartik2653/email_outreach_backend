import { useState, useEffect } from "react";
import carouselSlide0 from "@/assests/svg/carousel0.svg";
import carouselSlide1 from "@/assests/svg/carousel1.svg";
import carouselSlide2 from "@/assests/svg/carousel2.svg";

interface CarouselSlide {
  title: string;
  subtitle: string;
  hashtag: string;
  description: string;
}

interface FeatureCarouselProps {
  slides: CarouselSlide[];
}

const FeatureCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [carouselSlide0, carouselSlide1, carouselSlide2];

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
          <div className="h-full flex flex-col justify-center items-center text-center space-y-8 ">
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-auto h-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCarousel;
