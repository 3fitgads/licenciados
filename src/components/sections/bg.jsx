'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export function Bg() {
  const [numberOfRepetitions, setNumberOfRepetitions] = useState(6);
  const [blockHeight, setBlockHeight] = useState(0);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastHeightRef = useRef(0);
  const lastRepsRef = useRef(6);

  useEffect(() => {
    const calculateRepetitions = (immediate = false) => {
      if (typeof window !== 'undefined') {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        const run = () => {
          requestAnimationFrame(() => {
            const parent = containerRef.current?.parentElement;
            if (!parent) return;
            
            const currentHeight = parent.offsetHeight;
            const currentVh50 = window.innerHeight / 2;
            
            const heightDiff = Math.abs(currentHeight - lastHeightRef.current);
            const isFirstLoad = lastHeightRef.current === 0;

            if (isFirstLoad || heightDiff > 200) {
              const newBlockHeight = Math.floor(currentVh50);
              const reps = Math.ceil(currentHeight / newBlockHeight);
              
              if (reps !== lastRepsRef.current || isFirstLoad) {
                setNumberOfRepetitions(reps);
                lastRepsRef.current = reps;
              }
              setBlockHeight(newBlockHeight);
              lastHeightRef.current = currentHeight;
            }
          });
        };

        if (immediate) {
          run();
        } else {
          timeoutRef.current = setTimeout(run, 300);
        }
      }
    };

    const parent = containerRef.current?.parentElement;
    let resizeObserver;
    
    if (parent) {
      resizeObserver = new ResizeObserver(() => calculateRepetitions(false));
      resizeObserver.observe(parent);
    }

    window.addEventListener('resize', () => calculateRepetitions(false));
    
    calculateRepetitions(true);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', () => calculateRepetitions(false));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden"
    >
      {Array.from({ length: numberOfRepetitions }).map((_, index) => {
        const isEven = index % 2 === 0;
        
        const topPosition = blockHeight 
          ? `${index === 0 ? 0 : index * blockHeight - index}px` 
          : `${index * 50}svh`;
        const heightValue = blockHeight ? `${blockHeight}px` : `50svh`;
        
        return (
          <div
            key={index}
            className="absolute left-0 w-full overflow-hidden"
            style={{ 
              top: topPosition,
              height: heightValue
            }}
          >
            <Image
              src="/bg.png"
              alt=""
              fill
              sizes="100vw"
              className={`object-cover object-bottom ${
                isEven ? '' : '[transform:rotate(180deg)scaleX(-1)]'
              }`}
              priority={index < 4}
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}
    </div>
  );
}
