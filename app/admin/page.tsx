import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            📋 Admin Dashboard
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
        {/* Setup Required Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚙️</div>
            <div>
              <h2 className="text-xl font-bold text-yellow-800 mb-2">
                Database Setup Required
              </h2>
              <p className="text-yellow-700 mb-4">
                The admin dashboard requires Supabase to be configured. 
                Once set up, you&apos;ll be able to view all form submissions here.
              </p>
              <div className="bg-yellow-100 rounded p-4 text-sm font-mono text-yellow-800">
                <p className="mb-2">Required in .env.local:</p>
                <p>NEXT_PUBLIC_SUPABASE_URL=your_url</p>
                <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key</p>
                <p>SUPABASE_SERVICE_ROLE_KEY=your_service_key</p>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Total Submissions</p>
            <p className="text-3xl font-bold text-gray-300">--</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm">New</p>
            <p className="text-3xl font-bold text-gray-300">--</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm">Today</p>
            <p className="text-3xl font-bold text-gray-300">--</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">All Submissions</h2>
          </div>
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No submissions yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Connect your database to start receiving form submissions.
            </p>
          </div>
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
              <span className="text-gray-500 ml-2">(Create your database)</span>
            </p>
            <p>
              <a 
                href="https://resend.com/api-keys" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                → Resend Dashboard
              </a>
              <span className="text-gray-500 ml-2">(Set up email sending)</span>
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