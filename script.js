document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.style.opacity = "1";
  });

  document.querySelectorAll("details").forEach(d => {
    d.addEventListener("toggle", () => {
      if (d.open) d.scrollIntoView({ behavior:"smooth", block:"center" });
    });
  });
});
(function () {
  function isBlogPath() {
    return window.location.pathname.includes("/blog/");
  }

  function getBase() {
    return isBlogPath() ? ".." : ".";
  }

  async function loadPartial(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Impossible de charger: " + url);
    return await res.text();
  }

  function applyBase(html, base) {
    return html.replaceAll("{{BASE}}", base);
  }

  async function injectLayout() {
    const base = getBase();

    const headerEl = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");

    if (!headerEl && !footerEl) return;

    try {
      if (headerEl) {
        const headerHtml = await loadPartial(`${base}/partials/header.html`);
        headerEl.innerHTML = applyBase(headerHtml, base);
      }

      if (footerEl) {
        const footerHtml = await loadPartial(`${base}/partials/footer.html`);
        footerEl.innerHTML = applyBase(footerHtml, base);
      }
    } catch (e) {
      // En cas d’erreur, on ne casse pas la page
      console.warn(e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectLayout);
  } else {
    injectLayout();
  }
})();
