import type { Metadata } from "next";
import { DM_Sans, Manrope, Merienda, Noto_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext"],
});

const merienda = Merienda({
  variable: "--font-merienda",
  subsets: ["latin", "latin-ext"],
});

export function generateMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: "harmoniq",
      template: "%s | harmoniq",
    },

    description: "Find your harmony in community",

    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "harmoniq",
      title: "harmoniq",
      description: "Find your harmony in community",
      url: "/",
      images: [
        {
          url: "/images/dandelion-sunset.webp",
          width: 2048,
          height: 1046,
          alt: "Dandelion seeds flying at sunset",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "harmoniq",
      description: "Find your harmony in community",
      images: ["/images/dandelion-sunset.webp"],
    },
  };
}

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${dmSans.variable} ${notoSans.variable} ${merienda.variable}`}
    >
      <QueryProvider>
        {/* <AuthProvider> */}
      <body>
        <Header />
        {children}
        <Footer />
          </body>
          {/* </AuthProvider> */}
        </QueryProvider>
    </html>
  );
}
