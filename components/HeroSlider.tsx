"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  { src: "/images/hero/heroa.jpg", alt: "Hero image 1" },
  { src: "/images/hero/herob.jpg", alt: "Hero image 2" },
  { src: "/images/hero/heroc.jpg", alt: "Hero image 3" },
  { src: "/images/hero/herod.jpg", alt: "Hero image 4" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl mt-12">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out`}
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}