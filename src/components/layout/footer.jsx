import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#2F3E4C] text-white relative">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Coluna 1: Logo e Descrição */}
          <div>
            <div className="mb-3">
              <Image
                src="/logo.png"
                alt="3FIT Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Transforme vidas através da nutrição e construa um negócio lucrativo.
            </p>
            <div className="flex space-x-3">
              <a href="http://facebook.com/3fit.oficial" target="_blank" className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="text-white font-bold text-sm">f</span>
              </a>
              <a href="https://instagram.com/3fit.oficial" target="_blank" className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@3fit.oficial" target="_blank" className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="font-bold text-base mb-3">Links Rápidos</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <a href="#vantagens" className="text-gray-300 hover:text-primary transition-colors">
                Vantagens
              </a>
              <a href="#products" className="text-gray-300 hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="#o-que-voce-recebe" className="text-gray-300 hover:text-primary transition-colors">
                Home Office
              </a>
              <a href="#faq" className="text-gray-300 hover:text-primary transition-colors">
                FAQ
              </a>
              <a href="#diferenciais" className="text-gray-300 hover:text-primary transition-colors">
                Diferenciais
              </a>
              <a href="#formulario" className="text-gray-300 hover:text-primary transition-colors">
                Inscreva-se
              </a>
              <a href="#the-market" className="text-gray-300 hover:text-primary transition-colors">
                Mercado
              </a>


            </div>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="font-bold text-base mb-3">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>suporte3fit@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>WhatsApp: (11)922213856</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2026 3FIT. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </a>           
          </div>
        </div>
      </div>
    </footer>
  );
}
