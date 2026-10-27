import {backendEnvironmentEnabled} from "@/lib/backend-runtime";
import {participationBackendEnabled,submitParticipation} from '@/lib/server/participation';
import { notificationMailboxes } from "@/lib/notification-routing";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { resend, FROM_EMAIL } from "@/lib/resend";

export async function POST(request: NextRequest) {
  if(participationBackendEnabled())return submitParticipation(request,"sponsor");
  if(backendEnvironmentEnabled())return NextResponse.json({error:"Enquiry services are not enabled. Your details have not been submitted."},{status:503,headers:{"Cache-Control":"no-store"}});
  try {
    const body = await request.json();



    const { companyName, contactName, email, phone, sponsorshipType, message } =
      body;

    if (!companyName || !contactName || !email) {
      return NextResponse.json(
        { error: "Company name, contact name, and email are required" },
        { status: 400 },
      );
    }

    if (!supabase) {
      console.error("❌ Supabase not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 },
      );
    }

    const { data, error } = await supabase
      .from("sponsor_inquiries")
      .insert([
        {
          company_name: companyName,
          contact_name: contactName,
          email,
          phone: phone || null,
          sponsorship_type: sponsorshipType || null,
          message: message || null,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save inquiry", details: error.message },
        { status: 500 },
      );
    }

    console.log("✅ Sponsor inquiry saved:", data.id);

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: notificationMailboxes.movement,
          subject: `💼 New Sponsor Inquiry: ${companyName}`,
          html: `
            <h2>New Sponsor Inquiry</h2>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Contact:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Tier:</strong> ${sponsorshipType || "Not specified"}</p>
            <p><strong>Goals:</strong> ${message || "Not provided"}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `,
        });
        console.log("✅ Email notification sent");
      } catch (emailError) {
        console.error("❌ Email error:", emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Sponsor API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
