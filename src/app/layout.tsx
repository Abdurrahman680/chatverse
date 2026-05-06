import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatVerse | Cyberpunk AI",
  description: "A futuristic AI chatbot experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        {children}
      </body>
    </html>
  );
}
