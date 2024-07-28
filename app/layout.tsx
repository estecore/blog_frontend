import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { ClientProvider } from "@/components/ClientProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Frontend",
  description: "Blog Frontend with Next.js by Estecore",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
