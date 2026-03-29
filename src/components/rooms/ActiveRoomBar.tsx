"use client";

import { Mic, MicOff, Hand, Share2, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context";
import { useSpeakingAnimation } from "@/hooks/useSpeakingAnimation";
import { cn } from "@/lib/utils";
import { CURRENT_USER } from "@/lib/data";

export function ActiveRoomBar() {
  const { activeRoom, isMuted, toggleMute, leaveRoom, showToast } = useApp();
  const activeSpeakerIdx = useSpeakingAnimation(
    activeRoom ? activeRoom.speakers.length + 1 : 0
  );

  if (!activeRoom) return null;

  const allSpeakers = [
    {
      id: "me",
      initials: CURRENT_USER.initials,
      name: "You",
      avatarColor: CURRENT_USER.avatarColor,
      isSpeaking: activeSpeakerIdx === 0 && !isMuted,
      isHost: false,
      isMuted,
    },
    ...activeRoom.speakers.map((s, i) => ({
      ...s,
      isSpeaking: activeSpeakerIdx === i + 1,
    })),
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] border-t border-border-2 bg-bg/98 backdrop-blur-xl animate-slideUp">
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-extrabold text-lg tracking-tight">
              {activeRoom.name}
            </h3>
            <p className="text-xs text-text-2">
              {activeRoom.speakersCount + 1} speakers &nbsp;•&nbsp;{" "}
              {activeRoom.listenersCount} listening
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="icon"
              size="sm"
              onClick={toggleMute}
              className={cn(
                "w-11 h-11",
                isMuted && "bg-brand-red/10 border-brand-red/40 text-brand-red"
              )}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
            <Button
              variant="icon"
              size="sm"
              className="w-11 h-11"
              onClick={() => showToast("Hand raised! ✋")}
            >
              <Hand size={18} />
            </Button>
            <Button
              variant="icon"
              size="sm"
              className="w-11 h-11"
              onClick={() => showToast("Link copied! 📤")}
            >
              <Share2 size={18} />
            </Button>
            <Button variant="danger" size="sm" onClick={leaveRoom}>
              <LogOut size={15} />
              Leave
            </Button>
          </div>
        </div>

        {/* Speakers */}
        <div className="flex flex-wrap gap-4">
          {allSpeakers.map((speaker) => (
            <div key={speaker.id} className="flex flex-col items-center gap-1.5">
              <Avatar
                initials={speaker.initials}
                avatarColor={speaker.avatarColor}
                size="md"
                isSpeaking={speaker.isSpeaking && !speaker.isMuted}
              />
              <span className="text-[11px] text-text-2 font-medium">
                {speaker.name}
              </span>
              {speaker.isHost && (
                <span className="text-[10px] text-accent -mt-1">Host</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
