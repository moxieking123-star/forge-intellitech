import { schoolKey } from "@/lib/referrals/policy";
import {boundedBody} from "@/lib/referrals/agreement";
import {referralBackendEnabled,referralBackendFetch} from "@/lib/server/referral-backend";
import {
  ensureReferrer,
  publicLink,
  referralService,
  response,
  verifiedUser,
  validOrigin,
} from "@/lib/server/referrals";
export async function POST(request: Request) {
  if (!validOrigin(request))
    return response({ error: "Invalid request origin." }, 403);
  let body;
  try{body=JSON.parse(new TextDecoder().decode(await boundedBody(request,4096)));}catch{return response({error:"Please check the school details."},400);}
  if (
    !body ||
    typeof body.schoolName !== "string" ||
    !body.schoolName.trim() ||
    body.schoolName.length > 200 ||
    typeof body.location !== "string" ||
    !body.location.trim() ||
    body.location.length > 200
  )
    return response({ error: "Enter the school name and city/state." }, 400);
  if(referralBackendEnabled())return referralBackendFetch(request,"link_create",body);
  const service = referralService();
  if (!service)
    return response(
      { error: "Referrals are not available in this preview yet." },
      503,
    );
  const user = await verifiedUser(request, service);
  if (!user)
    return response({ error: "Please sign in with a confirmed email." }, 401);
  try {
    const account = await ensureReferrer(service, user.id);
    if (account.status !== "active")
      return response({ error: "This referral account is closed." }, 403);
    const payout = await service.from("referrer_payout_profiles").select("referrer_id").eq("referrer_id", user.id).maybeSingle();
    if (payout.error) throw payout.error;
    if (!payout.data)
      return response({ error: "Register your payment details before creating a school referral." }, 409);
    const { data, error } = await service.rpc("create_school_referral", {
      p_referrer_id: user.id,
      p_school_name: body.schoolName.trim(),
      p_location: body.location.trim(),
      p_school_key: schoolKey(body.schoolName, body.location),
    });
    if (error?.code === "23505")
      return response(
        { error: "A link for this school is already in your account." },
        409,
      );
    if (error?.message === "Link rate limit")
      return response(
        { error: "Please wait before creating more school links." },
        429,
      );
    if (error) throw error;
    return response({ link: publicLink(data) }, 201);
  } catch {
    return response(
      { error: "Unable to create the school link. Please try again." },
      503,
    );
  }
}
