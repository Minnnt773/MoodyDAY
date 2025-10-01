import { supabase } from '/supabase.js'

const nameEl = document.getElementById('display-name')
const logoutBtn = document.getElementById('btn-logout')

async function loadUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        nameEl.textContent = 'Guest'
        logoutBtn.style.display = 'none'
        console.log('🔹 ไม่มี user login: Guest')
        return
    }

    const user = data.user
    const fullName = user.user_metadata?.display_name
    nameEl.textContent = fullName
    logoutBtn.style.display = 'inline-block'

    // ส่งค่าไป console
    console.log('🔹 User loaded:', {
        id: user.id,
        email: user.email,
        name: fullName
    })
}

// ฟัง event login/logout
supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔄 Auth event:', event)
    loadUser()
})

// ปุ่ม logout
logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut()
    console.log('🚪 ผู้ใช้ทำการ Logout แล้ว')
})

// โหลด user ตอนเปิดหน้า
loadUser()