import localFont from "next/font/local";
import "./globals.css";

import MetaPixel from "@/components/analytics/meta-pixel/meta-pixel";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Seu Próprio Negócio de Alimentação",
  description: "Conquiste sua liberdade financeira com o modelo de negócio mais inovador do Brasil. Torne-se um licenciado 3FIT e transforme vidas através da nutrição.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased !overflow-x-hidden`}
      >
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
