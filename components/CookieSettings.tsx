"use client";
export default function CookieSettings() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event("forge-cookie-settings"));
      }}
      style={{ textDecoration: "underline", textUnderlineOffset: 4 }}
    >
      Cookie settings
    </button>
  );
}
