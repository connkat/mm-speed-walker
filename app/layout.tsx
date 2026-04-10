import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MM Speed Walker",
  description: "Terminal-based speed walker game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-terminal-bg text-[#00ff41] font-mono antialiased">
        <div className="scanlines" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
