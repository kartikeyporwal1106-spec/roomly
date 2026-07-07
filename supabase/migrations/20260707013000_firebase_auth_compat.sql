-- Compatibility layer for Firebase Authentication.
-- Firebase UIDs are text, so profiles can no longer depend on auth.users UUIDs.

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS firebase_uid TEXT UNIQUE;

ALTER TABLE public.profiles
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

CREATE INDEX IF NOT EXISTS profiles_firebase_uid_idx ON public.profiles(firebase_uid);

ALTER TABLE public.preferences
  DROP CONSTRAINT IF EXISTS preferences_user_id_fkey;

ALTER TABLE public.preferences
  ADD CONSTRAINT preferences_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.roommate_requests
  DROP CONSTRAINT IF EXISTS roommate_requests_sender_id_fkey,
  DROP CONSTRAINT IF EXISTS roommate_requests_receiver_id_fkey;

ALTER TABLE public.roommate_requests
  ADD CONSTRAINT roommate_requests_sender_id_fkey
  FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  ADD CONSTRAINT roommate_requests_receiver_id_fkey
  FOREIGN KEY (receiver_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.notifications
  DROP CONSTRAINT IF EXISTS notifications_user_id_fkey;

ALTER TABLE public.notifications
  ADD CONSTRAINT notifications_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Supabase Auth is no longer the application auth system. These policies allow
-- the Firebase-authenticated browser app to read/write app data with the
-- publishable Supabase key. For production, replace this with server-side
-- Firebase ID token verification before privileged writes.
DROP POLICY IF EXISTS "Signed in users can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can insert Firebase profiles" ON public.profiles
  FOR INSERT TO anon, authenticated WITH CHECK (firebase_uid IS NOT NULL);
CREATE POLICY "Public can update Firebase profiles" ON public.profiles
  FOR UPDATE TO anon, authenticated USING (firebase_uid IS NOT NULL) WITH CHECK (firebase_uid IS NOT NULL);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO anon;
GRANT SELECT ON public.hostels TO anon;
GRANT SELECT ON public.floors TO anon;
GRANT SELECT ON public.rooms TO anon;
GRANT SELECT, INSERT, UPDATE ON public.preferences TO anon;
GRANT SELECT, INSERT, UPDATE ON public.roommate_requests TO anon;
GRANT SELECT, INSERT, UPDATE ON public.notifications TO anon;

DROP POLICY IF EXISTS "Signed in users can view preferences" ON public.preferences;
DROP POLICY IF EXISTS "Users manage their own preferences" ON public.preferences;
CREATE POLICY "Public can view preferences" ON public.preferences FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can manage preferences" ON public.preferences FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Users view requests they sent or received" ON public.roommate_requests;
DROP POLICY IF EXISTS "Users send requests as themselves" ON public.roommate_requests;
DROP POLICY IF EXISTS "Sender can cancel, receiver can respond" ON public.roommate_requests;
CREATE POLICY "Public can view roommate requests" ON public.roommate_requests FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can create roommate requests" ON public.roommate_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can update roommate requests" ON public.roommate_requests FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users create their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users update own notifications" ON public.notifications;
CREATE POLICY "Public can view notifications" ON public.notifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can create notifications" ON public.notifications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can update notifications" ON public.notifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone signed in can view hostels" ON public.hostels;
CREATE POLICY "Public can view hostels" ON public.hostels FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Anyone signed in can view floors" ON public.floors;
CREATE POLICY "Public can view floors" ON public.floors FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Anyone signed in can view rooms" ON public.rooms;
CREATE POLICY "Public can view rooms" ON public.rooms FOR SELECT TO anon, authenticated USING (true);
