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

  async function inject() {
    const base = getBase();
    const headerEl = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");
    const stickyEl = document.getElementById("site-sticky");

    try {
      if (headerEl) headerEl.innerHTML = applyBase(await loadPartial(`${base}/partials/header.html`), base);
      if (footerEl) footerEl.innerHTML = applyBase(await loadPartial(`${base}/partials/footer.html`), base);
      if (stickyEl) stickyEl.innerHTML = applyBase(await loadPartial(`${base}/partials/sticky.html`), base);
    } catch (e) {
      console.warn(e);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject);
  else inject();
})();
