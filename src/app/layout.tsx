import "../styles/globals.css";
import "font-awesome/css/font-awesome.min.css";

import { Inter } from "next/font/google";
import { TrpcProvider } from "@/shared/trpc/trpc-provider";
import { AppShell } from "@/components/shell";
import {
  AudioAutomation,
  AudioBufferProvider,
  AudioFileProvider,
  AudioManagerProvider,
} from "@/context/audio-context";

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
          <AudioManagerProvider>
            <AudioBufferProvider>
              <AudioFileProvider>
                <AudioAutomation>
                  <AppShell>
                    <div className="min-h-[80vh]">{children}</div>
                  </AppShell>
                </AudioAutomation>
              </AudioFileProvider>
            </AudioBufferProvider>
          </AudioManagerProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
