'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);

      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;

      const isMobile = window.innerWidth < 768;
      const extraOffset = isMobile ? 0 : 0;

      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight - extraOffset;

      requestAnimationFrame(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    }
  };

  const handleScrollToForm = () => {
    handleScrollTo('formulario');
  };

  const navItems = [
    { label: 'Vantagens', id: 'vantagens' },
    { label: 'Home Office', id: 'o-que-voce-recebe' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'Mercado', id: 'the-market' },
    { label: 'Produtos', id: 'products' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="3FIT Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-gray-dark hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button variant="primary" className="text-xs py-2 px-4 ml-4" onClick={handleScrollToForm}>
              INSCREVA-SE
            </Button>
          </nav>

          <div className="md:hidden flex items-center space-x-3">
            <Button variant="primary" className="text-xs py-2 px-4" onClick={handleScrollToForm}>
              INSCREVA-SE
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-dark hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-left text-gray-dark hover:text-primary transition-colors duration-200 text-sm font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
