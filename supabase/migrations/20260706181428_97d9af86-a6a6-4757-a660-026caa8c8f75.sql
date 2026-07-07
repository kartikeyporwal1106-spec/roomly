
-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_on_request_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
-- has_role must remain callable by signed-in users (RLS policies use it)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Replace the too-permissive notifications INSERT policy: only inserts
-- targeting the caller are allowed from the client; system notifications
-- come from SECURITY DEFINER triggers running as the table owner.
DROP POLICY "Signed in users can insert notifications" ON public.notifications;
CREATE POLICY "Users create their own notifications" ON public.notifications
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Storage policies for the private "avatars" bucket:
-- users can upload/read/replace/delete files under a folder named after their user id.
CREATE POLICY "Users can view own avatars" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can upload own avatars" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own avatars" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own avatars" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Seed a small set of hostels/floors/rooms so the app has data on first load
INSERT INTO public.hostels (hostel_name, gender) VALUES
  ('Aravali', 'male'),
  ('Nilgiri', 'male'),
  ('Shivalik', 'female'),
  ('Vindhya', 'female')
ON CONFLICT DO NOTHING;

DO $$
DECLARE h RECORD; f RECORD; i INT; j INT;
BEGIN
  FOR h IN SELECT id FROM public.hostels LOOP
    FOR i IN 1..4 LOOP
      INSERT INTO public.floors (hostel_id, floor_number) VALUES (h.id, i) ON CONFLICT DO NOTHING;
    END LOOP;
    FOR f IN SELECT id, floor_number FROM public.floors WHERE hostel_id = h.id LOOP
      FOR j IN 1..8 LOOP
        INSERT INTO public.rooms (floor_id, room_number, capacity)
        VALUES (f.id, (f.floor_number * 100 + j)::text, 3)
        ON CONFLICT DO NOTHING;
      END LOOP;
    END LOOP;
  END LOOP;
END $$;
