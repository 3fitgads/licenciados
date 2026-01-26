'use client';

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import Image from 'next/image';

const products = [
  { image: '/product-1.webp' },
  { image: '/product-2.webp' },
  { image: '/product-3.webp' },
  { image: '/product-4.webp' },
  { image: '/product-5.webp' },
  { image: '/product-6.webp' },
];

export function ProductsSection() {
  return (
    <section id="products" className="relative overflow-hidden pt-12 sm:pt-18 md:pt-20 lg:pt-32 pb-2 sm:pb-18 md:pb-20 lg:pb-32 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mb-8 md:mb-12 px-4">
          <AnimateOnScroll animation="fadeInUp" delay={0.1} duration={0.8}>
            <div>
              <h2 className="text-3xl italic md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-black block">CONHEÇA ALGUNS</span>
                <span className="text-white block">DE NOSSOS PRODUTOS</span>
              </h2>
              <p className="text-base md:text-lg text-white max-w-4xl leading-relaxed font-semibold">
                Nossos produtos passam por um processo de ultracongelamento que preserva sabor, textura e nutrientes, graças à nossa cozinha com tecnologia avançada. Os licenciados recebem as refeições prontas, sem se preocupar com produção ou padronização, podendo focar nas vendas e no relacionamento com os clientes.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:gap-6 max-w-5xl md:max-w-7xl mx-auto mb-12">
          {products.map((product, index) => (
            <AnimateOnScroll
              key={index}
              animation="slideLeft"
              delay={0.2 + (index * 0.05)}
              duration={0.6}
            >
              <div className="relative aspect-[16/9] bg-black rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={product.image}
                  alt={`Produto ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
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

      <div className='w-screen h-[2px] absolute top-0 left-0 bg-white -translate-y-[1px] z-50'></div>

    </section>
  );
}
