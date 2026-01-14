import { Inter } from "next/font/google";
import localFont from "next/font/local";

import type { Metadata } from "next";

import { EnhancedAuthProvider } from "@/components/enhanced-auth-provider";
import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";
import { StyleGlideProvider } from "@/components/styleglide-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://awfixer.com"),
  title: {
    default: "AWFixer and Friends - Building the Future of Software",
    template: "%s | AWFixer",
  },
  description:
    "AWFixer and Friends: Democratizing quality software through innovative development tools, debugging solutions, and performance monitoring.",
  keywords: [
    "AWFixer",
    "AWFixer and Friends",
    "debugging tools",
    "web development",
    "software quality",
    "development tools",
    "productivity",
    "code analysis",
    "performance monitoring",
    "developer tools",
    "AWFixerOS",
    "modern development",
  ],
  authors: [{ name: "awfixer.com" }],
  creator: "awfixer.com",
  publisher: "awfixer.com",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo.svg", sizes: "48x48" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.svg", sizes: "96x96", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.svg" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "AWFixer and Friends - Building the Future of Software",
    description:
      "AWFixer and Friends: Democratizing quality software through innovative development tools, debugging solutions, and performance monitoring.",
    siteName: "AWFixer and Friends",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWFixer and Friends - Building the Future of Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWFixer and Friends - Building the Future of Software",
    description:
      "AWFixer and Friends: Democratizing quality software through innovative development tools, debugging solutions, and performance monitoring.",
    images: ["/og-image.jpg"],
    creator: "@awfixer",
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
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <EnhancedAuthProvider>
            <StyleGlideProvider />
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </EnhancedAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
