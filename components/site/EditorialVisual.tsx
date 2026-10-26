import Image from "next/image";
import s from "./EditorialVisual.module.css";
export default function EditorialVisual({
  src,
  alt,
  caption,
  compact = false,
}: {
  src: string;
  alt: string;
  caption: string;
  compact?: boolean;
}) {
  return (
    <figure className={`${s.figure} ${compact ? s.compact : ""}`}>
      <div>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:700px) 100vw,1280px"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
