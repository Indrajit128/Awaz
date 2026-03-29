"use client";

import { useState, useEffect } from "react";

/**
 * Simulates a speaking animation by cycling an active speaker index.
 * In production you'd hook this into a real WebRTC audio level analyser.
 */
export function useSpeakingAnimation(count: number, intervalMs = 2000) {
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    const timer = setInterval(() => {
      setActiveSpeakerIdx(Math.floor(Math.random() * count));
    }, intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs]);

  return activeSpeakerIdx;
}
