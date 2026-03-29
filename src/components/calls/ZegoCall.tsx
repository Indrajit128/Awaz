"use client";

import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSession } from "next-auth/react";

interface ZegoCallProps {
  roomID: string;
  userID: string;
  userName: string;
  onCallEnd: (durationSeconds: number) => void;
}

const RATE_PER_MINUTE = 10; // ₹10 per minute

export default function ZegoCall({ roomID, userID, userName, onCallEnd }: ZegoCallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const { data: session, update } = useSession();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentCost, setCurrentCost] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const walletBalance = (session?.user as any)?.walletBalance || 0;
  const userId = (session?.user as any)?.id;

  // Real-time billing ticker
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);
      const cost = Math.ceil(elapsed / 60) * RATE_PER_MINUTE;
      setCurrentCost(cost);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Billing deduction on call end
  const handleCallEnd = async (durationSeconds: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    try {
      if (userId && durationSeconds > 0) {
        const res = await fetch("/api/calls/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, durationSeconds }),
        });

        if (res.ok) {
          const data = await res.json();
          // Refresh session balance
          await update({
            ...session,
            user: { ...session?.user, walletBalance: data.newBalance },
          });
        }
      }
    } catch (err) {
      console.error("Billing error:", err);
    }

    onCallEnd(durationSeconds);
  };

  useEffect(() => {
    const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET as string;

    if (!appID || !serverSecret || isNaN(appID)) return;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      showPreJoinView: false,
      onLeaveRoom: () => {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        handleCallEnd(duration);
      },
    });

    return () => { zp.destroy(); };
  }, [roomID, userID, userName]);

  const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Balance warning: less than 1 minute remaining
  const minutesRemaining = Math.floor(walletBalance / RATE_PER_MINUTE);
  const isLowBalance = minutesRemaining < 2;

  if (!appID || !serverSecret || isNaN(appID)) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-bg-2 p-8 text-center gap-5">
        {/* Billing HUD */}
        <div className="absolute top-4 right-4 bg-bg/80 backdrop-blur border border-border rounded-xl px-4 py-3 text-right space-y-1">
          <p className="text-xs text-text-3 uppercase tracking-widest">Session Cost</p>
          <p className="text-xl font-display font-bold text-red-400">
            ₹{currentCost.toFixed(0)}
          </p>
          <p className="text-xs text-text-2">{formatTime(elapsedSeconds)} elapsed</p>
          {isLowBalance && (
            <p className="text-xs text-yellow-400 font-semibold animate-pulse">
              ⚠️ Low Balance: ~{minutesRemaining} min left
            </p>
          )}
        </div>

        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-4xl">🎙️</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white">Call Simulator</h2>
        <p className="text-text-2 max-w-sm text-sm">
          ZegoCloud keys not configured — running in Simulator Mode.
          Billing is calculated at <strong>₹{RATE_PER_MINUTE}/min</strong>.
        </p>
        <div className="bg-bg/60 border border-border rounded-xl px-6 py-3 text-center">
          <p className="text-xs text-text-3 mb-1">Wallet Balance</p>
          <p className="font-display font-bold text-lg text-accent">
            ₹{walletBalance.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-text-3 mt-1">≈ {minutesRemaining} minutes talk time</p>
        </div>
        <button
          onClick={() => {
            const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
            handleCallEnd(duration);
          }}
          className="px-8 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg"
        >
          End Call
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {/* Billing HUD */}
      <div className="absolute top-4 right-4 z-50 bg-bg/80 backdrop-blur border border-border rounded-xl px-4 py-3 text-right space-y-1">
        <p className="text-xs text-text-3 uppercase tracking-widest">Session Cost</p>
        <p className="text-xl font-display font-bold text-red-400">
          ₹{currentCost.toFixed(0)}
        </p>
        <p className="text-xs text-text-2">{formatTime(elapsedSeconds)} elapsed</p>
        {isLowBalance && (
          <p className="text-xs text-yellow-400 font-semibold animate-pulse">
            ⚠️ Low Balance: ~{minutesRemaining} min left
          </p>
        )}
      </div>
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}
