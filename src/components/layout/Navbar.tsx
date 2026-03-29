"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Wallet } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

const NAV_TABS = [
  { label: "Rooms", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Calls", href: "/calls" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openCreateModal } = useApp();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between px-6 h-16 border-b border-border bg-bg/95 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-accent to-brand-pink bg-clip-text text-transparent">
        🎙 Awaaz
      </Link>

      {/* Tabs */}
      <div className="flex gap-1 bg-bg-3 border border-border rounded-xl p-1">
        {NAV_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent-2 text-white shadow-accent-sm"
                  : "text-text-2 hover:text-text"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              pathname === "/admin"
                ? "bg-accent-2 text-white shadow-accent-sm"
                : "text-text-2 hover:text-text"
            )}
          >
            Admin
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
            {/* Wallet balance pill */}
            <Link
              href="/packages"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-full text-xs font-bold text-accent transition-all"
            >
              <Wallet size={12} />
              ₹{((session.user as any).walletBalance || 0).toLocaleString("en-IN")}
            </Link>
            <Button variant="primary" size="sm" onClick={openCreateModal}>
              <Plus size={16} />
              New Room
            </Button>
            <div className="relative group cursor-pointer" onClick={() => signOut()}>
              <Avatar
                initials={session?.user?.name?.[0] || "U"}
                avatarColor="linear-gradient(135deg,#7c3aed,#a78bfa)"
                size="sm"
                online
              />
              <div className="absolute hidden group-hover:block top-full right-0 mt-2 p-2 bg-card border border-border rounded-lg text-[10px] whitespace-nowrap">
                Logout
              </div>
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-accent text-bg text-sm font-bold rounded-xl hover:bg-accent/90 transition-all"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
