"use client";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { videoForPath } from "@/lib/public-channels";
import s from "./WatchForge.module.css";
export default function WatchForge() {
  const video = videoForPath(usePathname());
  const dialog = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  if (!video) return null;
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <section className={s.section} aria-label="Watch Forge">
      <p>See the work. Hear the thinking.</p>
      <button
        ref={trigger}
        type="button"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        Watch {video.title} ↗
      </button>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label={video.title}
        onCancel={close}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
      >
        <button type="button" onClick={close} autoFocus>
          Close video ×
        </button>
        <h2>{video.title}</h2>
        {open && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <p>
          YouTube loads when you choose to watch. Its own privacy terms apply.
        </p>
      </dialog>
    </section>
  );
}
