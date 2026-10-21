import { notificationMailboxes } from "@/lib/notification-routing";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";

const ADMIN_EMAIL = notificationMailboxes.general;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    console.log("📧 Newsletter subscription:", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
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

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          { success: true, message: "You are already subscribed!" },
          { status: 200 },
        );
      } else {
        // Reactivate subscription
        await supabase
          .from("newsletter_subscribers")
          .update({ status: "active" })
          .eq("id", existing.id);

        return NextResponse.json(
          {
            success: true,
            message: "Welcome back! Your subscription has been reactivated.",
          },
          { status: 200 },
        );
      }
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          name: name || null,
          status: "active",
          source: "website",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Newsletter error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe", details: error.message },
        { status: 500 },
      );
    }

    console.log("✅ Newsletter subscription saved:", data.id);

    // Send emails using Resend
    if (resend) {
      // 1. Send welcome email to subscriber
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "🎉 Welcome to Forge Intellitech!",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #FF8C42;">Welcome to Forge Intellitech! 🎉</h1>
              <p>Thanks for subscribing to our newsletter.</p>
              <p>You'll receive updates about:</p>
              <ul>
                <li>✨ New programs and opportunities</li>
                <li>💡 Tech insights and resources</li>
                <li>🚀 LaunchPad and TechUp news</li>
                <li>🎯 Exclusive content and early access</li>
              </ul>
              <p>Stay tuned for exciting updates!</p>
              <p>— The Forge Intellitech Team</p>
            </div>
          `,
        });
        console.log("✅ Welcome email sent to subscriber");
      } catch (emailError) {
        console.error("❌ Welcome email failed:", emailError);
      }

      // 2. Send notification to ADMIN 👈 THIS WAS MISSING!
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: "📬 New Newsletter Subscriber!",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #FF8C42;">New Newsletter Subscription</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${name || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <p style="margin-top: 20px; color: #666;">
                View all subscribers in your <a href="https://supabase.com/dashboard">Supabase Dashboard</a>
              </p>
            </div>
          `,
        });
        console.log("✅ Admin notification sent to:", ADMIN_EMAIL);
      } catch (adminEmailError) {
        console.error("❌ Admin notification failed:", adminEmailError);
      }
    } else {
      console.log("⚠️ Resend not configured, skipping emails");
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed! Check your email." },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Newsletter API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
