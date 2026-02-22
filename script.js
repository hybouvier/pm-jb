document.addEventListener("DOMContentLoaded", () => {
  // Reveal simple
  const els = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("reveal-on");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));

  // Smooth focus on FAQ open
  document.querySelectorAll("details").forEach(d => {
    d.addEventListener("toggle", () => {
      if (d.open) d.scrollIntoView({ behavior:"smooth", block:"center" });
    });
  });
});
