import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = {
    id: '1',
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@kinesoft.fr',
    role: 'kine' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  };
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <Header user={currentUser} title="Tableau de bord" />
        <main className="ml-64 p-6 pt-20">
        {children}
        </main>
        </div>
      </body>
    </html>
  );
}
