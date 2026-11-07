document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (new URLSearchParams(window.location.search).get("palette") === "orange") {
  document.documentElement.classList.add("palette-orange");
}
