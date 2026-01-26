'use client';

import { useEffect } from 'react';

export function PreventAutoScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasHash = window.location.hash;

    if (!hasHash) {
      let userInteracted = false;

      const onUserInteraction = () => {
        userInteracted = true;
        document.removeEventListener('wheel', onUserInteraction);
        document.removeEventListener('touchstart', onUserInteraction);
        document.removeEventListener('mousedown', onUserInteraction);
      };

      document.addEventListener('wheel', onUserInteraction, { passive: true });
      document.addEventListener('touchstart', onUserInteraction, { passive: true });
      document.addEventListener('mousedown', onUserInteraction, { passive: true });

      if (!userInteracted) {
        window.scrollTo(0, 0);
      }

      let scrollPrevented = false;

      const preventAutoScroll = (e) => {
        if (scrollPrevented || userInteracted) return;

        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
          e.preventDefault?.();

          if (!userInteracted) {
            requestAnimationFrame(() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
            });
          }

          scrollPrevented = true;

          setTimeout(() => {
            document.removeEventListener('focusin', preventAutoScroll);
            scrollPrevented = false;
          }, 1000);
        }
      };

      document.addEventListener('focusin', preventAutoScroll, true);

      const timeoutId = setTimeout(() => {
        if (window.scrollY > 0 && !hasHash && !userInteracted) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 50);

      return () => {
        document.removeEventListener('focusin', preventAutoScroll, true);
        document.removeEventListener('wheel', onUserInteraction);
        document.removeEventListener('touchstart', onUserInteraction);
        document.removeEventListener('mousedown', onUserInteraction);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return null;
}
