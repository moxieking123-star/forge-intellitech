import { createClient, FormSubmission } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function SubmissionsPage() {
  const supabase = createClient()
  
  const { data: submissions, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching submissions:', error)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Form Submissions</h1>
        <Link 
          href="/admin" 
          className="text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      {/* Submissions List */}
      <div className="space-y-4">
        {submissions && submissions.length > 0 ? (
          submissions.map((sub: FormSubmission) => (
            <div 
              key={sub.id} 
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{sub.name}</h3>
                  <p className="text-gray-600 text-sm">
                    <a href={`mailto:${sub.email}`} className="text-blue-600 hover:underline">
                      {sub.email}
                    </a>
                    {sub.phone && (
                      <>
                        {' | '}
                        <a href={`tel:${sub.phone}`} className="text-blue-600 hover:underline">
                          {sub.phone}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    sub.status === 'new' 
                      ? 'bg-red-100 text-red-800' 
                      : sub.status === 'contacted'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {sub.status}
                  </span>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(sub.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              {sub.subject && (
                <p className="mt-2 text-gray-700">
                  <span className="font-medium">Subject:</span> {sub.subject}
                </p>
              )}
              
              {sub.message && (
                <p className="mt-2 text-gray-600 text-sm bg-gray-50 p-3 rounded">
                  {sub.message}
                </p>
              )}
              
              {/* Quick Actions */}
              <div className="mt-3 flex space-x-3">
                <a
                  href={`mailto:${sub.email}?subject=Re: ${sub.subject || 'Your Inquiry'}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ✉️ Reply
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
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No submissions yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Form submissions will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}