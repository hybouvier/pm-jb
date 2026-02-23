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
