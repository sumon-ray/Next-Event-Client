import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/Providers/Providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: "Next Event",
  description: "Next Event is a simple event management app where you can create and manage events for your organization. You can add events, set dates, and invite attendees. It's easy to use and customizable to fit your needs. Try it out today and see how it can help you manage your events more efficiently.",
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
        <body className={`${inter} antialiased`}>
              <Providers>
          {children}
              </Providers>
          </body>
      </html>
  );
}
