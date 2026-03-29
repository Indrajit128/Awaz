"use client";

import { Avatar } from "@/components/ui/Avatar";
import { CURRENT_USER, NOTIFICATIONS } from "@/lib/data";

export function RightSidebar() {
  return (
    <aside className="flex flex-col gap-6 border-l border-border px-4 py-5 overflow-y-auto">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-[#1a1030] to-[#1a1228] border border-border-2 rounded-xl p-5 text-center">
        <Avatar
          initials={CURRENT_USER.initials}
          avatarColor={CURRENT_USER.avatarColor}
          size="lg"
          online
          className="mx-auto mb-3"
        />
        <p className="font-display font-bold text-[15px] mb-0.5">
          {CURRENT_USER.name}
        </p>
        <p className="text-xs text-text-2 mb-4">{CURRENT_USER.handle}</p>
        <div className="flex justify-around">
          {[
            { num: CURRENT_USER.stats!.friends, label: "Friends" },
            { num: CURRENT_USER.stats!.rooms, label: "Rooms" },
            { num: `${CURRENT_USER.stats!.rating}⭐`, label: "Rating" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-display font-bold text-base">{num}</p>
              <p className="text-[11px] text-text-2">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div>
        <p className="text-[11px] font-bold tracking-widest uppercase text-text-3 mb-3 px-1">
          Notifications
        </p>
        <div className="space-y-2">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border bg-card hover:border-border-2 hover:bg-card-2 cursor-pointer transition-all"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: n.bgColor }}
              >
                {n.icon}
              </div>
              <div>
                <p
                  className="text-[12px] text-text-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: n.text }}
                />
                <p className="text-[10px] text-text-3 mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
