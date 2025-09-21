"use client";

import { useState, useEffect } from "react";

/**
 * LiveUpdate component displays real-time data updates.
 * This component demonstrates live updates for better user experience.
 * Optimized for Copilot integration with clear JSDoc and type hints.
 */
export default function LiveUpdate() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Update time every second for live updates
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Initial set
    setCurrentTime(new Date().toLocaleTimeString());

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <h2 className="text-lg font-medium">Live Updates</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
        Current time: <span className="font-mono">{currentTime}</span>
      </p>
      <p className="text-xs text-slate-500 mt-2">
        This updates in real-time to demonstrate live functionality.
      </p>
    </div>
  );
}