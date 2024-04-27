import { createClient } from '@supabase/supabase-js'

const URL = 'https://ryijhvyljsfunpusddrm.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aWpodnlsanNmdW5wdXNkZHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NTU1MDcsImV4cCI6MjAyODUzMTUwN30.CxlhIKBWr31zdskKPD2qEQG-XS3noTokJtKLdp7q6DI';

export const supabase = createClient(URL, API_KEY);

