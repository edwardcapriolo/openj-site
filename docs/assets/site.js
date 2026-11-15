document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (new URLSearchParams(window.location.search).get("palette") === "orange") {
  document.documentElement.classList.add("palette-orange");
}

document.querySelectorAll("[data-code-tabs]").forEach((tabs) => {
  const buttons = tabs.querySelectorAll("[data-code-tab]");
  const panels = tabs.querySelectorAll("[data-code-panel]");
  buttons.forEach((button) => button.addEventListener("click", () => {
    const selected = button.dataset.codeTab;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.codePanel === selected));
  }));
  tabs.querySelectorAll("[data-copy-code]").forEach((button) => button.addEventListener("click", async () => {
    const code = button.closest(".code-panel").querySelector("code").innerText;
    await navigator.clipboard.writeText(code);
    button.textContent = "Copied";
    button.setAttribute("aria-label", "Copied");
    window.setTimeout(() => {
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code");
    }, 1200);
  }));
});
