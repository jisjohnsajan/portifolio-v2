import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Jis John Sajan — Software Engineer Portfolio",
  description:
    "Portfolio of Jis John Sajan — Computer Science student & aspiring software engineer passionate about problem-solving, web development, IoT, and emerging technologies. Explore projects, skills, and certifications.",
  keywords: [
    "Jis John Sajan",
    "Software Engineer",
    "Portfolio",
    "CSE Student",
    "Web Developer",
    "IoT Developer",
    "Python Developer",
    "Problem Solver",
    "Kerala Engineer",
  ],
  authors: [{ name: "Jis John Sajan" }],
  creator: "Jis John Sajan",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Jis John Sajan — Software Engineer Portfolio",
    description:
      "Computer Science student passionate about building, solving, and innovating. Explore my projects, skills, and certifications.",
    type: "website",
    locale: "en_US",
    siteName: "Jis John Sajan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jis John Sajan — Software Engineer Portfolio",
    description:
      "Computer Science student passionate about building, solving, and innovating.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
