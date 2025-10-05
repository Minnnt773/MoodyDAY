import { supabase } from "../Superbase/APIsuperbase.js";

let selectedAvatar = "👤";
let selectedColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

// เมื่อเลือก Avatar
document.querySelectorAll(".avatar-option").forEach(opt => {
  opt.addEventListener("click", () => {
    selectedAvatar = opt.dataset.avatar;
    document.getElementById("previewAvatar").textContent = selectedAvatar;
  });
});

// เมื่อเลือก Theme Color
document.querySelectorAll(".color-option").forEach(opt => {
  opt.addEventListener("click", () => {
    selectedColor = opt.dataset.color;
    document.getElementById("previewAvatar").style.background = selectedColor;

    // highlight ปุ่มที่เลือก
    document.querySelectorAll(".color-option").forEach(c => c.classList.remove("selected"));
    opt.classList.add("selected");
  });
});

// เมื่อกด Save
document.getElementById("saveBtn").addEventListener("click", async () => {
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;

  // ดึง user ปัจจุบัน
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return;
  }

  // บันทึกลง profiles (upsert)
  const { error } = await supabase
    .from("profiles")
    .upsert({
      user_id: user.id,
      full_name: userName,
      email: userEmail,
      avatar: selectedAvatar,
      theme_color: selectedColor
    });

  if (error) {
    console.error(error);
    alert("เกิดข้อผิดพลาด: " + error.message);
  } else {
    alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
  }
});

// update user name.email
const { data, error } = await supabase.auth.updateUser({
  email: userEmail,
  data: { full_name: userName }
});