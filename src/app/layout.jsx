import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/section_components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";

import dynamic from "next/dynamic";

const Navbar = dynamic(() =>
  import("@/components/menu_components/Navbar", { ssr: false })
);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gymshark CR Unofficial Store",
  description:
    "Discover high-quality fitness and sports apparel at M&M Clothes CR Official Store. Shop Gymshark and top brands to elevate your performance and style.",
  icons: {
    icon: "/icon.avif",
    shortcut: "/icon.avif",
    apple: "/apple-icon.avif",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-icon.avif",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WixClientContextProvider>
          <Navbar />
          {children}
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
