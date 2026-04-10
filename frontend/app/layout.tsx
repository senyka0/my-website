import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Arsenii Koniachenko | Full-Stack Blockchain Developer",
  description:
    "Portfolio of Arsenii Koniachenko - Full-Stack Blockchain Developer specializing in decentralized applications, smart contracts, and modern web development.",
  keywords: [
    "blockchain developer",
    "full-stack developer",
    "web3",
    "smart contracts",
    "solidity",
    "react",
    "next.js",
    "decentralized applications",
    "dApps",
  ],
  authors: [{ name: "Arsenii Koniachenko" }],
  creator: "Arsenii Koniachenko",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arsenii Koniachenko | Full-Stack Blockchain Developer",
    description:
      "Portfolio of Arsenii Koniachenko - Full-Stack Blockchain Developer specializing in decentralized applications and modern web development.",
    siteName: "Arsenii Koniachenko Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsenii Koniachenko | Full-Stack Blockchain Developer",
    description:
      "Portfolio of Arsenii Koniachenko - Full-Stack Blockchain Developer specializing in decentralized applications and modern web development.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
