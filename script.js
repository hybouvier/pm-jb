(() => {
  async function load(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);

    el.innerHTML = await res.text();
  }

  async function boot() {
    try {
      await load("site-header", "/partials/header.html");
      await load("site-footer", "/partials/footer.html");
      await load("site-sticky", "/partials/sticky.html");
    } catch (e) {
      console.warn("Erreur injection layout :", e);
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
