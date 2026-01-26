'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { NumberTicker } from "@/components/ui/number-ticker";

const marketStats = [
  {
    percentage: 25,
    text: "do faturamento do varejo nacional"
  },
  {
    percentage: 12.8,
    text: "do crescimento médio ao ano."
  },
  {
    percentage: 25.9,
    text: "de crescimento, com variação positiva, no mercado de alimentação saudável."
  },
  {
    percentage: 25,
    text: "1,68 milhão de empregos diretos, sendo o setor que mais gera empregos na indústria de transformação no país."
  }
];

function DonutChart({ percentage, index }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    if (isInView) {
      const targetOffset = circumference - (percentage / 100) * circumference;
      setOffset(targetOffset);
    }
  }, [isInView, circumference, percentage]);

  return (
    <AnimateOnScroll animation="fadeInUp" delay={0.2 + (index * 0.1)} duration={0.8}>
      <div className="flex flex-col items-center">
        <div ref={ref} className="relative w-32 h-32 md:w-40 md:h-40">
          <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#FFE5D9"
              strokeWidth="20"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#FF8D00"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-[#FF8D00]">
              <NumberTicker value={percentage} decimalPlaces={percentage % 1 !== 0 ? 1 : 0} />
              <span className="text-xl md:text-2xl">%</span>
            </span>
          </div>
        </div>
        <p className="text-sm md:text-base text-black text-center mt-4 max-w-xs">
          {marketStats[index].text}
        </p>
      </div>
    </AnimateOnScroll>
  );
}

export function TheMarketSection() {
  return (
    <section id="the-market" className="relative bg-white overflow-hidden py-12 md:py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fadeInUp" delay={0.1} duration={0.8}>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold italic mb-4 text-[#FF8D00]">
              O MERCADO
            </h2>
            <p className="text-base md:text-lg text-black font-semibold">
              Invista no setor que movimenta 35 Bilhões ao ano.
            </p>
            <p className="text-base md:text-lg text-black font-semibold">
              Conheça alguns números do mercado de alimentação saudável
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto mt-12">
          {marketStats.map((stat, index) => (
            <DonutChart key={index} percentage={stat.percentage} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
