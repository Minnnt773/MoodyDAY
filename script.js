import { supabase } from '/supabase.js'



// สมัครสมาชิก
document.querySelector('#Register-form form').addEventListener('submit', async (e) => {
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
document.querySelector('#login-form form').addEventListener('submit', async (e) => {
    e.preventDefault();

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
        document.location = 'Calender/Calcender.html'
        console.log('User info:', data.user)
    }
})

console.log("Testing Supabase connection...")

supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
        console.error("Supabase connection failed:", error.message)
    } else {
        console.log("Connected to Supabase ✅", data)
    }
})


