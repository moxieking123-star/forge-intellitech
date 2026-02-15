import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

// Define type for submissions
type Submission = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string | null
  form_type: string
  status: string
  created_at: string
}

export default async function AdminPage() {
  // Check for environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-700">Missing Supabase environment variables.</p>
          <p className="text-gray-500 mt-2">Make sure .env.local has:</p>
          <pre className="bg-gray-800 text-white p-4 rounded mt-2 text-sm">
{`NEXT_PUBLIC_SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key`}
          </pre>
        </div>
      </div>
    )
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Fetch submissions
  const { data: submissions, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            📋 Form Submissions
          </h1>
          <Link 
            href="/" 
            className="text-blue-600 hover:underline"
          >
            ← Back to Website
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error.message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-3xl font-bold">{submissions?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm">New</p>
            <p className="text-3xl font-bold text-red-600">
              {submissions?.filter((s: Submission) => s.status === 'new').length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Today</p>
            <p className="text-3xl font-bold text-blue-600">
              {submissions?.filter((s: Submission) => {
                const today = new Date().toDateString()
                return new Date(s.created_at).toDateString() === today
              }).length || 0}
            </p>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">All Submissions</h2>
          </div>

          {submissions && submissions.length > 0 ? (
            <div className="divide-y">
              {submissions.map((sub: Submission) => (
                <div key={sub.id} className="p-6 hover:bg-gray-50">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{sub.name}</h3>
                      <p className="text-sm text-gray-600">
                        <a href={`mailto:${sub.email}`} className="text-blue-600 hover:underline">
                          {sub.email}
                        </a>
                        {sub.phone && (
                          <span>
                            {' • '}
                            <a href={`tel:${sub.phone}`} className="text-blue-600 hover:underline">
                              {sub.phone}
                            </a>
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        sub.status === 'new'
                          ? 'bg-red-100 text-red-800'
                          : sub.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {sub.status?.toUpperCase() || 'NEW'}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(sub.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Subject */}
                  {sub.subject && (
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Subject:</span> {sub.subject}
                    </p>
                  )}

                  {/* Message */}
                  {sub.message && (
                    <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 mb-3">
                      {sub.message}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4">
                    <a
                      href={`mailto:${sub.email}?subject=Re: ${sub.subject || 'Your Inquiry'}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ✉️ Reply via Email
                    </a>
                    {sub.phone && (
                      <a
                        href={`tel:${sub.phone}`}
                        className="text-sm text-green-600 hover:underline"
                      >
                        📞 Call
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No submissions yet</p>
              <p className="text-gray-400 text-sm mt-2">
                When someone fills out your contact form, it will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Help Links */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-3">Useful Links</h3>
          <div className="space-y-2 text-sm">
            <p>
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                → Supabase Dashboard
              </a>
              <span className="text-gray-500 ml-2">(View database directly)</span>
            </p>
            <p>
              <a 
                href="https://mail.zoho.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                → Zoho Mail
              </a>
              <span className="text-gray-500 ml-2">(Check your emails)</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}