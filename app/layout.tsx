import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components";
import { ThemeWrapper } from "@/components";
import { ClientProvider } from "@/components";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Frontend",
  description:
    "A modern blog frontend built with Next.js by Estecore. Explore and share your thoughts on various topics.",
  keywords: [
    "Blog",
    "Next.js",
    "Frontend",
    "Estecore",
    "Technology",
    "Articles",
    "Web Development",
  ],
  authors: [
    {
      name: "Estecore",
      url: "https://www.estecore.ru",
    },
  ],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Blog Frontend",
    description:
      "A modern blog frontend built with Next.js by Estecore. Explore and share your thoughts on various topics.",
    url: "https://www.estecore.ru",
    siteName: "Blog Frontend",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog Frontend Open Graph Image",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <Header />
          <ThemeWrapper>{children}</ThemeWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
