// ─── User & Friends ───────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  tagline?: string;
  online: boolean;
  status?: string;
  stats?: { friends: number; rooms: number; rating: number };
}

// ─── Rooms ────────────────────────────────────────────────────
export type RoomBadge = "live" | "hot" | "new";
export type RoomColor = "purple" | "teal" | "amber";

export interface Room {
  id: string;
  name: string;
  description: string;
  speakersCount: number;
  listenersCount: number;
  badge: RoomBadge;
  color: RoomColor;
  category: string;
  speakers: Speaker[];
}

export interface Speaker {
  id: string;
  initials: string;
  name: string;
  avatarColor: string;
  isSpeaking: boolean;
  isHost: boolean;
  isMuted: boolean;
}

// ─── Calls ────────────────────────────────────────────────────
export type CallType = "incoming" | "outgoing";

export interface CallRecord {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  type: CallType;
  missed: boolean;
  time: string;
  duration: string;
}

// ─── Notifications ────────────────────────────────────────────
export interface Notification {
  id: string;
  icon: string;
  bgColor: string;
  text: string;
  time: string;
  read: boolean;
}

// ─── Active Call State ────────────────────────────────────────
export interface ActiveCall {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  isIncoming: boolean;
}
