-- HEALINK Supabase Storage Bucket setup for Medical Reports & QR Codes

INSERT INTO storage.buckets (id, name, public) 
VALUES ('health_documents', 'health_documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Document Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'health_documents');

CREATE POLICY "Authenticated Document Upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'health_documents');
