// Supply approved real destinations here. Empty entries are intentionally not rendered.
export const socialChannels = [
  { label: "Facebook", url: "" },
  { label: "TikTok", url: "" },
  { label: "Instagram", url: "" },
  { label: "LinkedIn", url: "" },
  { label: "X", url: "" },
];
export const pageVideos: Record<string, { id: string; title: string }> = {
  // "/about": {id: "APPROVED_ID", title: "Meet Forge"},
  // "/programmes": {id: "APPROVED_ID", title: "Learning with Forge"},
};
export function videoForPath(path: string) {
  const key = Object.keys(pageVideos)
    .filter((k) => path === k || (k !== "/" && path.startsWith(k + "/")))
    .sort((a, b) => b.length - a.length)[0];
  const video = key ? pageVideos[key] : null;
  return video && /^[A-Za-z0-9_-]{11}$/.test(video.id) ? video : null;
}
