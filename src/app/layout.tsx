import "../styles/globals.css";
import "font-awesome/css/font-awesome.min.css";

import { Inter } from "next/font/google";
import { WrapperNav } from "@/components/ui/nav/wrapper-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NichiBeats",
  description: "For all the repressed musical tastes!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WrapperNav>
          <div className="min-h-screen">{children}</div>
        </WrapperNav>
      </body>
    </html>
  );
}
