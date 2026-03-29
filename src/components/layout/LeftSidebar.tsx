"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Phone, Heart, ShieldOff, Settings, Wallet } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { FRIENDS } from "@/lib/data";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { WalletCard } from "@/components/wallet/WalletCard";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Discover", href: "/discover" },
  { icon: Phone, label: "Private Calls", href: "/calls" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: Wallet, label: "Recharge", href: "/packages" },
  { icon: ShieldOff, label: "Blocked", href: "/blocked" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function LeftSidebar() {
  const pathname = usePathname();
  const { startCall } = useApp();

  const handleCallFriend = (friend: User) => {
    startCall({
      id: friend.id,
      name: friend.name,
      initials: friend.initials,
      avatarColor: friend.avatarColor,
      isIncoming: false,
    });
  };

  return (
    <aside className="flex flex-col gap-6 border-r border-border px-4 py-5 overflow-y-auto">
      {/* Real-time Wallet */}
      <WalletCard />

      {/* Navigation */}
      <div className="space-y-0.5">
        <p className="text-[11px] font-bold tracking-widest uppercase text-text-3 mb-2.5 px-3">
          Menu
        </p>
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border",
                isActive
                  ? "bg-bg-3 text-accent border-border"
                  : "text-text-2 hover:text-text hover:bg-bg-3 border-transparent"
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-base transition-colors",
                  isActive ? "bg-accent-glow" : "bg-bg-3"
                )}
              >
                <Icon size={16} />
              </span>
              {label}
            </Link>
          );
        })}
      </div>

      {/* Friends Online */}
      <div>
        <p className="text-[11px] font-bold tracking-widest uppercase text-text-3 mb-2.5 px-1">
          Friends Online
        </p>
        <div className="space-y-0.5">
          {FRIENDS.map((friend) => (
            <button
              key={friend.id}
              onClick={() => handleCallFriend(friend)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-bg-3 transition-colors text-left"
            >
              <Avatar
                initials={friend.initials}
                avatarColor={friend.avatarColor}
                size="sm"
                online={friend.online}
              />
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-text truncate">
                  {friend.name}
                </p>
                <p className="text-[11px] text-text-2 truncate">
                  {friend.status}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
