import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Nagging Partner — Let AI Nag Your People",
  description:
    "Assign tasks to your partner, roommate, or coworker. Pick a nagging persona. They get reminded until it's done. Join the waitlist.",
  metadataBase: new URL("https://thenaggingpartner.com"),
  openGraph: {
    title: "The Nagging Partner — Let AI Nag Your People",
    description:
      "Assign tasks. Pick a persona (Grandma, Drunk Irish Guy, Sergeant). They get nagged until it's done.",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "The Nagging Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nagging Partner — Let AI Nag Your People",
    description:
      "Assign tasks. Pick a persona. They get nagged until it's done.",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
