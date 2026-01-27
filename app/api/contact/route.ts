import { NextRequest, NextResponse } from "next/server";
import { supabase, ContactMessage } from "../../../lib/supabase";

// POST - Create new contact message
export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const body = await request.json();
    const { name, email, organization, category, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Create contact message object
    const newMessage: ContactMessage = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: organization?.trim() || null,
      category: category || "general",
      message: message.trim(),
      status: "new",
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([newMessage])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save message. Please try again." },
        { status: 500 }
      );
    }

    console.log("=== New Contact Message Saved ===");
    console.log("ID:", data.id);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Category:", category);
    console.log("================================");

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll be in touch soon!",
        id: data.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again later." },
      { status: 500 }
    );
  }
}

// GET - Retrieve contact messages (for admin use later)
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Build query
    let query = supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    // Add filters if provided
    if (status) {
      query = query.eq("status", status);
    }
    if (category) {
      query = query.eq("category", category);
    }

    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: data.length,
      data: data,
    });

  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}