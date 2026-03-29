"use client";

import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/utils";
import type { CallRecord } from "@/types";

export function CallItem({ record }: { record: CallRecord }) {
  const { startCall } = useApp();

  const Icon = record.missed
    ? PhoneMissed
    : record.type === "incoming"
    ? PhoneIncoming
    : PhoneOutgoing;

  const iconColor = record.missed
    ? "text-brand-red"
    : record.type === "incoming"
    ? "text-brand-green"
    : "text-accent";

  const typeLabel = record.missed
    ? "Missed"
    : record.type === "incoming"
    ? "Incoming"
    : "Outgoing";

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card hover:border-border-2 hover:bg-card-2 transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <Avatar
          initials={record.initials}
          avatarColor={record.avatarColor}
          size="md"
        />
        <div>
          <p className="text-sm font-semibold">{record.name}</p>
          <p className={cn("text-xs flex items-center gap-1", iconColor)}>
            <Icon size={12} />
            {typeLabel} &nbsp;•&nbsp; {record.duration}
          </p>
          <p className="text-[11px] text-text-3">{record.time}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          startCall({
            id: record.id,
            name: record.name,
            initials: record.initials,
            avatarColor: record.avatarColor,
            isIncoming: false,
          })
        }
      >
        <Phone size={14} />
        Call
      </Button>
    </div>
  );
}
