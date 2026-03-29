"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";


const PACKAGES = [
  { id: "pkg-1", amount: 100, minutes: 10, bonus: 0, label: "Starter" },
  { id: "pkg-2", amount: 250, minutes: 25, bonus: 5, label: "Popular" },
  { id: "pkg-3", amount: 500, minutes: 50, bonus: 15, label: "Value" },
  { id: "pkg-4", amount: 1000, minutes: 100, bonus: 40, label: "Unlimited" },
];

export default function PackagesPage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleRecharge = async (pkg: typeof PACKAGES[0]) => {
    setIsLoading(pkg.id);
    
    // In local development, we simulate the Razorpay success
    // In production, this would call api/payment/create-order
    setTimeout(async () => {
      try {
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: pkg.amount,
            userId: session?.user?.id,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          // Update the localized session balance
          await update({
            ...session,
            user: { ...session?.user, walletBalance: data.newBalance },
          });
          alert(`Successfully recharged ₹${pkg.amount}! Your new balance is ₹${data.newBalance}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(null);
      }
    }, 1500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10 pb-20">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-display font-bold text-text">
          Recharge Your Wallet
        </h1>
        <p className="text-text-2">
          Calls are charged at a flat rate of <span className="text-accent font-bold">₹10/min</span>
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-accent/50 transition-all group"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-text-3 group-hover:text-accent transition-colors">
                {pkg.label}
              </span>
              <div className="text-3xl font-display font-bold text-text">
                ₹{pkg.amount}
              </div>
            </div>

            <div className="w-full h-px bg-border group-hover:bg-accent/20 transition-all" />

            <div className="space-y-1 text-sm">
              <p className="text-text font-semibold">
                {pkg.minutes + pkg.bonus} Talk Minutes
              </p>
              {pkg.bonus > 0 && (
                <p className="text-green-500 text-xs font-medium">
                  Includes {pkg.bonus} bonus mins!
                </p>
              )}
            </div>

            <button
              onClick={() => handleRecharge(pkg)}
              disabled={!!isLoading}
              className="w-full bg-bg border border-border hover:bg-accent hover:text-bg hover:border-accent font-bold py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoading === pkg.id ? "Processing..." : "Buy Plan"}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
          💡
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-text">How billing works?</h3>
          <p className="text-sm text-text-2 leading-relaxed">
            Every call you join or start is billed at <strong>₹10 per minute</strong>. 
            Billing starts only when the call is connected. If you have less than ₹10 in your wallet, 
            you won&apos;t be able to start a new call.
          </p>
        </div>
      </div>
    </div>
  );
}
