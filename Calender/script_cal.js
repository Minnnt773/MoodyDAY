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

      datesSet: function () {
        const calendarContainer = document.querySelector('.fc-view-harness');
        if (calendarContainer) {
          calendarContainer.classList.remove('animate__animated', 'animate__fadeIn');
          void calendarContainer.offsetWidth;
          calendarContainer.classList.add('animate__animated', 'animate__fadeIn');
        }
      },

      events: []
    });

    calendar.render();

    eventForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = eventTitleInput.value.trim();
      if (title) {
        calendar.addEvent({
          title: title,
          start: document.getElementById('eventStart').value,
          end: document.getElementById('eventEnd').value,
          allDay: document.getElementById('eventAllDay').value === "true"
        });
      calendar.unselect();
      }
      modal.hide();
    });
  });