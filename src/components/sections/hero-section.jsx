'use client';

import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { NumberTicker } from "@/components/ui/number-ticker";
import Image from 'next/image';

export function HeroSection() {
  const handleScrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAdvantages = () => {
    document.getElementById('vantagens')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="relative bg-transparent text-white pb-20 md:pb-32 overflow-hidden pt-0">
      {/* Background Image - Diagonal overlay extending to wave */}
      <div className="absolute hidden md:block inset-0 z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute left-0 top-0 bottom-[-120px] w-full md:w-[65%] md:origin-top-left md:skew-x-[-12deg] md:translate-x-[-2%]">
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

      <div className="absolute hidden md:block inset-0 -z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute right-0 top-0 bottom-[18%] w-full md:w-full md:origin-top-right ">
          <Image
            src="/bgcomitens.png"
            alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
            fill
            className="object-cover md:object-contain object-right"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
      </div>


      {/* Hero Images - Side by Side */}
      <div className="w-full z-10 overflow-hidden">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-[45%_55%] w-full min-h-screen md:min-h-[500px] gap-0">
          {/* Left Side - Title/Text Image */}
          <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] flex md:items-center justify-center md:p-8 z-20">
            {/* Title Image on top */}
            <div className="relative flex flex-col w-full max-w-full md:max-w-[90%] aspect-square md:aspect-auto h-[80%] md:h-[80%]">
              <Image
                src="/bgcomitens.png"
                alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
                fill
                className="md:hidden block object-contain object-right z-10"
                sizes="55vw"
                priority
              />
              <Image
                src="/title.png"
                alt="3FIT Market - Seja um licenciado"
                fill
                className="mt-10 md:mt-0 object-contain object-center z-10 !h-[70%] md:!h-[100%]"
                sizes="45vw"
                priority
              />
              <Image
                src="/bg.png"
                alt=""
                fill
                className="object-cover object-top md:hidden block"
                sizes="(max-width: 768px) 100vw, 75vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col w-full">

        <div className="relative w-full h-[40vh] min-h-[300px]">
          <Image
            src="/bgcomitens.png"
            alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
            fill
            className="object-cover object-right"
            sizes="100vw"
            priority
          />
        </div>

        {/* title.png with bg.png - Below in mobile */}
        <div className="relative w-full h-[60vh] min-h-[300px] flex items-center justify-center">
          <div className="relative w-full h-full p-2">
            <Image
              src="/bg.png"
              alt=""
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
            <div className="relative w-full h-full flex items-center justify-center z-10">
              <div className="relative w-full max-w-full aspect-square h-[80%] -translate-y-[5.5rem]">
                <Image
                  src="/title.png"
                  alt="3FIT Market - Seja um licenciado"
                  fill
                  className="object-contain object-center"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Wave at bottom - Mobile only */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      </div>

      {/* Wave at bottom - Desktop only */}
      <div className="absolute hidden md:block bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
