document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'th', // ภาษาไทย
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    buttonText: {
      today: 'วันนี้',
      month: 'เดือน',
      week: 'สัปดาห์',
      list: 'รายการ'
    },
    events: [
      {
        title: 'นัดประชุม',
        start: '2025-07-29T10:30:00',
        end: '2025-07-29T12:30:00',
        color: '#E67E22'
      },
      {
        title: 'ส่งโปรเจค',
        start: '2025-08-01',
        color: '#2980B9'
      },
      {
        title: 'ไปเที่ยว',
        start: '2025-08-05',
        end: '2025-08-07',
        color: '#27AE60'
      }
    ]
  });

  calendar.render();
});
