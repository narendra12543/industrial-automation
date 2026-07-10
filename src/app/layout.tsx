import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { auth } from "@/lib/auth";

import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebsiteSchema from "@/components/seo/WebsiteSchema";
// import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avenautomation.in"),

  title: {
    default: "Aven Automation | Automatic Gates, Doors & Industrial Entrance Automation",
    template: "%s | Aven Automation",
  },

  description:
  "Aven Automation is a leading Industrial Entrance Automation company providing Automatic Sliding Gates, Swing Gates, High Speed Doors, Industrial Doors, Boom Barriers, Rolling Shutters, Dock Levelers, Dock Shelters and complete automation solutions across Pune, Maharashtra and India.",

  keywords: [
    "Industrial Entrance Automation",
    "Industrial Automation",
    "Industrial Automation Company",
    "Industrial Automation Solutions",

    "Automatic Gates",
    "Automatic Gate",
    "Automatic Sliding Gate",
    "Sliding Gate Automation",
    "Automatic Swing Gate",
    "Swing Gate Automation",
    "Telescopic Sliding Gate",

    "Industrial Door",
    "Industrial Doors",
    "Sectional Overhead Door",
    "Transparent Sectional Door",
    "Garage Sectional Door",

    "High Speed Door",
    "Industrial High Speed Door",
    "Roll Up Door",
    "Clean Room Door",
    "Anti Crash Door",
    "Fold Up Door",

    "Motorized Sliding Door",
    "Manual Sliding Door",

    "Boom Barrier",
    "Automatic Boom Barrier",
    "Automatic Swing Barrier",
    "Automatic Rising Bollard",

    "Rolling Shutter",
    "Automatic Rolling Shutter",
    "Motorized Rolling Shutter",
    "Gear Operated Rolling Shutter",

    "Dock Leveler",
    "Hydraulic Dock Leveler",
    "Dock Shelter",
    "Loading Bay Equipment",

    "Steel Sliding Hangar Door",
    "Fabric Fold Up Hangar Door",

    "Sliding Gate Motor",
    "Swing Gate Motor",
    "Rolling Shutter Motor",
    "Glass Sliding Door Motor",

    "Inclined Belt Conveyor",
    "Flat Belt Conveyor",

    "Automatic Gate Manufacturer",
    "Industrial Door Supplier",
    "Boom Barrier Supplier",
    "Industrial Automation Pune",
    "Industrial Automation Maharashtra",
    "Industrial Entrance Automation India",

    "Aven Automation",
  ],

  authors: [
    {
      name: "Aven Automation",
    },
  ],

  creator: "Aven Automation",

  publisher: "Aven Automation",

  applicationName: "Aven Automation",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://avenautomation.in",
    title:
      "Aven Automation | Automatic Gates & Industrial Entrance Automation",
    description:
  "Industrial Entrance Automation solutions including Automatic Gates, High Speed Doors, Boom Barriers, Industrial Doors and Gate Automation across Pune, Maharashtra and India.",
    siteName: "Aven Automation",

    locale: "en_IN",

    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Aven Automation",
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aven Automation",
    description:
      "Automatic Gates, Boom Barriers, Industrial Doors & Entrance Automation.",

    // images: ["/og-image.jpg"],
  },
  manifest: "/manifest.webmanifest",
  category: "Industrial Automation",
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
        <GoogleTagManager gtmId="GTM-NLWFD6SD" />
        <OrganizationSchema
          url="https://avenautomation.in"
          logo="https://avenautomation.in/aven-logo.png"
        />
        <WebsiteSchema />
        {/* <LocalBusinessSchema /> */}

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