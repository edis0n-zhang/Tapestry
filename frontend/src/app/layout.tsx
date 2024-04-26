import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tapestry",
  description: "Weaving together the threads to form a tapestry of news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
