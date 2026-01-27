import { NextRequest, NextResponse } from "next/server";
import { supabase, BlogPost } from "../../../lib/supabase";

// GET - Fetch all published blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");
    const slug = searchParams.get("slug");

    // If slug is provided, fetch single post
    if (slug) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { error: "Post not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: data,
      });
    }

    // Build query for multiple posts
    let query = supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, author, category, tags, cover_image, featured, read_time, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    // Add filters
    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (featured === "true") {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch blog posts" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: data.length,
      data: data,
    });

  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST - Create new blog post (for admin use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author, category, tags, cover_image, published, featured } = body;

    // Validate required fields
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: "Title, slug, excerpt, and content are required" },
        { status: 400 }
      );
    }

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;

    // Create blog post object
    const newPost: BlogPost = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt.trim(),
      content: content,
      author: author || "Forge Team",
      category: category || "General",
      tags: tags || [],
      cover_image: cover_image || null,
      published: published || false,
      featured: featured || false,
      read_time: readTime,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([newPost])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      
      // Handle duplicate slug
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to create blog post" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully",
        data: data,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}