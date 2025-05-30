import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🎯 Acá cambiamos título y favicon:
export const metadata = {
  title: "REDEPSE",
  description: "Sistema de autogestión de escuelas deportivas",
  icons: {
    icon: "@/app/public/favicon-sde.png", // Asegurate de que esté en la carpeta /public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}