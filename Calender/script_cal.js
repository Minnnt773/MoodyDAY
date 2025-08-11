import { supabase } from '/supabase.js'

let calendar; // ประกาศให้ทุกฟังก์ชันมองเห็น

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const modal = new bootstrap.Modal(document.getElementById('eventModal'));
  const eventTitleInput = document.getElementById('eventTitle');
  const eventForm = document.getElementById('eventForm');
  let calendar; 

  let tempEventInfo = {};

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    selectMirror: true,

    select: function (info) {
      tempEventInfo = info;
      eventTitleInput.value = '';
      document.getElementById('eventStart').value = info.startStr;
      document.getElementById('eventEnd').value = info.endStr;
      document.getElementById('eventAllDay').value = info.allDay;
      modal.show();
    },

    eventClick: function (info) {
      if (confirm('คุณต้องการลบกิจกรรมนี้ใช่หรือไม่?')) {
        info.event.remove();
      }
    },

    eventClick: async function (info) {
      if (confirm('คุณต้องการลบกิจกรรมนี้ใช่หรือไม่?')) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
          // ลบจาก Supabase
          const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', info.event.id)
            .eq('user_id', user.id); // เพิ่มเงื่อนไข user_id เพื่อความปลอดภัย

          if (error) throw error;

          // ลบจากปฏิทิน
          info.event.remove();
          alert('ลบกิจกรรมสำเร็จแล้ว');

        } catch (error) {
          console.error('Error deleting event:', error);
          alert('เกิดข้อผิดพลาดในการลบกิจกรรม');
        }
      }
    },

    datesSet: function () {
      const calendarContainer = document.querySelector('.fc-view-harness');
      if (calendarContainer) {
        calendarContainer.classList.remove('animate__animated', 'animate__fadeIn');
        void calendarContainer.offsetWidth;
        calendarContainer.classList.add('animate__animated', 'animate__fadeIn');
      }
    },

    events: async function (fetchInfo, successCallback, failureCallback) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return successCallback([]);
      }

      const { data, error } = await supabase
        .from('events')
        .select('id, title, start_date, end_date, all_day')
        .eq('user_id', user.id)
        .gte('start_date', fetchInfo.startStr)
        .lte('end_date', fetchInfo.endStr);

      if (error) {
        console.error('โหลดกิจกรรมไม่สำเร็จ:', error);
        return successCallback([]);
      } successCallback(data.map(ev => ({
        id: ev.id, // ต้องมี field นี้สำหรับการลบ
        title: ev.title,
        start: ev.start_date,
        end: ev.end_date,
        allDay: ev.all_day
      })));
    }
  });

  let isSubmitting = false;
  calendar.render();
  eventForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = eventTitleInput.value.trim();
    if (isSubmitting) return;
    isSubmitting = true;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { startStr: start, endStr: end, allDay } = tempEventInfo;

    // บันทึกข้อมูลลง Supabase
    const { data: [newEvent], error } = await supabase
      .from('events')
      .insert({
        title:title,
        start_date: start,
        end_date: end,
        all_day: allDay,
        user_id: user.id
      })
      .select();

    if (error) {
      console.error('บันทึกกิจกรรมไม่สำเร็จ:', error);
      return alert('บันทึกกิจกรรมไม่สำเร็จ');
    }

    modal.hide();
    calendar.refetchEvents();
  });
  isSubmitting = false;
});




