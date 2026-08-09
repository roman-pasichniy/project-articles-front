import type { Metadata } from "next";
import { DM_Sans, Manrope, Noto_Sans } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "cyrillic"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${dmSans.variable} ${notoSans.variable}`}
    >
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
