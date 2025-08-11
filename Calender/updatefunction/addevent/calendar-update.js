import { supabase } from '/supabase.js';

/**
 * อัปเดต Event ใน Supabase เมื่อมีการย้ายหรือปรับขนาด
 * @param {Object} event - Event object จาก FullCalendar
 */
export async function updateEventInSupabase(event) {
  try {
    // ตรวจสอบการเข้าสู่ระบบ
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('ไม่พบผู้ใช้หรือยังไม่ได้ล็อกอิน');
      return { error: 'Unauthorized' };
    }

    // เตรียมข้อมูลสำหรับอัปเดต
    const updates = {
      title: event.title,
      start_date: event.startStr,
      end_date: event.endStr || null, // กรณีไม่มี endDate
      all_day: event.allDay,
      updated_at: new Date().toISOString() // เพิ่มเวลาอัปเดต (optional)
    };

    // ส่งคำสั่งอัปเดตไปที่ Supabase
    const { error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', event.id)
      .eq('user_id', user.id); // ตรวจสอบสิทธิ์ผู้ใช้

    if (error) throw error;

    console.log('✅ อัปเดต Event สำเร็จ');
    return { success: true };

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการอัปเดต:', error);
    return { error: error.message };
  }
}

/**
 * ยกเลิกการเปลี่ยนแปลงและรีเฟรชข้อมูลจาก Supabase
 * @param {Object} event - Event object จาก FullCalendar
 */
export function revertEventChange(event) {
  if (event && typeof event.revert === 'function') {
    event.revert(); // ยกเลิกการเปลี่ยนแปลงใน UI
    console.log('ยกเลิกการเปลี่ยนแปลงและโหลดข้อมูลใหม่');
  }
}