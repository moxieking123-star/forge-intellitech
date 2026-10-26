import "server-only";
import { ensureReferrer, referralService, response, verifiedUser } from "@/lib/server/referrals";
export async function referralAccess(request: Request) {
  const service = referralService();
  if (!service) return { error: response({ error: "Secure referral services are unavailable in this preview." }, 503) };
  const user = await verifiedUser(request, service);
  if (!user) return { error: response({ error: "Verified sign-in required." }, 401) };
  const account = await ensureReferrer(service, user.id);
  if (account.status !== "active") return { error: response({ error: "Active referral account required." }, 403) };
  return { service, user };
}
