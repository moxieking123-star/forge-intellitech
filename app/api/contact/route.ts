import {
  isSubmissionSource,
  notificationRecipient,
} from "@/lib/notification-routing";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { contactNotificationEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body))
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    const {
      name,
      email,
      subject,
      message,
      inquiryType,
      phone,
      submissionSource,
    } = body;
    if (submissionSource !== undefined && !isSubmissionSource(submissionSource))
      return NextResponse.json(
        { error: "Invalid submission source" },
        { status: 400 },
      );
    const recipient = notificationRecipient({
      inquiryType,
      subject,
      submissionSource,
    });

    // Validation
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.length > 120 ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 20000 ||
      (subject != null &&
        (typeof subject !== "string" || subject.length > 250)) ||
      (phone != null && (typeof phone !== "string" || phone.length > 80)) ||
      (inquiryType != null &&
        ![
          "general",
          "partnership",
          "schools",
          "careers",
          "press",
          "support",
        ].includes(inquiryType))
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    if (!supabase) {
      console.error("❌ Supabase not initialized");
      return NextResponse.json(
        {
          error: `Submissions are temporarily unavailable. Please email ${recipient}.`,
        },
        { status: 500 },
      );
    }

    // Build insert object with only existing columns
    const insertData: Record<string, unknown> = {
      name,
      email,
      message,
    };

    // Add optional fields if they have values
    if (subject) insertData.subject = subject;
    if (inquiryType) insertData.inquiry_type = inquiryType;
    if (phone) insertData.phone = phone;

    // Insert into Supabase
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        { error: "Unable to save your enquiry. Please try again." },
        { status: 500 },
      );
    }

    console.log("✅ Contact saved:", data.id);

    // Send email notification
    if (resend) {
      console.log("Notification recipient selected");
      console.log("📨 From:", FROM_EMAIL);

      try {
        const emailContent = contactNotificationEmail({
          name,
          email,
          phone,
          subject,
          message,
          inquiryType,
        });

        const emailResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: recipient,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (emailResult.error) {
          console.error("❌ Resend error:", emailResult.error);
        }
      } catch (emailError) {
        console.error("❌ Email failed:", emailError);
      }
    } else {
      console.warn("⚠️ Resend not initialized");
    }

    return NextResponse.json(
      { success: true, message: "Enquiry received.", id: data.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
