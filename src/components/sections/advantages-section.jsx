'use client';

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { DollarIcon, BookIcon, HeadphonesIcon, ClockIcon } from "@/components/icons";
import Image from 'next/image';

let advantages = [
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



export function AdvantagesSection() {
  return (
    <section className="relative scroll-mt-20 overflow-visible">
      {/* bg.png removido - usando componente Bg global */}


      <div className="container mx-auto px-4 relative z-10 pb-12 md:py-16 md:hidden block translate-y-2">
        <div className="flex flex-col gap-3 max-w-2xl mx-auto relative z-10 px-6">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <AnimateOnScroll
                key={index}
                animation="slideLeft"
                delay={0.2 + (index * 0.15)}
                duration={0.6}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-black border-2 border-white"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      {IconComponent && <IconComponent className="w-3.5 h-3.5 text-[#FF8D00]" strokeWidth={2.5} />}
                    </div>
                  </div>
                  <span className="text-sm md:text-base text-white font-semibold">{advantage.title}</span>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
        <AnimateOnScroll
          animation="slideLeft"
          delay={0.8}
          duration={0.6}
        >
          <div className="relative h-[50vh] w-full md:hidden block">
            <div
              className="absolute left-0 top-0 z-30 w-full h-full pointer-events-none"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/marmita.webp"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain object-bottom !h-[100%] z-10 translate-y-10 translate-x-[5vw]"
                  priority
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

    </section>
  );
}
