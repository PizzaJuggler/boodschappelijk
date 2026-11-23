import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boodschappelijk",
  description:
    "Zoek de winkel met de meeste aanbiedingen om je producten te halen",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const t = useTranslations();

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider>
          <nav className="h-full px-4 py-4 bg-accent shadow-md z-1">
            <div className="md:w-3xl md:mx-auto px-4">
              <Link href="/">
                <h1 className="font-bold">{t("app.name")}</h1>
              </Link>
            </div>
          </nav>

          <Providers>
            <div className="md:w-3xl md:mx-auto pb-20 flex flex-col px-4 py-4 gap-4">
              {children}
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
