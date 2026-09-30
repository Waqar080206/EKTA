import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ekta.example.gov.in"),
  title: {
    default: "EKTA — National Unified Material Master",
    template: "%s · EKTA",
  },
  description:
    "EKTA is an AI-assisted material intelligence platform that unifies fragmented material masters across India's CPSEs into one traceable national standard. AI recommends. Humans approve.",
  applicationName: "EKTA",
  keywords: [
    "EKTA",
    "National Unified Material Master",
    "material master",
    "procurement",
    "CPSE",
    "SAP",
    "data standardisation",
    "SIH 2026",
    "PS 26099",
  ],
  authors: [{ name: "EKTA — Team" }],
  openGraph: {
    title: "EKTA — National Unified Material Master",
    description:
      "One Nation. One Material Code. An AI-assisted material intelligence platform unifying fragmented CPSE material masters into one traceable national standard.",
    type: "website",
    locale: "en_IN",
    siteName: "EKTA",
  },
  twitter: {
    card: "summary_large_image",
    title: "EKTA — National Unified Material Master",
    description:
      "One Nation. One Material Code. AI-assisted material intelligence for India's CPSEs.",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#070B14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
        <div className="grain-layer" aria-hidden="true" />
      </body>
    </html>
  );
}
