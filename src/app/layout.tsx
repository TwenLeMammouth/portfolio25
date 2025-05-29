import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react'
import { Geist, Geist_Mono, Underdog, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const underdog = Underdog({
  variable: "--font-underdog",
  subsets: ["latin"],
  weight: "400",
})

const cinzelDecorative = Cinzel_Decorative({
  variable: '--font-cinzel-decorative',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: "Vincent Groslier – Portfolio",
  description: "Frontend developer passionate about elegant code and modern magic.",
  metadataBase: new URL("https://vincentg-portfolio.vercel.app/"),
  openGraph: {
    title: "Vincent Groslier – Portfolio",
    description: "Explore my projects, skills, and what makes me unique.",
    url: "https://vincentg-portfolio.vercel.app/",
    siteName: "Vincent Groslier",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preview of Vincent Groslier's portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent Groslier – Portfolio",
    description: "Frontend developer blending creativity and efficiency.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${underdog.variable} ${cinzelDecorative.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
