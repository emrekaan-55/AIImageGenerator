import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'Yhttps://fbzoawcizygvbajatqjq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiem9hd2NpenlndmJhamF0cWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDcxMzUsImV4cCI6MjA0OTYyMzEzNX0.3KQu78DsCSIWHZfosZp9_v2jbITZCbWDJHQT_1uUdfU';

const supabase = createClient(supabaseUrl, supabaseKey, { 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    debug: true 
  });

export default supabase;