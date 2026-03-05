Adding User to user_profiles on Google Sign-in

-- Create the function
(for INSERT INTO id is mandatory, the rest are optional. Make sure to change the columns in create user_profiles table to match which ever options you use.)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
VALUES (
NEW.id,
NEW.email,
NEW.raw_user_meta_data->>'full_name',
NEW.raw_user_meta_data->>'avatar_url'
);
RETURN NEW;
END;

$$
LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create user_profiles table

CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile

CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Allow insert from the trigger (runs as SECURITY DEFINER so it bypasses RLS)
-- No insert policy needed for users since the trigger handles it

-----------------------------------------------------------------------------------------
$$
