import { calendarConfig } from './calendar-config.js';
import { supabase } from '/supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, calendarConfig);
  calendar.render();
});