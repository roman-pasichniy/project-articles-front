import type { Metadata } from "next";
import { DM_Sans, Manrope, Noto_Sans, Merienda} from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Harmoniq",
  description: "Платформа для публікацій про баланс та well-being.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="uk"
      className={`${manrope.variable} ${dmSans.variable} ${notoSans.variable} ${merienda.variable}`}
    >
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
