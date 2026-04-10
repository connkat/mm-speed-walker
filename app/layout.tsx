import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metalab Moves: Speed Walker",
  description: "Take your steps without leaving your desk!",
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
