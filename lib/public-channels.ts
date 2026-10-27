// Supply approved real destinations here. Empty entries are displayed as Coming soon without a link.
export const socialChannels = [
  { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61576776552817" },
  { label: "TikTok", url: "https://www.tiktok.com/@forge.its" },
  { label: "Instagram", url: "https://www.instagram.com/forge_its/" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/104318888/" },
  { label: "X", url: "https://x.com/forgeit_service" },
  { label: "YouTube", url: "https://www.youtube.com/@TheForgeJournal-h7b" },
];
export const pageVideos: Record<string, { id: string; title: string }> = {
  // "/about": {id: "APPROVED_ID", title: "Meet Forge"},
  // "/programmes": {id: "APPROVED_ID", title: "Learning with Forge"},
  // "/programmes/techup": {id: "APPROVED_ID", title: "TechUp"},
  // "/programmes/elytech": {id: "APPROVED_ID", title: "ElyTech"},
};
export function videoForPath(path: string) {
  const key = Object.keys(pageVideos)
    .filter((k) => path === k || (k !== "/" && path.startsWith(k + "/")))
    .sort((a, b) => b.length - a.length)[0];
  const video = key ? pageVideos[key] : null;
  return video && /^[A-Za-z0-9_-]{11}$/.test(video.id) ? video : null;
}
