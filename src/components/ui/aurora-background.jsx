'use client';
import { cn } from '@/lib/utils';
import React from 'react';

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  colorScheme = 'default',
  ...props
}) => {
  const isOrange = colorScheme === 'orange';
  
  return (
    <div className={cn(
      isOrange ? 'absolute inset-0 w-full h-full -z-0' : 'fixed inset-0 w-full min-h-full -z-50'
    )}>
      <div
        className={cn(
          isOrange 
            ? 'relative flex flex-col min-h-full w-full items-center justify-center transition-bg'
            : 'relative flex flex-col min-h-full w-full items-center justify-center bg-white transition-bg',
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              isOrange
                ? `
            [--orange-gradient:repeating-linear-gradient(100deg,#FF7033_0%,#FF7033_7%,transparent_10%,transparent_12%,#FF7033_16%)]
            [--aurora:repeating-linear-gradient(100deg,#FF7033_10%,#FF8A4D_25%,#FFE5D9_50%,#FF8A4D_75%)]
            [background-image:var(--orange-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            pointer-events-none
            absolute -inset-[10px] opacity-40
            ${showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_100%)]' : ''}`
                : `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#ffffff_10%,#fafafa_25%,#f5f5f5_50%,#fafafa_75%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            pointer-events-none
            absolute -inset-[10px] opacity-20
            ${showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_100%)]' : ''}`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </div>
  );
};
