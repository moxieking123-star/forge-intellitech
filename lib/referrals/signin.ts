/** Never reflect an authentication provider's error description into the page. */
export function referralSignInFailure(href: string) {
  const url = new URL(href);
  const fragment = new URLSearchParams(url.hash.slice(1));
  const failed = url.searchParams.has("error") || fragment.has("error");
  if (!failed) return null;
  const code = fragment.get("error_code") ?? url.searchParams.get("error_code");
  for (const key of ["error", "error_code", "error_description"]) {
    url.searchParams.delete(key);
  }
  return {
    message: code === "otp_expired"
      ? "This sign-in link has expired or has already been used. Request a new sign-in link below."
      : "This sign-in link could not be used. Request a new sign-in link below.",
    cleanUrl: `${url.pathname}${url.search}#account`,
  };
}
