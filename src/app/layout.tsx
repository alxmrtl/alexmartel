import type { Metadata } from "next";
import { JetBrains_Mono, Share_Tech_Mono, Orbitron } from "next/font/google";
import ThemeApplicator from "@/components/ThemeApplicator";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Martel | Neural Interface",
  description: "SYSTEM ONLINE — developer, architect, flow engineer",
  keywords: ["Alex Martel", "Portfolio", "Developer", "Cyberpunk", "Creator"],
  authors: [{ name: "Alex Martel" }],
  openGraph: {
    title: "Alex Martel | Neural Interface",
    description: "SYSTEM ONLINE — developer, architect, flow engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${shareTechMono.variable} ${orbitron.variable}`}>
      <body>
        <ThemeApplicator />
        {children}
      </body>
    </html>
  );
}
