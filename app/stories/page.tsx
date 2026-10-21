import { permanentRedirect } from "next/navigation";
export default function StoriesAlias() {
  permanentRedirect("/blog");
}
