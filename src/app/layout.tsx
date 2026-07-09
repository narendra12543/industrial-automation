import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { auth } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aven Automation",
  description:
    "Automatic Door Motors, Gate Automation Systems, Rolling Shutter Motors, Boom Barriers and Entrance Automation Solutions",
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      products: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const isAuthenticated =
    !!session?.user;

  const isAdmin =
    session?.user?.role ===
    "ADMIN";

  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
    >
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-white antialiased`}
      >
        <Header
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          categories={categories}
        />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}