"use client";

import { PhoneOff, Phone } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useApp } from "@/lib/context";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

// Dynamically imported so the ZegoCloud SDK never runs during SSR
const ZegoCall = dynamic(() => import("./ZegoCall"), { ssr: false });

export function CallModal() {
  const { activeCall, endCall, showToast } = useApp();
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);

  if (!activeCall) return null;

  const handleAccept = () => {
    setIsConnected(true);
    showToast(`Connecting... 🎙️`);
  };

  const handleDecline = () => {
    endCall();
    showToast("Call declined");
  };

  const handleCallEnd = async (durationSeconds: number) => {
    setIsConnected(false);
    endCall();
    
    const userId = (session?.user as any)?.id;
    if (!userId || durationSeconds <= 0) return;

    // Call the billing API
    try {
      const res = await fetch("/api/calls/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, durationSeconds }),
      });
      const data = await res.json();
      const mins = Math.floor(durationSeconds / 60);
      const secs = durationSeconds % 60;
      if (data.success) {
        showToast(`Call ended (${mins}m ${secs}s). ₹${data.cost} deducted. Balance: ₹${data.newBalance}`);
      }
    } catch (err) {
      console.error("Billing error:", err);
      showToast("Call ended.");
    }
  };

  if (isConnected) {
    return (
      <div className="fixed inset-0 z-[300] bg-bg">
        <ZegoCall
          roomID={activeCall.id}
          userID={session?.user?.id || "anonymous"}
          userName={session?.user?.name || "User"}
          onCallEnd={handleCallEnd}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <div className="bg-bg-2 border border-border-2 rounded-2xl px-8 py-9 text-center w-72 animate-slideUp">
        {/* Animated avatar ring */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-accent animate-callRing" />
          <Avatar
            initials={activeCall.initials}
            avatarColor={activeCall.avatarColor}
            size="lg"
            className="w-20 h-20"
          />
        </div>

        <h3 className="font-display font-bold text-xl mb-1.5">
          {activeCall.name}
        </h3>
        <p className="text-sm text-text-2 mb-7">
          {activeCall.isIncoming ? "Incoming Private Call..." : "Calling..."}
        </p>

        <div className="flex justify-center gap-5">
          <button
            onClick={handleDecline}
            className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center text-white text-xl hover:scale-105 transition-transform"
          >
            <PhoneOff size={22} />
          </button>
          <button
            onClick={handleAccept}
            className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-white text-xl hover:scale-105 transition-transform"
          >
            <Phone size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
