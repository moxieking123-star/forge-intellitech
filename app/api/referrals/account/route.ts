import {
  ensureReferrer,
  publicLink,
  referralService,
  response,
  verifiedUser,
} from "@/lib/server/referrals";
export async function GET(request: Request) {
  const service = referralService();
  if (!service)
    return response(
      { error: "Referral accounts are not available in this preview yet." },
      503,
    );
  const user = await verifiedUser(request, service);
  if (!user)
    return response({ error: "Please sign in with a confirmed email." }, 401);
  try {
    const account = await ensureReferrer(service, user.id);
    if (account.status !== "active")
      return response(
        {
          error:
            "This referral account is closed. Contact Forge for assistance.",
        },
        403,
      );
    const { data, error } = await service
      .from("school_referrals")
      .select(
        "id,code,school_name,location,stage,earned_kobo,paid_kobo,starts_on,payable_on",
      )
      .eq("referrer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw error;
    return response({
      account: {
        referralNumber: account.referral_number,
        status: account.status,
      },
      links: data.map(publicLink),
    });
  } catch {
    return response(
      { error: "Unable to load your referral record. Please try again." },
      503,
    );
  }
}
