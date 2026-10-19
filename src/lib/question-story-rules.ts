/** Story rules for answered anonymous questions (browser-safe, shared client/server). */
export type StoryDuration = "24h" | "permanent";

export const STORY_HOURS = 24;

/** When a freshly published answer stops showing as a story; null = until the owner hides it. */
export function storyUntil(duration: StoryDuration, now = Date.now()): string | null {
  return duration === "24h" ? new Date(now + STORY_HOURS * 3600_000).toISOString() : null;
}

/** A published answer is visible while it has no end, or its end is still in the future. */
export function isStoryActive(until: string | null | undefined, now = Date.now()): boolean {
  if (until == null) return true;
  const t = Date.parse(until);
  return Number.isFinite(t) && t > now;
}

/** Share targets shown when answering. Only ROUT works today; the rest are "Binnenkort". */
export const SHARE_TARGETS = [
  { id: "rout", label: "ROUT-profiel", available: true },
  { id: "instagram", label: "Instagram-status", available: false },
  { id: "snapchat", label: "Snapchat", available: false },
  { id: "whatsapp", label: "WhatsApp-status", available: false },
] as const;
