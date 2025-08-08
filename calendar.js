// ฟังก์ชัน renderCalendar, openModal, closeModal ถูกออกแบบให้เรียกใช้งาน event handler ใน supabase.js
window.openModal = openModal;
window.closeModal = closeModal;
window.addEvent = addEvent;
window.handleDrop = handleDrop;

// เมื่อโหลดหน้านี้ calendar.js จะรัน renderCalendar() เมื่อ auth state เปลี่ยน
