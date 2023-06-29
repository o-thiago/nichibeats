import "../styles/globals.css";
import "animate.css";
import "font-awesome/css/font-awesome.min.css";

import { Inter } from "next/font/google";
import { TrpcProvider } from "@/shared/trpc/trpc-provider";
import { AppShell } from "@/components/shell";
import { AudioContextProvider } from "@/context/audio-context";

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
    <html data-theme="dark" lang="en">
      <body className={inter.className}>
        <TrpcProvider>
          <AudioContextProvider>
            <AppShell>
              <div className="min-h-[80vh]">{children}</div>
            </AppShell>
          </AudioContextProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
