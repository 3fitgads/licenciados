'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'fadeInUp' | 'fadeInDown';
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.6,
  animation = 'fadeInUp',
}: AnimateOnScrollProps) {
  const [canObserve, setCanObserve] = useState(false);
  const { ref, isInView } = useInView({ 
    threshold: 0, 
    rootMargin: '200px 0px 0px 0px', // Começa a animar 200px antes de entrar na viewport
    triggerOnce: true,
    enabled: canObserve // Adiciona opção enabled
  });

  // Aguarda um pouco antes de começar a observar, para evitar animações durante scroll inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanObserve(true);
    }, 500); // Delay de 500ms para permitir que a página estabilize

    return () => clearTimeout(timer);
  }, []);

  const animationClasses = {
    fadeIn: isInView ? 'opacity-100' : 'opacity-0',
    slideUp: isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
    slideLeft: isInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0',
    slideRight: isInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0',
    scale: isInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
    fadeInUp: isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
    fadeInDown: isInView ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0',
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'transition-all ease-out',
        animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
