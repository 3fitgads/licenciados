'use client';

import { useEffect } from 'react';

export function PreventAutoScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hasHash = window.location.hash;
    
    // Se não há hash na URL, previne scroll automático
    if (!hasHash) {
      // Força scroll para o topo apenas se ainda não houver interação do usuário
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

      // Força scroll para o topo inicialmente
      if (!userInteracted) {
        window.scrollTo(0, 0);
      }
      
      // Previne scroll causado por autofocus após renderização
      let scrollPrevented = false;
      
      const preventAutoScroll = (e) => {
        if (scrollPrevented || userInteracted) return;
        
        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
          // Bloqueia o scroll automático
          e.preventDefault?.();
          
          // Mantém o scroll no topo apenas se o usuário não interagiu
          if (!userInteracted) {
            requestAnimationFrame(() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
            });
          }
          
          scrollPrevented = true;
          
          // Remove o listener após prevenir uma vez
          setTimeout(() => {
            document.removeEventListener('focusin', preventAutoScroll);
            scrollPrevented = false;
          }, 1000);
        }
      };
      
      // Adiciona listener para prevenir scroll no foco
      document.addEventListener('focusin', preventAutoScroll, true);
      
      // Previne scroll após um pequeno delay (para autofocus que acontece depois)
      // Reduzido para ser menos intrusivo
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
