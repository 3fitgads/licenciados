'use client';

import Image from 'next/image';
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Banner } from "@/components/ui/banner";

export function WhatYouGetSection() {
  return (
    <section id="o-que-voce-recebe" className="relative bg-white overflow-hidden pb-8 md:pb-0 scroll-mt-10">
      <div className="absolute bg-black hidden md:block inset-0 -z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute left-0 top-0 bottom-[18%] w-full md:w-full md:origin-top-left">
          <Image
            src="/freezer.webp"
            alt="Freezer 3FIT Home Office"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover md:object-contain object-left"
            priority
          />
        </div>
      </div>

      <div className="w-full z-0 overflow-hidden">
        <div className="hidden md:flex justify-center w-full min-h-[610px]">
          <div className="relative z-0 flex items-center justify-center" style={{ width: '800px', height: '600px', flexShrink: 0 }}>
            <Image
              src="/freezer.webp"
              alt="Freezer 3FIT Home Office"
              width={500}
              height={500}
              className="object-contain object-right"
              priority
            />
            <div className="relative w-full h-full min-h-[500px] flex items-start py-12 md:py-16 px-4 md:px-6 z-0">
              <div className="flex flex-col justify-center items-center w-full mx-auto pr-2 md:pr-4 relative z-10">
                <AnimateOnScroll animation="slideLeft" delay={0.3} duration={0.8}>
                  <div className='w-full flex flex-col justify-start items-start'>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 leading-tight text-black">
                      <span className="text-black">3Fit</span>
                      <span className="text-[#FF8D00] mx-2">•</span>
                      <span className="text-black italic">Home Office</span>
                    </h2>

                    <div className='w-full space-y-4'>
                      <p className="text-base md:text-lg lg:text-xl text-black leading-relaxed">
                        Esse modelo Home Office, pode ser implantado em sua casa, apartamento, com total facilidade.
                      </p>
                      <p className="text-base md:text-lg lg:text-xl text-black leading-relaxed">
                        Dentre isso possui vantagem de não ser necessário um ponto comercial, operação simplificada, baixo custo fixo, entre outras.
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="md:hidden flex flex-col w-full relative">
        <div className="relative w-full min-h-[300px] flex items-center justify-center">
          <div className="relative w-full h-full p-2">
            <div className="relative w-full h-full flex items-center justify-center z-0">
              <div className="flex flex-col justify-center items-center w-full mx-auto p-4 z-0">
                <AnimateOnScroll animation="slideLeft" delay={0.3} duration={0.8}>
                  <div className='w-full px-2 flex flex-col justify-start items-start'>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-black">
                      <span className="text-black">3Fit</span>
                      <span className="text-[#FF8D00] mx-2">•</span>
                      <span className="text-black italic">Home Office</span>
                    </h2>

                    <div className='w-full space-y-4'>
                      <p className="text-base md:text-lg text-black leading-relaxed">
                        Esse modelo Home Office, pode ser implantado em sua casa, apartamento, com total facilidade.
                      </p>
                      <p className="text-base md:text-lg text-black leading-relaxed">
                        Dentre isso possui vantagem de não ser necessário um ponto comercial, operação simplificada, baixo custo fixo, entre outras.
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[70vh] sm:h-[75vh] min-h-[400px] px-4 py-4">
          <Image
            src="/freezer.webp"
            alt="Freezer 3FIT Home Office"
            fill
            sizes="100vw"
            className="object-contain object-center"
            priority
          />
        </div>   
      </div>

    </section>
  );
}
