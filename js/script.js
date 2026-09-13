"use strict";
const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = "MENU ＋";
}
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
  menu.textContent = open ? "CLOSE −" : "MENU ＋";
});
nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelectorAll(".work").forEach((work) => {
      work.hidden =
        button.dataset.filter !== "すべて" && work.dataset.category !== button.dataset.filter;
    });
  }),
);
const dialog = document.querySelector("#detail");
document.querySelectorAll(".work-open").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#detail-title").textContent = button.dataset.title;
    document.querySelector("#detail-category").textContent =
      button.dataset.category + " / 架空のサンプル";
    document.querySelector("#detail-site").setAttribute("href", button.dataset.site);
    document.querySelector("#detail-aim").textContent = button.dataset.aim;
    document.querySelector("#detail-feature").textContent = button.dataset.feature;
    dialog.showModal();
  }),
);
document.querySelector("#close-dialog")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }
});
document.querySelector("#copy")?.addEventListener("click", async () => {
  const template = document.querySelector("#template");
  const status = document.querySelector("#copy-status");
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(template.value);
    status.textContent = "コピーしました。相談文の下書きにご利用ください。";
  } catch {
    template.classList.add("show");
    template.focus();
    template.select();
    status.textContent =
      "下の文章を選択しました。長押し、または Ctrl+C / ⌘C でコピーしてください。";
  }
});
