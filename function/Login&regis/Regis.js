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

// handle SignUp
window.handleSignUp = async function () {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const terms = document.getElementById("terms").checked;
  const messageBox = document.getElementById("messageBox");

  if (!fullName || !email || !password || !confirmPassword) {
    showMessage("Please fill in all fields", "bg-red-100 text-red-700");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match", "bg-red-100 text-red-700");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters", "bg-red-100 text-red-700");
    return;
  }

  if (!terms) {
    showMessage("You must agree to the Terms and Conditions", "bg-red-100 text-red-700");
    return;
  }

  // สร้าง user บน Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }, // metadata
    },
  });

  if (error) {
    showMessage(error.message, "bg-red-100 text-red-700");
  } else {
    showMessage("Account created! Please check your email for verification.", "bg-green-100 text-green-700");
    setTimeout(() => {
      window.location.href = "Login.html"; // ไปหน้า login หลังสมัครเสร็จ
    }, 2000);
  }
};

// ฟังก์ชันแสดงข้อความ
function showMessage(msg, style) {
  const messageBox = document.getElementById("messageBox");
  messageBox.className = `p-4 rounded-lg mt-4 ${style}`;
  messageBox.innerText = msg;
  messageBox.classList.remove("hidden");
}