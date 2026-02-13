import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Sanitize input to prevent security issues
function sanitize(str: string): string {
  if (!str) return ''
  return str
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 2000)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Honeypot check - catches bots
    if (body.website || body.honeypot) {
      return NextResponse.json({ success: true })
    }
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Clean the data
    const cleanData = {
      name: sanitize(body.name),
      email: sanitize(body.email),
      phone: sanitize(body.phone || ''),
      subject: sanitize(body.subject || 'General Inquiry'),
      message: sanitize(body.message || ''),
      form_type: sanitize(body.formType || 'contact'),
      status: 'new',
      created_at: new Date().toISOString(),
    }
    
    // Save to database
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([cleanData])
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }
    
    // Send notification email to YOU
    // ⚠️ CHANGE THE EMAIL BELOW TO YOUR EMAIL
    try {
      await resend.emails.send({
        from: 'Website <notifications@forgeintellitech.com>',  // CHANGE yourdomain.com
        to: ['info@forgeintellitech.com'],  // CHANGE to your email
        subject: `New Form: ${cleanData.name}`,
        html: `
          <h2>New Form Submission</h2>
          <p><strong>Name:</strong> ${cleanData.name}</p>
          <p><strong>Email:</strong> ${cleanData.email}</p>
          <p><strong>Phone:</strong> ${cleanData.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${cleanData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${cleanData.message || 'No message'}</p>
          <hr>
          <p>Submitted: ${new Date().toLocaleString()}</p>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }
    
    // Send confirmation to the user
    try {
      await resend.emails.send({
        from: 'Your Company <contact@yourdomain.com>',  // CHANGE yourdomain.com
        to: [cleanData.email],
        subject: 'Thank you for contacting us!',
        html: `
          <h2>Thank You!</h2>
          <p>Dear ${cleanData.name},</p>
          <p>We received your message and will get back to you within 24-48 hours.</p>
          <p>Best regards,<br>Your Company Team</p>
        `,
      })
    } catch (emailError) {
      console.error('Confirmation email error:', emailError)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully' 
    })
    
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}