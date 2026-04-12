import { Suspense } from "react";
import "./globals.css";

export const metadata = {
  title: "SmilePro | Seu Sorriso Perfeito Começa Aqui",
  description: "Clínica de odontologia referência em São Paulo. Especialistas em implante, ortodontia e harmonização. Agende sua avaliação gratuita.",
};

export const viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}

