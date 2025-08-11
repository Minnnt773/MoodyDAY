import { updateEventInSupabase, revertEventChange } from './calendar-update.js';

export const calendarConfig = {
  // ... การตั้งค่าอื่นๆ ...
  editable: true, // ต้องเปิดใช้งานเพื่อย้าย/ปรับขนาด Event
  eventDrop: async function(info) {
    const { error } = await updateEventInSupabase(info.event);
    if (error) revertEventChange(info.event);
  },
  eventResize: async function(info) {
    const { error } = await updateEventInSupabase(info.event);
    if (error) revertEventChange(info.event);
  }
};