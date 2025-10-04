import type { Metadata } from "next";
import Script from "next/script"; 
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/utils/metadata";
import { CurrencyProvider } from "@/components/CurrencyProvider";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.title}`,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website"
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CurrencyProvider>
          <Header />
          <main className="container py-10">{children}</main>
          <Footer />
        </CurrencyProvider>

        {/* This is correct! The Tidio script will load efficiently here. */}
        <Script
          src="//code.tidio.co/ktfrlkezpxpcc8ljjlployujg7nspu2h.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
