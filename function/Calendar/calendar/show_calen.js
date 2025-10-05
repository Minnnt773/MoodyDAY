import { supabase } from "../../Superbase/APIsuperbase.js";

document.addEventListener("DOMContentLoaded", async function () {
  const calendarEl = document.getElementById("calendar");
  const addEventModal = new bootstrap.Modal(document.getElementById("eventModal"));
  const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));

  const eventTitleInput = document.getElementById("eventTitle");
  const eventForm = document.getElementById("eventForm");

  const deleteEventName = document.getElementById("deleteEventName");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  let tempEventInfo = {};
  let eventToDelete = null;
  let isSubmitting = false;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "th",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    buttonText: {
      today: "วันนี้",
      month: "เดือน",
      week: "สัปดาห์",
      day: "วัน",
    },
    height: "auto",
    selectable: true,
    dayMaxEvents: true,

    // ✅ เลือกวัน -> เปิด modal เพิ่ม
    select: function (arg) {
      tempEventInfo = arg;
      eventTitleInput.value = "";
      document.getElementById("eventStart").value = arg.startStr;
      document.getElementById("eventEnd").value = arg.endStr;
      document.getElementById("eventAllDay").value = arg.allDay;
      addEventModal.show();
    },

    // ✅ คลิก event -> เปิด modal ลบ
    eventClick: function (info) {
      eventToDelete = info.event; // เก็บ event object ไว้
      deleteEventName.textContent = info.event.title; // ใส่ชื่อกิจกรรมใน modal
      deleteModal.show();
    },

    // ✅ โหลด event จาก Supabase
    events: async function (fetchInfo, successCallback, failureCallback) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return successCallback([]);

      const { data, error } = await supabase
        .from("events")
        .select("id, title, start_date, end_date, all_day")
        .eq("user_id", user.id)
        .gte("start_date", fetchInfo.startStr)
        .lte("end_date", fetchInfo.endStr);

      if (error) {
        console.error("โหลดกิจกรรมไม่สำเร็จ:", error);
        return successCallback([]);
      }

      successCallback(
        data.map((ev) => ({
          id: ev.id,
          title: ev.title,
          start: ev.start_date,
          end: ev.end_date,
          allDay: ev.all_day,
        }))
      );
    },
  });

  calendar.render();

  // ✅ Submit Form -> Insert Supabase
  eventForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const title = eventTitleInput.value.trim();
    if (!title || isSubmitting) return;
    isSubmitting = true;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนเพิ่มกิจกรรม");
      isSubmitting = false;
      return;
    }

    const { startStr: start, endStr: end, allDay } = tempEventInfo;

    const { data: newEvent, error } = await supabase
      .from("events")
      .insert({
        title: title,
        start_date: start,
        end_date: end,
        all_day: allDay,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("บันทึกกิจกรรมไม่สำเร็จ:", error);
      alert("บันทึกกิจกรรมไม่สำเร็จ");
      isSubmitting = false;
      return;
    }

    addEventModal.hide();
    calendar.refetchEvents(); // โหลดใหม่จาก DB
    isSubmitting = false;
  });

  // ✅ กดปุ่มลบใน modal -> ลบจาก Supabase + Calendar
  confirmDeleteBtn.addEventListener("click", async function () {
    if (!eventToDelete) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนลบกิจกรรม");
      return;
    }

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventToDelete.id)
        .eq("user_id", user.id);

      if (error) throw error;

      eventToDelete.remove();
      deleteModal.hide();
      alert("ลบกิจกรรมสำเร็จแล้ว");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("เกิดข้อผิดพลาดในการลบกิจกรรม");
    }
  });
});
