import type { User, Room, CallRecord, Notification } from "@/types";

export const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#7c3aed,#a78bfa)",
  "linear-gradient(135deg,#db2777,#f472b6)",
  "linear-gradient(135deg,#0891b2,#2dd4bf)",
  "linear-gradient(135deg,#d97706,#fbbf24)",
  "linear-gradient(135deg,#16a34a,#4ade80)",
  "linear-gradient(135deg,#dc2626,#f87171)",
  "linear-gradient(135deg,#7c3aed,#2dd4bf)",
  "linear-gradient(135deg,#b45309,#f472b6)",
];

export const CURRENT_USER: User = {
  id: "me",
  name: "Yousuf",
  handle: "@yousuf_awaaz",
  initials: "YO",
  avatarColor: AVATAR_GRADIENTS[0],
  online: true,
  stats: { friends: 48, rooms: 127, rating: 4.8 },
};

export const FRIENDS: User[] = [
  {
    id: "u1",
    name: "Priya Rao",
    handle: "@priya_r",
    initials: "PR",
    avatarColor: AVATAR_GRADIENTS[0],
    online: true,
    status: "In Bollywood Beats",
    tagline: "Music Lover",
  },
  {
    id: "u2",
    name: "Arjun S.",
    handle: "@arjunss",
    initials: "AS",
    avatarColor: AVATAR_GRADIENTS[1],
    online: true,
    status: "Online",
    tagline: "Comedian",
  },
  {
    id: "u3",
    name: "Sneha K.",
    handle: "@sneha_k",
    initials: "SK",
    avatarColor: AVATAR_GRADIENTS[2],
    online: false,
    status: "Last seen 2h ago",
    tagline: "Bookworm",
  },
  {
    id: "u4",
    name: "Raj M.",
    handle: "@raj_m",
    initials: "RM",
    avatarColor: AVATAR_GRADIENTS[3],
    online: true,
    status: "In Startup Hub",
    tagline: "Techie",
  },
  {
    id: "u5",
    name: "Divya P.",
    handle: "@divya_p",
    initials: "DP",
    avatarColor: AVATAR_GRADIENTS[4],
    online: false,
    status: "Offline",
    tagline: "Traveler",
  },
];

export const DISCOVER_USERS: User[] = [
  ...FRIENDS,
  {
    id: "u6",
    name: "Kabir A.",
    handle: "@kabir_a",
    initials: "KA",
    avatarColor: AVATAR_GRADIENTS[5],
    online: true,
    status: "Online",
    tagline: "Foodie",
  },
  {
    id: "u7",
    name: "Meera T.",
    handle: "@meera_t",
    initials: "MT",
    avatarColor: AVATAR_GRADIENTS[6],
    online: false,
    status: "Offline",
    tagline: "Dancer",
  },
  {
    id: "u8",
    name: "Vikas N.",
    handle: "@vikas_n",
    initials: "VN",
    avatarColor: AVATAR_GRADIENTS[7],
    online: true,
    status: "In Startup Hub",
    tagline: "Startup Guy",
  },
];

export const ROOMS: Room[] = [
  {
    id: "r1",
    name: "Midnight Conversations",
    description:
      "Deep talks, life stories, and midnight musings with strangers turned friends.",
    speakersCount: 4,
    listenersCount: 34,
    badge: "live",
    color: "purple",
    category: "Talk",
    speakers: [
      { id: "s1", initials: "PR", name: "Priya", avatarColor: AVATAR_GRADIENTS[0], isSpeaking: true, isHost: true, isMuted: false },
      { id: "s2", initials: "AS", name: "Arjun", avatarColor: AVATAR_GRADIENTS[1], isSpeaking: false, isHost: false, isMuted: false },
      { id: "s3", initials: "SK", name: "Sneha", avatarColor: AVATAR_GRADIENTS[2], isSpeaking: true, isHost: false, isMuted: false },
      { id: "s4", initials: "RM", name: "Raj", avatarColor: AVATAR_GRADIENTS[3], isSpeaking: false, isHost: false, isMuted: true },
    ],
  },
  {
    id: "r2",
    name: "Bollywood Beats & Talks",
    description:
      "Singing, discussing and celebrating the magic of Bollywood together.",
    speakersCount: 6,
    listenersCount: 89,
    badge: "hot",
    color: "teal",
    category: "Music",
    speakers: [
      { id: "s5", initials: "DP", name: "Divya", avatarColor: AVATAR_GRADIENTS[4], isSpeaking: true, isHost: true, isMuted: false },
      { id: "s6", initials: "KA", name: "Kabir", avatarColor: AVATAR_GRADIENTS[5], isSpeaking: false, isHost: false, isMuted: false },
      { id: "s7", initials: "MT", name: "Meera", avatarColor: AVATAR_GRADIENTS[6], isSpeaking: true, isHost: false, isMuted: false },
      { id: "s8", initials: "VN", name: "Vikas", avatarColor: AVATAR_GRADIENTS[7], isSpeaking: false, isHost: false, isMuted: false },
    ],
  },
  {
    id: "r3",
    name: "Chill & Study Room",
    description:
      "Stay focused with ambient sound and friendly accountability partners.",
    speakersCount: 2,
    listenersCount: 22,
    badge: "new",
    color: "amber",
    category: "Study",
    speakers: [
      { id: "s9", initials: "SK", name: "Sneha", avatarColor: AVATAR_GRADIENTS[2], isSpeaking: false, isHost: true, isMuted: false },
      { id: "s10", initials: "PR", name: "Priya", avatarColor: AVATAR_GRADIENTS[0], isSpeaking: true, isHost: false, isMuted: false },
    ],
  },
  {
    id: "r4",
    name: "Startup Founders Hub",
    description:
      "Ideas, pitches and networking for early-stage Indian founders.",
    speakersCount: 5,
    listenersCount: 57,
    badge: "live",
    color: "purple",
    category: "Talk",
    speakers: [
      { id: "s11", initials: "RM", name: "Raj", avatarColor: AVATAR_GRADIENTS[3], isSpeaking: true, isHost: true, isMuted: false },
      { id: "s12", initials: "VN", name: "Vikas", avatarColor: AVATAR_GRADIENTS[7], isSpeaking: false, isHost: false, isMuted: false },
      { id: "s13", initials: "AS", name: "Arjun", avatarColor: AVATAR_GRADIENTS[1], isSpeaking: false, isHost: false, isMuted: true },
    ],
  },
  {
    id: "r5",
    name: "Desi Comedy Night",
    description:
      "Open mic vibes — tell your jokes, roast your friends, laugh hard.",
    speakersCount: 8,
    listenersCount: 130,
    badge: "hot",
    color: "teal",
    category: "Talk",
    speakers: [
      { id: "s14", initials: "AS", name: "Arjun", avatarColor: AVATAR_GRADIENTS[1], isSpeaking: true, isHost: true, isMuted: false },
      { id: "s15", initials: "DP", name: "Divya", avatarColor: AVATAR_GRADIENTS[4], isSpeaking: false, isHost: false, isMuted: false },
      { id: "s16", initials: "KA", name: "Kabir", avatarColor: AVATAR_GRADIENTS[5], isSpeaking: true, isHost: false, isMuted: false },
    ],
  },
  {
    id: "r6",
    name: "Language Exchange",
    description:
      "Practice Hindi, Tamil, Telugu or English with native speakers.",
    speakersCount: 3,
    listenersCount: 18,
    badge: "new",
    color: "amber",
    category: "Study",
    speakers: [
      { id: "s17", initials: "MT", name: "Meera", avatarColor: AVATAR_GRADIENTS[6], isSpeaking: false, isHost: true, isMuted: false },
      { id: "s18", initials: "PR", name: "Priya", avatarColor: AVATAR_GRADIENTS[0], isSpeaking: true, isHost: false, isMuted: false },
    ],
  },
];

export const CALL_RECORDS: CallRecord[] = [
  {
    id: "c1",
    name: "Priya Rao",
    initials: "PR",
    avatarColor: AVATAR_GRADIENTS[0],
    type: "incoming",
    missed: false,
    time: "Today, 9:34 PM",
    duration: "12 min",
  },
  {
    id: "c2",
    name: "Raj M.",
    initials: "RM",
    avatarColor: AVATAR_GRADIENTS[3],
    type: "outgoing",
    missed: false,
    time: "Today, 6:10 PM",
    duration: "5 min",
  },
  {
    id: "c3",
    name: "Arjun S.",
    initials: "AS",
    avatarColor: AVATAR_GRADIENTS[1],
    type: "incoming",
    missed: true,
    time: "Yesterday",
    duration: "—",
  },
  {
    id: "c4",
    name: "Sneha K.",
    initials: "SK",
    avatarColor: AVATAR_GRADIENTS[2],
    type: "outgoing",
    missed: false,
    time: "Yesterday",
    duration: "28 min",
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    icon: "📞",
    bgColor: "rgba(167,139,250,0.15)",
    text: "<strong>Priya Rao</strong> wants to call you privately.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    icon: "🎙️",
    bgColor: "rgba(45,212,191,0.15)",
    text: "<strong>Arjun S.</strong> invited you to <strong>Comedy Night</strong>.",
    time: "15 min ago",
    read: false,
  },
  {
    id: "n3",
    icon: "❤️",
    bgColor: "rgba(244,114,182,0.15)",
    text: "<strong>Sneha K.</strong> added you as a friend.",
    time: "1h ago",
    read: true,
  },
  {
    id: "n4",
    icon: "🔥",
    bgColor: "rgba(251,191,36,0.15)",
    text: "<strong>Bollywood Beats</strong> is trending now!",
    time: "2h ago",
    read: true,
  },
];

export const ROOM_CATEGORIES = ["All", "Music", "Talk", "Chill", "Study"];
