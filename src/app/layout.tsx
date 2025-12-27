
import type { Metadata } from "next";
import { Geist, Geist_Mono, Mulish } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import { DialogProvider } from "@/components/DialogProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BalanceProvider } from "@/contexts/BalanceContext";
import { CriticalCSS } from "@/components/ui/CriticalCSS";
import { WebVitals, PerformanceMonitor } from "@/components/ui/WebVitals";
import { ServiceWorker } from "@/components/ui/ServiceWorker";
import { LayoutWrapper } from "@/components/LayoutWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'monospace'],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "Sitio web oficial de Valor Casino: Las mejores tragamonedas en línea y registro rápido 🎰",
  description: "Juega en Valor Casino - el mejor casino online con tragamonedas, juegos de mesa y bonos exclusivos. Registro rápido y seguro.",
  keywords: "casino online, tragamonedas, slots, juegos de casino, bonos casino, Valor Casino",
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Valor Casino - Las mejores tragamonedas online",
    description: "Juega en Valor Casino - el mejor casino online con tragamonedas, juegos de mesa y bonos exclusivos.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <CriticalCSS />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://valorbetxxl.top" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mulish.variable} antialiased bg-[#f1f3f6]`}
        suppressHydrationWarning={true}
      >
        <WebVitals />
        <PerformanceMonitor />
        <ServiceWorker />
        <LanguageProvider>
          <BalanceProvider>
            <DialogProvider>
              <Header />
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
              <Footer />
            </DialogProvider>
          </BalanceProvider>
        </LanguageProvider>

        {/* Chat Widget */}
        <Script
          id="chat-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,o,f,js,fjs){
                w['ChatWidget'] = o;w[o]=w[o]||function(){(w[o].q = w[o].q || []).push(arguments)};
                js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];
                js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
              }(window,document,'script','chatWidget','https://crm.valor-games.world/widget/widget.js'));
              chatWidget('init', 'JXDFjhHLt2r1zlxIdoqCNJ9cpCp8TFaq');
            `,
          }}
        />

        {/* LiveChat Scripts - Highly Optimized */}
        {/* <Script
          id="chat24-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Delay chat loading until user interaction or 5 seconds
              let chatLoaded = false;
              const loadChat = () => {
                if (chatLoaded) return;
                chatLoaded = true;
                
                window.chat24_token = "0f7f5dc5cec44ea9b6e7fe014e4f4af2";
                window.chat24_url = "https://livechatv2.chat2desk.com";
                window.chat24_socket_url = "wss://livechatv2.chat2desk.com/widget_ws_new";
                window.chat24_static_files_domain = "https://storage.chat2desk.com/";
                window.lang = "ru";
                
                // Load IE support only if needed
                if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident/') !== -1) {
                  const ieScript = document.createElement("script");
                  ieScript.src = "https://livechatv2.chat2desk.com/packs/ie-11-support.js";
                  ieScript.async = true;
                  document.head.appendChild(ieScript);
                }
                
                // Load main chat script
                window.fetch(window.chat24_url + "/packs/manifest.json?nocache=" + Date.now())
                  .then(res => res.json())
                  .then(data => {
                    const chat24 = document.createElement("script");
                    chat24.type = "text/javascript";
                    chat24.async = true;
                    chat24.src = window.chat24_url + data["application.js"];
                    document.body.appendChild(chat24);
                  })
                  .catch(() => console.log('Chat failed to load'));
              };
              
              // Load on user interaction
              ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
                document.addEventListener(event, loadChat, { once: true, passive: true });
              });
              
              // Fallback: load after 5 seconds
              setTimeout(loadChat, 5000);
            `,
          }}
        /> */}
      </body>
    </html>
  );
}
