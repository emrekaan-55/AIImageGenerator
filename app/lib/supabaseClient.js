import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'Yhttps://fbzoawcizygvbajatqjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiem9hd2NpenlndmJhamF0cWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDcxMzUsImV4cCI6MjA0OTYyMzEzNX0.3KQu78DsCSIWHZfosZp9_v2jbITZCbWDJHQT_1uUdfU';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;