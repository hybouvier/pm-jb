(() => {
  async function loadInto(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    el.innerHTML = await res.text();
  }

  async function boot() {
    try {
      await loadInto("site-header", "/partials/header.html");
      await loadInto("site-footer", "/partials/footer.html");
      await loadInto("site-sticky", "/partials/sticky.html");
    } catch (e) {
      console.warn("Erreur injection layout :", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
