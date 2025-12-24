import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  badge: string;
  title: string;
  description: string;
  gradient: string;
  image: string;
}

const HeroSwiper: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Initial load animation
  useEffect(() => {
    setTimeout(() => setHasLoaded(true), 100);
  }, []);

  const slides: Slide[] = [
    {
      badge: 'ახალი კოლექცია 2025',
      title: 'გეიმინგ აქსესუარები',
      description: 'იპოვე საუკეთესო კლავიატურები, მაუსები და ყურსასმენები შენი გამარჯვებისთვის',
      gradient: 'from-blue-600 to-purple-600',
      image: '/images/hero.jpg',
    },
    {
      badge: 'პრემიუმ ხარისხი',
      title: 'მექანიკური კლავიატურები',
      description: 'პროფესიონალური RGB კლავიატურები მაქსიმალური კომფორტისთვის',
      gradient: 'from-cyan-500 to-blue-600',
      image: '/images/hero-2.jpg',
    },
    {
      badge: 'უახლესი ტექნოლოგია',
      title: 'უკაბელო გეიმინგ მაუსი',
      description: 'სწრაფი რეაქცია და უნიკალური დიზაინი თქვენი პერფორმანსისთვის',
      gradient: 'from-pink-500 to-purple-600',
      image: '/images/hero-3.jpg',
    },
  ];

  const goToSlide = (index: number): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    autoplayRef.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, [slides.length]);

  const handleManualNav = (callback: () => void): void => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    callback();
    
    // Restart autoplay after manual navigation
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    autoplayRef.current = interval;
  };

  const nextSlide = (): void => {
    goToSlide((activeIndex + 1) % slides.length);
  };

  const prevSlide = (): void => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className={`relative h-[600px] overflow-hidden bg-slate-950 transition-all duration-1000 ${
      hasLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === activeIndex
              ? 'opacity-100 translate-x-0'
              : index < activeIndex
              ? 'opacity-0 -translate-x-full'
              : 'opacity-0 translate-x-full'
          }`}
        >
          <div className="h-full relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
            
            {/* Animated background elements */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            
            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
              <div className="max-w-3xl">
                {/* Badge with animation */}
                <div
                  className={`inline-block mb-6 transition-all duration-700 ${
                    index === activeIndex && hasLoaded
                      ? 'opacity-100 translate-y-0 delay-300'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20">
                    {slide.badge}
                  </span>
                </div>

                {/* Title with animation */}
                <h1
                  className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 ${
                    index === activeIndex && hasLoaded
                      ? 'opacity-100 translate-y-0 delay-500'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <span className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                    {slide.title}
                  </span>
                </h1>

                {/* Description with animation */}
                <p
                  className={`text-xl sm:text-2xl text-gray-300 mb-10 transition-all duration-700 delay-300 ${
                    index === activeIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {slide.description}
                </p>

                {/* Buttons with animation */}
                <div
                  className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
                    index === activeIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-2">
                    დაიწყე ყიდვა
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-300 border border-white/20 hover:border-white/40">
                    ფასდაკლებები
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => handleManualNav(prevSlide)}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={() => handleManualNav(nextSlide)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualNav(() => goToSlide(index))}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{
            width: `${((activeIndex + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default HeroSwiper;