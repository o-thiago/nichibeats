import "../styles/globals.css";
import "font-awesome/css/font-awesome.min.css";

import { Inter } from "next/font/google";
import { TrpcProvider } from "@/utils/trpc-provider";
import { AppShell } from "@/components/shell";

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
        <TrpcProvider>
          <AppShell>
            <div className="min-h-screen">{children}</div>
          </AppShell>
        </TrpcProvider>
      </body>
    </html>
  );
}
