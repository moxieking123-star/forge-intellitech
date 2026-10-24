// Public diagnostics must never reveal mail configuration or send email.
export async function GET() {
 return Response.json({error:'Not found.'},{status:404,headers:{'Cache-Control':'private, no-store'}});
}
