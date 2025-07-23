import{ createClient } from'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://cbzvgkpmlagvihiswtpr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNienZna3BtbGFndmloaXN3dHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzIxMDAsImV4cCI6MjA2ODE0ODEwMH0.zEWErfdsjpr5nNLzNiFJhU6M9ft59-VAxCafF9jU8j4'
const supabase = createClient(supabaseUrl, supabaseKey)

import { supabase } from './supabase.js'

// สมัครสมาชิก
document.querySelector('Register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name }  // เก็บ name เพิ่มเข้าไปใน metadata
        }
    })

    if (error) {
        alert('Register failed: ' + error.message)
    } else {
        alert('Register successful! Please check your email to confirm.')
    }
})

// ล็อกอิน
document.querySelector('login-form').addEventListener('submit', async (e) => {
    e.reventDefault();

    const email = e.target.email.value
    const password = e.target.password.value

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        alert('Login failed: ' + error.message)
    } else {
        alert('Login successful!')
        console.log('User info:', data.user)
    }
})
