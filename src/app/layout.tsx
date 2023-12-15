import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio of Sean Stocker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " overflow-x-hidden bg-gradient-to-r from-neutral-950 to-slate-800"
        }
      >
        {/* Navigation */}
        <div className="h-12">
          <Navigation />
        </div>

        {/* Content */}
        <main style={{ minHeight: "calc(100vh - 96px)" }}>{children}</main>

        {/* Footer */}
        <div className="h-12">
          <Footer />
        </div>
      </body>
    </html>
  );
}
