import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log the submission (replace with database save later)
    console.log('📝 New LaunchPad Application:', {
      name: data.fullName,
      email: data.email,
      school: data.schoolName,
      idea: data.businessTitle,
      time: new Date().toISOString(),
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Application received',
      id: `LP-${Date.now()}`
    });
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process application' }, 
      { status: 500 }
    );
  }
}