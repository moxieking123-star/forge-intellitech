-- Public submissions are handled by trusted server routes using the
-- service-role client. No browser role needs direct table access.
DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'blog_posts',
    'contact_submissions',
    'launchpad_applications',
    'launchpad_submissions',
    'newsletter_subscribers',
    'sponsor_inquiries',
    'student_applications'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC, anon, authenticated', table_name);
    EXECUTE format('GRANT ALL ON TABLE public.%I TO service_role', table_name);
  END LOOP;
END $$;
