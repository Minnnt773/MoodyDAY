import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

let supabase;
export function initSupabase() {
  supabase = createClient(
    'https://cbzvgkpmlagvihiswtpr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNienZna3BtbGFndmloaXN3dHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzIxMDAsImV4cCI6MjA2ODE0ODEwMH0.zEWErfdsjpr5nNLzNiFJhU6M9ft59-VAxCafF9jU8j4'
  );
}
document.getElementById('login-form').querySelector('form').addEventListener('submit', 
  
    async function(e) {
        e.preventDefault()
        const email = this.email.value
        const password = this.password.value
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error) {
        alert('Login error: '+ error.message)
        } else{
        alert('Login successful!')
    
// Redirect or update UI as needed
}
})


document.getElementById('Register-form').querySelector('form').addEventListener('submit', 

    async function(e){
        e.preventDefault()
        const name = this.name.value
        const email = this.email.value
        const password = this.password.value
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name }}
         })
        if(error) {
            alert('Registration error: '+ error.message)
    } else{
    alert('Registration successful! Please check your email to confirm.')
  }
})
