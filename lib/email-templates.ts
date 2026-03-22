// =============================================
// CONTACT NOTIFICATION EMAIL
// =============================================
export const contactNotificationEmail = (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;      // Added
  message: string;
  inquiryType?: string;  // Added
}) => ({
  subject: `🔔 New Contact: ${data.subject || data.inquiryType || 'General Inquiry'} from ${data.name}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">📬 New Contact Form Submission</h1>
          <p style="margin:10px 0 0;">You've received a new inquiry from your website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">📱 Phone</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          ${data.subject ? `
          <div class="field">
            <div class="label">📋 Subject</div>
            <div class="value">${data.subject}</div>
          </div>
          ` : ''}
          ${data.inquiryType ? `
          <div class="field">
            <div class="label">🏷️ Inquiry Type</div>
            <div class="value">${data.inquiryType}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">💬 Message</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from your website contact form</p>
          <p>Received at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `
});

// =============================================
// NEWSLETTER WELCOME EMAIL
// =============================================
export const newsletterWelcomeEmail = (email: string) => ({
  subject: '🎉 Welcome to Our Newsletter!',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">🎉 Welcome!</h1>
          <p style="margin:10px 0 0;">Thanks for subscribing to our newsletter</p>
        </div>
        <div class="content">
          <p>Hi there!</p>
          <p>You're now part of our community. We'll send you:</p>
          <ul style="text-align: left; display: inline-block;">
            <li>✨ Exclusive updates and news</li>
            <li>💡 Tips and insights</li>
            <li>🎁 Special offers and early access</li>
          </ul>
          <p>Stay tuned for exciting content!</p>
        </div>
        <div class="footer">
          <p>You're receiving this because you subscribed with ${email}</p>
          <p>© ${new Date().getFullYear()} Forge Intellitech</p>
        </div>
      </div>
    </body>
    </html>
  `
});

// =============================================
// LAUNCHPAD APPLICATION NOTIFICATION
// =============================================
export const launchpadApplicationEmail = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolName: string;
  schoolType?: string;
  ideaTitle: string;
  ideaCategory?: string;
  ideaDescription?: string;
  guardianName: string;
  guardianPhone: string;
}) => ({
  subject: `🚀 New LaunchPad Application: ${data.firstName} ${data.lastName}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF8C42 0%, #A855F7 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .section-title { font-size: 16px; font-weight: bold; color: #FF8C42; margin: 20px 0 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">🚀 New LaunchPad Application</h1>
          <p style="margin:10px 0 0;">A new student has applied for LaunchPad 2026</p>
        </div>
        <div class="content">
          <div class="section-title">👤 Student Information</div>
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.firstName} ${data.lastName}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${data.phone}</div>
          </div>
          
          <div class="section-title">🏫 School Information</div>
          <div class="field">
            <div class="label">School</div>
            <div class="value">${data.schoolName} (${data.schoolType || 'Not specified'})</div>
          </div>
          
          <div class="section-title">💡 Business Idea</div>
          <div class="field">
            <div class="label">Idea Title</div>
            <div class="value">${data.ideaTitle}</div>
          </div>
          ${data.ideaCategory ? `
          <div class="field">
            <div class="label">Category</div>
            <div class="value">${data.ideaCategory}</div>
          </div>
          ` : ''}
          ${data.ideaDescription ? `
          <div class="field">
            <div class="label">Description</div>
            <div class="value">${data.ideaDescription}</div>
          </div>
          ` : ''}
          
          <div class="section-title">👨‍👩‍👧 Guardian Information</div>
          <div class="field">
            <div class="label">Guardian Name</div>
            <div class="value">${data.guardianName}</div>
          </div>
          <div class="field">
            <div class="label">Guardian Phone</div>
            <div class="value">${data.guardianPhone}</div>
          </div>
        </div>
        <div class="footer">
          <p>Application received at: ${new Date().toLocaleString()}</p>
          <p>Review this application in your Supabase dashboard</p>
        </div>
      </div>
    </body>
    </html>
  `
});

// =============================================
// SPONSOR INQUIRY EMAIL
// =============================================
export const sponsorNotificationEmail = (data: {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  sponsorshipType?: string;
  budgetRange?: string;
  message?: string;
}) => ({
  subject: `💼 New Sponsor Inquiry from ${data.companyName}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">💼 New Sponsor Inquiry</h1>
          <p style="margin:10px 0 0;">A potential sponsor has reached out</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">🏢 Company</div>
            <div class="value">${data.companyName}</div>
          </div>
          <div class="field">
            <div class="label">👤 Contact Name</div>
            <div class="value">${data.contactName}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">📱 Phone</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          ${data.website ? `
          <div class="field">
            <div class="label">🌐 Website</div>
            <div class="value">${data.website}</div>
          </div>
          ` : ''}
          ${data.sponsorshipType ? `
          <div class="field">
            <div class="label">🏷️ Sponsorship Type</div>
            <div class="value">${data.sponsorshipType}</div>
          </div>
          ` : ''}
          ${data.budgetRange ? `
          <div class="field">
            <div class="label">💰 Budget Range</div>
            <div class="value">${data.budgetRange}</div>
          </div>
          ` : ''}
          ${data.message ? `
          <div class="field">
            <div class="label">💬 Message</div>
            <div class="value">${data.message}</div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>Received at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `
});