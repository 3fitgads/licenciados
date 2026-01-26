'use client';

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Banner } from "@/components/ui/banner";
import Image from 'next/image';

const differentials = [
  {
    text: "8 Anos no mercado",
    icon: "/icon1.webp"
  },
  {
    text: "Baixo custo operacional",
    icon: "/icon2.webp"
  },
  {
    text: "Qualidade, excelência e preços acessíveis nos produtos",
    icon: "/icon1.webp"
  },
  {
    text: "Payback de 6 a 12 meses",
    icon: "/icon1.webp"
  },
  {
    text: "Know How de sucesso",
    icon: "/icon2.webp"
  },
  {
    text: "Parceiras com Grandes Influenciadores (Leo Stronda, Ramon Dino, Jorlan Vieira e Fernando Sardinha)",
    icon: "/icon1.webp"
  }
];

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="relative overflow-hidden md:pt-10 pb-14 sm:pb-20 md:pb-24 lg:pb-32 scroll-mt-20">
      <div
        className="absolute w-full h-full top-0 md:top-0 left-0 right-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="relative w-full h-full">
          <Banner text="ENTENDA MAIS" />
        </div>
      </div>
      <div className="container mx-auto px-4 lg:mt-32 mt-[6rem]">
        <AnimateOnScroll animation="fadeInUp" delay={0.1} duration={0.8}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl italic font-bold mb-3">
              <span className="text-black">NOSSOS</span>{' '}
              <span
                className="text-white"
                style={{
                  WebkitTextStroke: '2px #FF8D00',
                  textStroke: '2px #FF8D00',
                  paintOrder: 'stroke fill'
                }}
              >
                DIFERENCIAIS
              </span>
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-full w-full mx-auto px-4">
          {differentials.map((differential, index) => (
            <AnimateOnScroll
              key={index}
              animation="slideLeft"
              delay={0.2 + (index * 0.1)}
              duration={0.6}
              className="md:w-[33vw] lg:w-[25vw]"
            >
              <div className="bg-white rounded-lg p-4 md:p-6 flex items-center gap-4 shadow-lg">
                <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-black flex items-center justify-center overflow-hidden">
                  {differential.icon ? (
                    <Image
                      src={differential.icon}
                      alt=""
                      width={56}
                      height={56}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : null}
                </div>
                <p className="text-sm md:text-base text-black font-medium flex-1">
                  {differential.text}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 translate-y-1 left-0 right-0 z-20 md:hidden">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="absolute hidden md:block bottom-0 translate-y-1 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>
      
    </section>
  );
}
