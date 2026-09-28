-- Create Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create Articles Table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  reading_time TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create Podcasts Table
CREATE TABLE podcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  episode_number INTEGER,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  audio_url TEXT,
  duration TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create Comments Table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create Echoes Table (like/clap functionality)
CREATE TABLE echoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE echoes ENABLE ROW LEVEL SECURITY;

-- Public read access for Categories
CREATE POLICY "Allow public read-only access to categories"
ON categories FOR SELECT
TO public
USING (true);

-- Public read access for Published Articles
CREATE POLICY "Allow public read access to published articles"
ON articles FOR SELECT
TO public
USING (status = 'published');

-- Public read access for Published Podcasts
CREATE POLICY "Allow public read access to published podcasts"
ON podcasts FOR SELECT
TO public
USING (status = 'published');

-- Public access to Approved Comments
CREATE POLICY "Allow public read access to approved comments"
ON comments FOR SELECT
TO public
USING (status = 'approved');

-- Allow public to create comments
CREATE POLICY "Allow public to create comments"
ON comments FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to read Echoes
CREATE POLICY "Allow public to read echoes"
ON echoes FOR SELECT
TO public
USING (true);

-- Allow public to create Echoes
CREATE POLICY "Allow public to create echoes"
ON echoes FOR INSERT
TO public
WITH CHECK (true);

-- STORAGE BUCKETS

-- Insert storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('article-images', 'article-images', true),
  ('podcast-artwork', 'podcast-artwork', true),
  ('podcast-audio', 'podcast-audio', true)
ON CONFLICT (id) DO NOTHING;


-- Allow public read access to the buckets
CREATE POLICY "Public Access to Article Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');

CREATE POLICY "Public Access to Podcast Artwork"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'podcast-artwork');

CREATE POLICY "Public Access to Podcast Audio"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'podcast-audio');

-- For now, authenticated users (Admins) can insert to storage
CREATE POLICY "Authenticated users can upload Article Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload Podcast Artwork"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'podcast-artwork');

CREATE POLICY "Authenticated users can upload Podcast Audio"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'podcast-audio');

-- Set up trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcasts_updated_at
    BEFORE UPDATE ON podcasts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
