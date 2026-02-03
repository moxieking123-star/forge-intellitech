import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log the submission (replace with database save later)
    console.log('🤝 New Sponsor Inquiry:', {
      organization: data.organizationName,
      contact: data.contactName,
      email: data.contactEmail,
      tier: data.tier,
      time: new Date().toISOString(),
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry received',
      id: `SP-${Date.now()}`
    });
  } catch (error) {
    console.error('Sponsor inquiry error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' }, 
      { status: 500 }
    );
  }
}