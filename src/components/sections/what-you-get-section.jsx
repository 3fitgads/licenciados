'use client';

import Image from 'next/image';
import { AuroraBackground } from "@/components/ui/aurora-background";
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
    <section id="o-que-voce-recebe" className="relative bg-[#FF7033] overflow-hidden pt-6 md:pt-10 pb-6 md:pb-10 scroll-mt-20">
      <AuroraBackground colorScheme="orange" showRadialGradient={false} />

      {/* Wave at top */}
      <div className="absolute top-0 left-0 right-0 z-20 rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] min-h-[400px] md:min-h-[800px] lg:min-h-[900px] relative z-10">
        {/* Left Side - Image */}
        <AnimateOnScroll animation="slideRight" delay={0.2} duration={0.8}>
          <div className="relative w-full h-full min-h-[600px] md:min-h-[800px] overflow-hidden flex items-center justify-center lg:p-8">
            <div className="relative w-[70%] h-[70%] overflow-hidden z-10 border-4 border-white rounded-xl shadow-2xl">
              <Image
                src="/bgcomitens.png"
                alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                style={{
                  borderRadius: '0.5rem',
                }}
              />
            </div>
          </div>
        </AnimateOnScroll>

        {/* Right Side - Content */}
        <div className="relative text-white flex items-center py-16 md:py-24">
          <div className="flex flex-col justify-center items-center w-full mx-auto p-4 md:pr-8 lg:pr-12 relative z-10">
            <AnimateOnScroll animation="slideLeft" delay={0.3} duration={0.8}>
              <div className='w-full flex flex-col justify-center items-center'>
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-8 md:mb-12 leading-tight">
                  <span className="text-white block mb-2 lg:whitespace-nowrap">O QUE VOCÊ RECEBE SENDO UM</span>
                  <span className="text-black bg-white px-3 py-2 rounded-lg inline-block">LICENCIADO 3FIT?</span>
                </h2>

                {/* Benefits List */}
                <div className='w-full'>

                <ul className="space-y-3 md:space-y-4">
                  {benefits.map((benefit, index) => (
                    <AnimateOnScroll 
                      key={index} 
                      animation="fadeInUp" 
                      delay={0.4 + (index * 0.1)} 
                      duration={0.5}
                    >
                      <li className="flex items-center text-white font-bold text-base md:text-lg lg:text-xl">
                        <span className="mr-3 md:mr-4 text-white text-2xl md:text-3xl">•</span>
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

      {/* Wave at bottom - única para toda a seção */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F5F5F5" />
        </svg>
      </div>
    </section>
  );
}
