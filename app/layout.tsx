import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScrolling from "./components/ui/SmoothScrolling";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const aeonikRegular = localFont({
  src: "./fonts/Aeonik-Regular.ttf",
  variable: "--font-aeonik-sans",
  weight: "100, 700",
  display: "swap",
});

const sofiaProRegular = localFont({
  src: "./fonts/Sofia-Pro-Regular.otf",
  variable: "--font-sofiaPro-sans",
  weight: "200, 600",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayush Jha Portfolio",
  description:
    "Explore Ayush's portfolio showcasing expertise in Software Engineering, innovative projects, and professional achievements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aeonikRegular.variable} ${sofiaProRegular.variable}  antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScrolling>{children}</SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
