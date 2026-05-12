import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sugeng Trianto — Software Engineer",
  description:
    "Fullstack Engineer · AI · Blockchain. Crafting digital realities with intelligence, code, and relentless precision.",
  keywords: [
    "Sugeng Trianto",
    "Software Engineer",
    "Fullstack Developer",
    "AI Engineer",
    "Blockchain Developer",
    "Web3",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Sugeng Trianto" }],
  creator: "Sugeng Trianto",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sugengtrianto.dev",
    title: "Sugeng Trianto — Software Engineer",
    description:
      "Crafting digital realities with intelligence, code, and relentless precision.",
    siteName: "Sugeng Trianto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugeng Trianto — Software Engineer",
    description:
      "Crafting digital realities with intelligence, code, and relentless precision.",
    creator: "@gulatebuuu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@200;300;400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
