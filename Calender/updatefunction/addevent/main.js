import { calendarConfig } from './calendar-config.js';
import { supabase } from '/supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, calendarConfig,{
    initialView: 'dayGridMonth',
    editable: true,    // ให้ลาก/resize ได้
    droppable: true,   // รองรับ drag จาก external
    selectable: true,  // เลือกช่วงวันได้
});
  calendar.render();
});