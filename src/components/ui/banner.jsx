'use client';

import Image from 'next/image';

export function Banner({ 
  text,
  textColor = "text-[#FF8D00]",
  fillColor = "#0D0D0D",
  className = ""
}) {
  return (
    <div 
      className={`relative w-full z-0 ${className}`}
      style={{
        height: 'clamp(70px, 11vw, 120px)'
      }}
    >
      <span 
        className={`absolute text-xl md:text-3xl ${textColor} italic font-bold font-sans top-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap`}
      >
        {text}
      </span>
      {/* Arrow icon no biquinho */}
      <div className="absolute mt-4 sm:mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
        <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <Image
            src="/arrow-down.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 24px, 32px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 100"
          className="w-full"
          preserveAspectRatio="none"
          style={{
            height: 'clamp(70px, 11vw, 120px)'
          }}
        >
          {/* Path único: barra completa + biquinho centralizado integrado - sem gaps */}
          <path
            d="M0,0 L1200,0 L1200,60 L750,60 C700,60 650,100 600,100 C550,100 500,60 450,60 L0,60 Z"
            fill={fillColor}
          />
        </svg>
      </div>
    </div>
  );
}
