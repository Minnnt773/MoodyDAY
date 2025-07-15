import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

let supabase;
export function initSupabase() {
  supabase = createClient(
    'https://cbzvgkpmlagvihiswtpr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNienZna3BtbGFndmloaXN3dHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzIxMDAsImV4cCI6MjA2ODE0ODEwMH0.zEWErfdsjpr5nNLzNiFJhU6M9ft59-VAxCafF9jU8j4'
  );
}

export async function login() { /* ... */ }
export async function signup() { /* ... */ }
export async function logout() { /* ... */ }
export function onAuthChange(cb) { /* ... */ }
export async function fetchEvents(dateKey) { /* ... */ }
export async function addEvent() { /* ... */ }
export async function handleDrop(e, targetDate) { /* ... */ }
