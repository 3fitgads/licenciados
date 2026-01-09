'use client';

import Image from 'next/image';
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const benefits = [
  'GELADEIRA 3FIT',
  'FREEZER 3FIT',
  'ESTRUTURA DO MINI MERCADO',
  'TOTEM DE PAGAMENTO',
  'TREINAMENTO DE GESTÃO',
  'TREINAMENTO DE MARKETING',
  'TREINAMENTO DE VENDAS',
];

export function WhatYouGetSection() {
  return (
    <section id="o-que-voce-recebe" className="relative bg-gray-light overflow-hidden md:pt-10 pb-6 md:pb-10 scroll-mt-10">
      {/* Background Image - Diagonal overlay extending to wave - Right side */}
      <div className="absolute hidden md:block inset-0 z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute right-0 top-0 bottom-[-120px] w-full md:w-[66%] md:origin-top-right md:skew-x-[12deg] md:translate-x-[2%]">
          <Image
            src="/bg.png"
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 75vw"
            priority
          />
        </div>
      </div>

      {/* bgcomitens.png extending to wave - Left side */}
      <div className="absolute bg-black hidden md:block inset-0 -z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute left-0 top-0 bottom-[18%] w-full md:w-full md:origin-top-left">
          <Image
            src="/bgcomitens.png"
            alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
            fill
            className="object-cover md:object-contain object-left"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
      </div>

      {/* Wave at top - Desktop and Mobile */}
      <div className="absolute top-0 left-0 right-0 z-20 rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Desktop: Side by side layout */}
      <div className="w-full z-10 overflow-hidden">
        <div className="hidden md:grid grid-cols-[50%_30%] w-full min-h-[610px] gap-0">
          {/* Left Side - Image */}
          <div className="relative w-full h-full min-h-[500px] z-0">
            <Image
              src="/bgcomitens.png"
              alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
              fill
              className="object-contain object-left"
              sizes="70vw"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="relative w-full h-full min-h-[500px] flex items-center justify-center py-12 md:py-16 px-4 md:px-6 z-20">
            <div className="flex flex-col justify-center items-center w-full mx-auto pr-2 md:pr-4 relative z-10">
              <AnimateOnScroll animation="slideLeft" delay={0.3} duration={0.8}>
                <div className='w-full flex flex-col justify-center items-center'>
                  {/* Title */}
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-12 leading-tight">
                    <span className="text-white block mb-2 lg:whitespace-nowrap">O QUE VOCÊ RECEBE SENDO UM</span>
                    <span className="text-black bg-white px-3 py-2 rounded-lg inline-block">LICENCIADO 3FIT?</span>
                  </h2>

                  {/* Benefits List */}
                  <div className='w-full'>
                    <ul className="space-y-3 md:space-y-3">
                      {benefits.map((benefit, index) => (
                        <AnimateOnScroll
                          key={index}
                          animation="fadeInUp"
                          delay={0.4 + (index * 0.1)}
                          duration={0.5}
                        >
                          <li className="flex items-center text-white font-bold text-base md:text-lg lg:text-xl">
                            <span className="mr-3 md:mr-4 text-white">•</span>
                            <span>{benefit}</span>
                          </li>
                        </AnimateOnScroll>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="md:hidden flex flex-col w-full relative">
        {/* bgcomitens.png - Above in mobile */}
        <div className="relative w-full h-[40vh] sm:h-[70vh] min-h-[300px]">
          <Image
            src="/bgcomitens.png"
            alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
            fill
            className="object-cover object-left"
            sizes="100vw"
            priority
          />
        </div>

        

        {/* Content with bg.png - Below in mobile */}
        <div className="relative w-full h-[70vh] min-h-[300px] flex items-center justify-center -mt-1">
          <div className="relative w-full h-full p-2">
            <Image
              src="/bg.png"
              alt=""
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
            <div className="relative w-full h-full flex items-center justify-center z-50">
              <div className="-translate-y-16 flex flex-col justify-center items-center w-full mx-auto p-4 z-10">
                <AnimateOnScroll animation="slideLeft" delay={0.3} duration={0.8}>
                  <div className='w-full flex flex-col justify-center items-center'>
                    {/* Title */}
                    <div className='flex items-center bg-black p-2 mb-8'>
                      <h2 className="text-2xl font-boldleading-tight">
                        <span className="md:text-white text-[#FF7033] block mb-2">O QUE VOCÊ RECEBE SENDO UM</span>
                        <span className="text-black bg-white px-3 py-2 rounded-lg inline-block">LICENCIADO 3FIT?</span>
                      </h2>

                    </div>

                    {/* Benefits List */}
                    <div className='w-full'>
                      <ul className="space-y-3">
                        {benefits.map((benefit, index) => (
                          <AnimateOnScroll
                            key={index}
                            animation="fadeInUp"
                            delay={0.4 + (index * 0.1)}
                            duration={0.5}
                          >
                            <li className="flex items-center text-white font-bold text-base">
                              <span className="mr-3 text-white text-2xl">•</span>
                              <span>{benefit}</span>
                            </li>
                          </AnimateOnScroll>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>

          {/* Wave at bottom - Mobile only */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F5F5F5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Wave at bottom - Desktop only */}
      <div className="absolute hidden md:block bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F5F5F5" />
        </svg>
      </div>
    </section>
  );
}
