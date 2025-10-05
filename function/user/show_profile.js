document.addEventListener("DOMContentLoaded", async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar, theme_color")
        .eq("user_id", user.id)
        .single();

      // ชื่อ
      document.getElementById("display-name").textContent =
        profile?.full_name || user.email || "User";

      // Avatar + Theme Color
      const avatarContainer = document.getElementById("user-color");
      if (profile?.theme_color) {
        avatarContainer.style.background = profile.theme_color;
      }
      if (profile?.avatar) {
        avatarContainer.innerHTML =
          `<img src="${profile.avatar}" alt="avatar" width="24" height="24" class="rounded-circle">`;
      }
    } else {
      document.getElementById("display-name").textContent = "Guest";
    }
      });