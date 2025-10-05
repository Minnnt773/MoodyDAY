import { supabase } from '../Superbase/APIsuperbase.js';

//แสดงรหัสผ่าน
window.togglePassword = function () {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.setAttribute("stroke", "blue");
    } else {
        passwordInput.type = "password";
        eyeIcon.setAttribute("stroke", "currentColor");
    }
};

// handle login
window.handleLogin = async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageBox = document.getElementById("messageBox");

    if (!email || !password) {
        showMessage("Please fill in all fields", "bg-red-100 text-red-700");
        return;
    }

    // เรียก Supabase signIn
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        showMessage(error.message, "bg-red-100 text-red-700");
    } else {
        showMessage("Login successful! Redirecting...", "bg-green-100 text-green-700");
        setTimeout(() => {
            window.location.href = "/page/Calendar/Calendar.html"; // เปลี่ยนเส้นทางหลัง login สำเร็จ
        }, 1500);
    }
};

// ฟังก์ชันแสดงข้อความ
function showMessage(msg, style) {
    const messageBox = document.getElementById("messageBox");
    messageBox.className = `p-4 rounded-lg mt-4 ${style}`;
    messageBox.innerText = msg;
    messageBox.classList.remove("hidden");
}