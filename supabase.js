import{ createClient } from'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://cbzvgkpmlagvihiswtpr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNienZna3BtbGFndmloaXN3dHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzIxMDAsImV4cCI6MjA2ODE0ODEwMH0.zEWErfdsjpr5nNLzNiFJhU6M9ft59-VAxCafF9jU8j4'
export const supabase = createClient(supabaseUrl, supabaseKey)
