"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export function WalletCard() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const balance = (session.user as any).walletBalance || 0;

  return (
    <div className="mx-4 p-4 mt-6 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl border border-accent/20 space-y-3">
      <div className="space-y-0.5">
        <p className="text-[10px] uppercase font-bold tracking-widest text-accent/80">
          Wallet Balance
        </p>
        <div className="text-xl font-display font-bold text-text">
          ₹{balance.toLocaleString("en-IN")}
        </div>
      </div>

      <Link
        href="/packages"
        className="w-full inline-block text-center bg-accent/10 hover:bg-accent/20 text-accent font-bold py-2 rounded-xl text-xs transition-all border border-accent/20"
      >
        Recharge Wallet
      </Link>
    </div>
  );
}
