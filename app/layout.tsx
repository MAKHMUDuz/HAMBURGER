import type { Metadata } from "next";
import { Inter, Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "./components/CartDrawer";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "700", "800"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "F5 Burger | Tazeliği F5’le Yenile",
  description: "Cyber-Neon Premium Burger Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} ${robotoMono.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden transition-colors duration-300`}>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1 relative">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
