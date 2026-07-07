
-- =========================================================
-- ENUMS
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'student');
CREATE TYPE public.gender_t AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');
CREATE TYPE public.looking_status_t AS ENUM ('looking_for_roommate', 'looking_for_room', 'not_looking');
CREATE TYPE public.cleanliness_t AS ENUM ('very_tidy', 'tidy', 'average', 'messy');
CREATE TYPE public.study_style_t AS ENUM ('early_bird', 'night_owl', 'flexible');
CREATE TYPE public.personality_t AS ENUM ('introvert', 'ambivert', 'extrovert');
CREATE TYPE public.request_status_t AS ENUM ('pending', 'accepted', 'rejected', 'cancelled');

-- =========================================================
-- USER ROLES (separate table – never store on profiles)
-- =========================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- HOSTELS / FLOORS / ROOMS
-- =========================================================
CREATE TABLE public.hostels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_name TEXT NOT NULL UNIQUE,
  gender public.gender_t,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hostels TO authenticated;
GRANT ALL ON public.hostels TO service_role;
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone signed in can view hostels" ON public.hostels
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage hostels" ON public.hostels
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.floors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  floor_number INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (hostel_id, floor_number)
);
GRANT SELECT ON public.floors TO authenticated;
GRANT ALL ON public.floors TO service_role;
ALTER TABLE public.floors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone signed in can view floors" ON public.floors
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage floors" ON public.floors
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  floor_id UUID NOT NULL REFERENCES public.floors(id) ON DELETE CASCADE,
  room_number TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 2 CHECK (capacity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (floor_id, room_number)
);
GRANT SELECT ON public.rooms TO authenticated;
GRANT ALL ON public.rooms TO service_role;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone signed in can view rooms" ON public.rooms
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage rooms" ON public.rooms
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- PROFILES (user info)
-- =========================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  roll_number TEXT,
  email TEXT,
  profile_photo TEXT,
  gender public.gender_t,
  branch TEXT,
  year INT,
  bio TEXT,
  phone TEXT,
  looking_status public.looking_status_t DEFAULT 'not_looking',
  onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed in users can view profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger: auto-create profile & default student role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, profile_photo)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================================
-- PREFERENCES (lifestyle)
-- =========================================================
CREATE TABLE public.preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  sleep_time TIME,
  wake_time TIME,
  cleanliness public.cleanliness_t,
  study_style public.study_style_t,
  personality public.personality_t,
  languages TEXT[] DEFAULT ARRAY[]::TEXT[],
  hobbies TEXT[] DEFAULT ARRAY[]::TEXT[],
  smoking BOOLEAN DEFAULT false,
  drinking BOOLEAN DEFAULT false,
  gaming BOOLEAN DEFAULT false,
  music TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.preferences TO authenticated;
GRANT ALL ON public.preferences TO service_role;
ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed in users can view preferences" ON public.preferences
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users manage their own preferences" ON public.preferences
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER preferences_updated_at
  BEFORE UPDATE ON public.preferences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================================
-- ROOMMATE REQUESTS
-- =========================================================
CREATE TABLE public.roommate_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status public.request_status_t NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (sender_id <> receiver_id)
);
CREATE UNIQUE INDEX roommate_requests_pending_unique
  ON public.roommate_requests (sender_id, receiver_id)
  WHERE status = 'pending';
GRANT SELECT, INSERT, UPDATE ON public.roommate_requests TO authenticated;
GRANT ALL ON public.roommate_requests TO service_role;
ALTER TABLE public.roommate_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view requests they sent or received" ON public.roommate_requests
  FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users send requests as themselves" ON public.roommate_requests
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Sender can cancel, receiver can respond" ON public.roommate_requests
  FOR UPDATE TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE TRIGGER roommate_requests_updated_at
  BEFORE UPDATE ON public.roommate_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================================
-- NOTIFICATIONS
-- =========================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX notifications_user_created_idx
  ON public.notifications (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view their notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update their notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete their notifications" ON public.notifications
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
-- Insert: allow anyone signed in (for sending request → notify receiver)
CREATE POLICY "Signed in users can insert notifications" ON public.notifications
  FOR INSERT TO authenticated WITH CHECK (true);

-- Trigger: create a notification when a roommate request is inserted/updated
CREATE OR REPLACE FUNCTION public.notify_on_request_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE sender_name TEXT;
BEGIN
  SELECT COALESCE(name, 'Someone') INTO sender_name FROM public.profiles WHERE id = NEW.sender_id;
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public.notifications (user_id, title, body, link)
    VALUES (NEW.receiver_id, 'New roommate request',
            sender_name || ' sent you a roommate request', '/requests');
  ELSIF (TG_OP = 'UPDATE' AND OLD.status = 'pending' AND NEW.status <> 'pending') THEN
    INSERT INTO public.notifications (user_id, title, body, link)
    VALUES (NEW.sender_id,
            CASE NEW.status
              WHEN 'accepted' THEN 'Request accepted 🎉'
              WHEN 'rejected' THEN 'Request declined'
              ELSE 'Request updated' END,
            'Your roommate request was ' || NEW.status, '/requests');
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER trg_notify_on_request
  AFTER INSERT OR UPDATE ON public.roommate_requests
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_request_change();

-- =========================================================
-- REALTIME
-- =========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.roommate_requests;
