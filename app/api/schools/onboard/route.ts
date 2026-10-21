import { resend, FROM_EMAIL } from "@/lib/resend";
import { notificationMailboxes } from "@/lib/notification-routing";
import { schoolKey, validateSchool } from "@/lib/referrals/policy";
import {
  ensureReferrer,
  referralService,
  response,
  verifiedUser,
  validOrigin,
} from "@/lib/server/referrals";
export async function POST(request: Request) {
  if (!validOrigin(request))
    return response({ error: "Invalid request origin." }, 403);
  const input = validateSchool(await request.json().catch(() => null));
  if (!input)
    return response(
      { error: "Please check the required school details and permissions." },
      400,
    );
  const service = referralService();
  if (!service)
    return response(
      {
        error:
          "School onboarding is not connected in this preview yet. Your answers have not been sent.",
      },
      503,
    );
  try {
    let referrerId: string | null = null;
    if (input.assisted) {
      const user = await verifiedUser(request, service);
      if (!user)
        return response(
          { error: "Sign in to submit an authorised school referral." },
          401,
        );
      const account = await ensureReferrer(service, user.id);
      if (account.status !== "active")
        return response({ error: "This referral account is closed." }, 403);
      referrerId = user.id;
    }
    const payload = {
      ...input,
      schoolKey: schoolKey(
        input.schoolName as string,
        input.location as string,
      ),
    };
    const { data, error } = await service.rpc("submit_school_onboarding", {
      p_payload: payload,
      p_referrer_id: referrerId,
    });
    if (error) {
      if (error.code === "23505")
        return response(
          {
            error:
              "An onboarding request already exists for this school or referral. Contact Forge to update it.",
          },
          409,
        );
      if (error.code === "P0001")
        return response(
          {
            error:
              "The school referral cannot be used. Please contact Forge to check the link.",
          },
          409,
        );
      throw error;
    }
    let notification = "not_configured";
    if (resend) {
      try {
        const result = await resend.emails.send({
          from: FROM_EMAIL,
          to: notificationMailboxes.programmes,
          replyTo: input.email as string,
          subject: "School onboarding request received",
          text: [
            "School onboarding request saved for private review.",
            `Request: ${data}`,
            `School: ${input.schoolName}`,
            `Location: ${input.location}`,
            `Contact: ${input.name}`,
            `Email: ${input.email}`,
            `Phone: ${input.phone}`,
            `Assisted submission: ${input.assisted ? "Yes" : "No"}`,
          ].join("\n"),
        });
        notification = result.error ? "pending" : "sent";
      } catch {
        notification = "pending";
      }
    }
    return response(
      {
        success: true,
        id: data,
        notification,
        message: "School onboarding request received for review.",
      },
      201,
    );
  } catch {
    return response(
      {
        error:
          "Unable to save the school request. Your answers have not been confirmed.",
      },
      503,
    );
  }
}
