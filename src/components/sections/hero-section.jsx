'use client';

import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DollarIcon, BookIcon, HeadphonesIcon, ClockIcon } from "@/components/icons";
import Image from 'next/image';

const advantages = [
  {
    title: "Baixo investimento e alta lucratividade",
    icon: DollarIcon,
  },
  {
    title: "Treinamentos completos e capacitação",
    icon: BookIcon,
  },
  {
    title: "Suporte operacional",
    icon: HeadphonesIcon,
  },
  {
    title: "Retorno a curto prazo",
    icon: ClockIcon,
  },
];

export function HeroSection() {
  const handleScrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAdvantages = () => {
    document.getElementById('vantagens')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="vantagens" className="relative text-white md:pb-4 overflow-hidden pt-0 scroll-mt-20">
      <div className="absolute hidden md:block inset-0 z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute right-0 top-0 bottom-[50%] xl:bottom-[25%] w-full md:w-full md:origin-top-right ">
          <Image
            src="/influencers.png"
            alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
            fill
            sizes="100vw"
            className="object-cover md:object-contain object-right"
            priority
          />         
        </div>
      </div>

      <div className="absolute hidden md:block inset-0 z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute right-0 top-0 bottom-[50%] lg:bottom-[25%] w-full md:w-full md:origin-top-right ">        
          <Image
            src="/marmita.webp"
            alt=""
            fill
            sizes="50vw"
            className="object-contain object-center !h-[60%] z-10 hidden md:block translate-y-10 translate-x-[4vw]"
            priority
          />
        </div>
      </div>

      <div className="w-full z-10">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-[50%_50%] w-full min-h-screen md:min-h-[500px] gap-0">
          <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] flex md:items-center justify-center md:p-8 z-20">
            <div className="relative flex flex-col w-full max-w-full md:max-w-screen h-full items-center justify-center">
              <div className="relative flex flex-col w-full aspect-square md:aspect-auto h-[40vh]">
                <Image
                  src="/title-logo.png"
                  alt="3FIT Market - Seja um licenciado"
                  fill
                  sizes="100vw"
                  className="mt-10 md:mt-0 object-contain object-center z-10 !h-[70%] md:!h-[40vh]"
                  priority
                />
              </div>
              <div className="relative flex flex-col w-full aspect-square md:aspect-auto !max-h-[1vh]">
                <Image
                  src="/influencers.png"
                  alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
                  fill
                  sizes="100vw"
                  className="md:hidden block object-contain object-right z-10"
                  priority
                />
              </div>

              <div className="relative hidden md:flex gap-4 w-full min-w-screen text-white px-4 z-50 translate-x-2">
                <div className="flex w-full items-center justify-center h-32">
                  <h2 className="text-lg md:text-xl font-bold text-center leading-tight">
                    <span className="whitespace-nowrap block">Seja dono do <span className="font-extrabold uppercase bg-black px-1 text-[#FF8D00]">SEU PRÓPRIO NEGÓCIO</span></span>
                    <span className="whitespace-nowrap block">de alimentação saudável, torne-se</span>
                    <span className="whitespace-nowrap block">hoje mesmo o mais novo licenciado da</span>
                    <span className="whitespace-nowrap block">3Fit.</span>
                  </h2>                

                </div>

                <div className="absolute flex h-32 w-screen sm:translate-x-12 lg:translate-x-0">                
                  <div className="absolute xl:left-1/2 md:left-auto md:-translate-x-1/2 md:-right-10 xl:right-auto flex flex-col gap-3 mt-2">
                    {advantages.map((advantage, index) => {
                      const IconComponent = advantage.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative w-6 h-6 flex-shrink-0">
                            <div className="absolute inset-0 rounded-full bg-black border-2 border-white"></div>
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              {IconComponent && <IconComponent className="w-3.5 h-3.5 text-[#FF8D00]" strokeWidth={2.5} />}
                            </div>
                          </div>
                          <span className="text-sm md:text-base text-white font-semibold whitespace-nowrap">{advantage.title}</span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col w-full">
        <div className="relative w-full flex flex-col items-center justify-center gap-4 py-4">
          <div className="relative w-full h-[45svh] min-h-[300px]">
            <Image
              src="/influencers-logo.png"
              alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
              fill
              sizes="100vw"
              className="object-contain object-center z-10"
              priority
            />
          </div>
          <div className="relative w-full h-32 flex items-center justify-center">
            <Image
              src="/title2.png"
              alt="3FIT Market - Seja um licenciado"
              width={300}
              height={128}
              className="object-contain object-center h-full w-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="relative w-full max-w-[95%] px-4 mt-8 mb-4">
            <h2 className="text-white text-lg md:text-xl font-bold text-center mb-6 leading-tight">
              Seja dono do <span className="font-extrabold uppercase bg-black px-1 text-[#FF8D00]">SEU PRÓPRIO NEGÓCIO</span> de alimentação saudável, torne-se hoje mesmo o mais novo licenciado da 3Fit.
            </h2>

          </div>
        </div>


      </div>

    </section>
  );
}
