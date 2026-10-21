import { notificationMailboxes } from "@/lib/notification-routing";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      schoolName,
      schoolType,
      schoolAddress,
      classLevel,
      ideaTitle,
      ideaCategory,
      ideaDescription,
      problemSolving,
      targetAudience,
      teamMembers,
      howHeard,
      whyParticipate,
      previousExperience,
      guardianName,
      guardianPhone,
      guardianEmail,
      guardianRelationship,
    } = body;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !schoolName ||
      !ideaTitle ||
      !guardianName ||
      !guardianPhone
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 },
      );
    }

    if (!supabase) {
      console.error("Supabase client not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 },
      );
    }

    // Check for duplicate application
    const { data: existing } = await supabase
      .from("student_applications")
      .select("id")
      .eq("email", email)
      .eq("year", 2026)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error: "You have already submitted an application for LaunchPad 2026",
        },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("student_applications")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          date_of_birth: dateOfBirth || null,
          gender: gender || null,
          school_name: schoolName,
          school_type: schoolType || null,
          school_address: schoolAddress || null,
          class_level: classLevel || "SSS3",
          idea_title: ideaTitle,
          idea_category: ideaCategory || null,
          idea_description: ideaDescription || null,
          problem_solving: problemSolving || null,
          target_audience: targetAudience || null,
          team_members: teamMembers || null,
          how_heard: howHeard || null,
          why_participate: whyParticipate || null,
          previous_experience: previousExperience || null,
          guardian_name: guardianName,
          guardian_phone: guardianPhone,
          guardian_email: guardianEmail || null,
          guardian_relationship: guardianRelationship || null,
          status: "pending",
          year: 2026,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to submit application", details: error.message },
        { status: 500 },
      );
    }

    console.log("✅ Student application saved:", data);

    // Send notification email to admin
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: notificationMailboxes.movement,
          subject: `🚀 New LaunchPad Application: ${firstName} ${lastName}`,
          html: `
            <h2>New LaunchPad 2026 Application</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>School:</strong> ${schoolName} (${schoolType})</p>
            <p><strong>Business Idea:</strong> ${ideaTitle}</p>
            <p><strong>Category:</strong> ${ideaCategory || "Not specified"}</p>
            <p><strong>Description:</strong> ${ideaDescription || "Not provided"}</p>
            <hr/>
            <p><strong>Guardian:</strong> ${guardianName} (${guardianPhone})</p>
            <p><strong>Applied at:</strong> ${new Date().toLocaleString()}</p>
          `,
        });
        console.log("✅ Admin notification sent");
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
        id: data.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Application API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
