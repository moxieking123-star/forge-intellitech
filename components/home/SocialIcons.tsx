import { FacebookLogo, InstagramLogo, TiktokLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { socialChannels } from "@/lib/public-channels";
import styles from "./SocialIcons.module.css";
const icons = { Facebook: FacebookLogo, Instagram: InstagramLogo, TikTok: TiktokLogo, LinkedIn: LinkedinLogo, X: XLogo };
export default function SocialIcons() {
  return <div className={styles.social}><p>Find us on social</p><ul aria-label="Forge social media">{socialChannels.map(channel => {
    const Icon = icons[channel.label as keyof typeof icons];
    const content = <><Icon size={24} weight="fill" aria-hidden="true" /><span>{channel.label}</span></>;
    return <li key={channel.label}>{/^https:\/\//.test(channel.url) ? <a href={channel.url} target="_blank" rel="noopener noreferrer" aria-label={`Forge on ${channel.label} (opens in a new tab)`}>{content}</a> : <span className={styles.pending} aria-label={`${channel.label}: coming soon`}>{content}<small>Coming soon</small></span>}</li>;
  })}</ul></div>;
}
