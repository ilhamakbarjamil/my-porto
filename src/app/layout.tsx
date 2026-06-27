import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ilham Akbar Jamil — Sains Data & Pengembang Web",
  description:
    "Portofolio profesional Ilham Akbar Jamil, berfokus pada Sains Data, Machine Learning, NLP, dan Pengembangan Web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
