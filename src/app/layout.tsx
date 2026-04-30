import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookends Hospitality Pvt. Ltd.",
  description: "A cinematic hospitality landing page for Bookends, Capiche, Ghaslet, and Banquets."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
