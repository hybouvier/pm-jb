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
    const stickyEl = document.getElementById("site-sticky");

    try {
      if (headerEl) {
        const headerHtml = await loadPartial(`${base}/partials/header.html`);
        headerEl.innerHTML = applyBase(headerHtml, base);
      }

      if (footerEl) {
        const footerHtml = await loadPartial(`${base}/partials/footer.html`);
        footerEl.innerHTML = applyBase(footerHtml, base);
      }

      if (stickyEl) {
        const stickyHtml = await loadPartial(`${base}/partials/sticky.html`);
        stickyEl.innerHTML = applyBase(stickyHtml, base);
      }

    } catch (error) {
      console.warn("Erreur injection layout :", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectLayout);
  } else {
    injectLayout();
  }

})();
