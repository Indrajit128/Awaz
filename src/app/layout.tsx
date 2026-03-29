import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProvider } from "@/lib/context";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { ActiveRoomBar } from "@/components/rooms/ActiveRoomBar";
import { CallModal } from "@/components/calls/CallModal";
import { CreateRoomModal } from "@/components/rooms/CreateRoomModal";
import { Toast } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Awaaz — Social Voice Chat",
  description:
    "Connect through live audio rooms and private calls. Meet new people and build real friendships on Awaaz.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-text font-sans">
        <SessionProvider>
          <AppProvider>
            <Navbar />

            {/* 3-column layout */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: "240px 1fr 280px",
                height: "calc(100vh - 64px)",
              }}
            >
              <LeftSidebar />
              <main className="overflow-y-auto">{children}</main>
              <RightSidebar />
            </div>

            {/* Global overlays */}
            <ActiveRoomBar />
            <CallModal />
            <CreateRoomModal />
            <Toast />
          </AppProvider>
        </SessionProvider>
      </body>
    </html>


  );
}




