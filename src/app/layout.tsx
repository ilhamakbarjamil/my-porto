import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ilham Akbar Jamil — Data Science & Web Developer",
  description:
    "Professional portfolio of Ilham Akbar Jamil, focused on Data Science, Machine Learning, NLP, and Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}