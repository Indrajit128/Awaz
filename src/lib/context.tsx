"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Room, ActiveCall } from "@/types";

interface AppState {
  activeRoom: Room | null;
  activeCall: ActiveCall | null;
  isMuted: boolean;
  toastMessage: string;
  showCreateModal: boolean;
  // Setters
  joinRoom: (room: Room) => void;
  leaveRoom: () => void;
  toggleMute: () => void;
  startCall: (call: ActiveCall) => void;
  endCall: () => void;
  showToast: (msg: string) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  }, []);

  const joinRoom = useCallback(
    (room: Room) => {
      setActiveRoom(room);
      showToast(`Joined "${room.name}" 🎙️`);
    },
    [showToast]
  );

  const leaveRoom = useCallback(() => {
    setActiveRoom(null);
    setIsMuted(false);
    showToast("Left the room");
  }, [showToast]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      showToast(!prev ? "Muted 🔇" : "Unmuted 🎙️");
      return !prev;
    });
  }, [showToast]);

  const startCall = useCallback((call: ActiveCall) => {
    setActiveCall(call);
  }, []);

  const endCall = useCallback(() => {
    setActiveCall(null);
    showToast("Call ended");
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        activeRoom,
        activeCall,
        isMuted,
        toastMessage,
        showCreateModal,
        joinRoom,
        leaveRoom,
        toggleMute,
        startCall,
        endCall,
        showToast,
        openCreateModal: () => setShowCreateModal(true),
        closeCreateModal: () => setShowCreateModal(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
