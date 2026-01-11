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
    <section className="relative text-white md:pb-32 overflow-hidden pt-0">
      <div className="absolute hidden md:block inset-0 z-10 md:overflow-visible pointer-events-none" style={{ bottom: '-120px' }}>
        <div className="absolute right-0 top-0 bottom-[50%] lg:bottom-[25%] w-full md:w-full md:origin-top-right ">
          <Image
            src="/influencers.png"
            alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
            fill
            className="object-cover md:object-contain object-right"
            priority
          />
          <Image
            src="/marmita.webp"
            alt=""
            fill
            className="object-contain object-center !h-[60%] z-10 hidden md:block translate-y-10 translate-x-[3vw]"
            priority
          />
        </div>
      </div>


      {/* Hero Images - Side by Side */}
      <div className="w-full z-10">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-[45%_55%] w-full min-h-screen md:min-h-[500px] gap-0">
          {/* Left Side - Title/Text Image */}
          <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] flex md:items-center justify-center md:p-8 z-20">
            <div className="relative flex flex-col w-full max-w-full md:max-w-screen h-full items-center justify-center">
              {/* Title Image on top - estrutura original mantida */}
              <div className="relative flex flex-col w-full aspect-square md:aspect-auto h-[80%] md:h-[80%]">
                <Image
                  src="/influencers.png"
                  alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
                  fill
                  className="md:hidden block object-contain object-right z-10"
                  priority
                />
                <Image
                  src="/title-logo.png"
                  alt="3FIT Market - Seja um licenciado"
                  fill
                  className="mt-10 md:mt-0 object-contain object-center z-10 !h-[70%] md:!h-[40vh]"
                  priority
                />
                {/* bg.png removido - usando componente Bg global */}
              </div>

              {/* Textos abaixo do title-logo - Desktop only */}
              <div className="hidden md:flex flex-col gap-4 w-full min-w-screen text-white px-4 z-50 translate-y-[6rem]">
                {/* Título principal */}
                <h2 className="text-lg md:text-xl font-bold text-center leading-tight">
                  {/* Mobile: 4 linhas */}
                  <span className="lg:hidden whitespace-nowrap block">Seja dono do <span className="font-extrabold uppercase bg-black px-1 text-[#FF8D00]">SEU PRÓPRIO NEGÓCIO</span></span>
                  <span className="lg:hidden whitespace-nowrap block">de alimentação saudável, torne-se</span>
                  <span className="lg:hidden whitespace-nowrap block">hoje mesmo o mais novo licenciado da</span>
                  <span className="lg:hidden whitespace-nowrap block">3Fit.</span>
                  
                  {/* Desktop (md+): 3 linhas */}
                  <span className="hidden lg:block whitespace-nowrap">Seja dono do <span className="font-extrabold uppercase bg-black px-1 text-[#FF8D00]">SEU PRÓPRIO NEGÓCIO</span> de alimentação</span>
                  <span className="hidden lg:block whitespace-nowrap">saudável, torne-se hoje mesmo o mais novo licenciado da</span>
                  <span className="hidden lg:block whitespace-nowrap">3Fit.</span>
                </h2>

                {/* Bullet points com ícones circulares */}
                <div className="flex flex-col gap-3 mt-2">
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
      <div className="md:hidden flex flex-col w-full">
        <div className="relative w-full h-[45svh] min-h-[300px]">
          <Image
            src="/influencers.png"
            alt="Mini mercado 3FIT com geladeira, freezer, totem de pagamento e estrutura"
            fill
            className="object-contain object-center z-10"
            priority
          />
          {/* bg.png removido - usando componente Bg global */}
        </div>

        {/* title.png with bg.png - Below in mobile */}
        <div className="relative w-full h-[45svh] min-h-[300px] flex items-center justify-center">
          <div className="relative w-full h-full p-2">
            {/* bg.png removido - usando componente Bg global */}
            <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
              <div className="relative w-full max-w-full aspect-square h-[360px] mt-16">
                <Image
                  src="/logo2.png"
                  alt="3FIT Market - Seja um licenciado"
                  fill
                  className="object-contain object-center !h-[6rem] translate-x-10 -translate-y-14"
                  sizes="100vw"
                  priority
                />
                <Image
                  src="/title2.png"
                  alt="3FIT Market - Seja um licenciado"
                  fill
                  className="object-contain object-center !h-32 mt-16"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="w-full max-w-[95%] px-4 -translate-y-32">
                <h2 className="text-white text-lg md:text-xl font-bold text-center mb-6 leading-tight">
                  Seja dono do <span className="font-extrabold uppercase bg-black px-1 text-[#FF8D00]">SEU PRÓPRIO NEGÓCIO</span> de alimentação saudável, torne-se hoje mesmo o mais novo licenciado da 3Fit.
                </h2>

              </div>
            </div>
          </div>

          {/* Wave at bottom - Mobile only */}
          {/* <div className="absolute bottom-0 translate-y-1 left-0 right-0 z-20">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
            </svg>
          </div> */}
        </div>
      </div>

      {/* Wave at bottom - Desktop only */}
      {/* <div className="absolute hidden md:block bottom-0 translate-y-1 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div> */}
    </section>
  );
}
