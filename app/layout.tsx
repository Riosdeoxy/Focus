import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNDA — Sites com identidade",
  description: "Não criamos apenas sites. Criamos a forma como sua marca é percebida.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
