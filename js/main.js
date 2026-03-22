// ==============================
// IMPORTS
// ==============================
import { initRouter } from "./router.js";
import { loadData } from "../data/data.js";

// ==============================
// DOM ELEMENTS (falls nötig)
// ==============================

const burger = document.querySelector(".nav__toggle");
const navDrawer = document.querySelector(".nav__drawer");


// ==============================
// EVENT LISTENERS
// ==============================

burger?.addEventListener("click", () => {
  burger.classList.toggle("nav-open");
  navDrawer.classList.toggle("hidden");

  const isExpanded = burger.getAttribute("aria-expanded") === "true";
  const nowOpen = !isExpanded;
  burger.setAttribute("aria-expanded", nowOpen);
  navDrawer.setAttribute("aria-hidden", !nowOpen);

  if (nowOpen) {
    navDrawer.querySelector("a")?.focus();
  }
});

document.addEventListener("keydown", escKeyCloseNav);


// Functions
export function closeNav() {
  burger?.classList.remove("nav-open");
  navDrawer?.classList.add("hidden");
  burger?.setAttribute("aria-expanded", "false");
  navDrawer?.setAttribute("aria-hidden", "true");
}

function escKeyCloseNav(event) {
  if (event.key === "Escape") {
    closeNav();
  }
} 


// ==============================
// APP INITIALIZATION
// ==============================

async function initApp() {
  try {

    const data = await loadData();

    initRouter(data);
  } catch (error) {
    console.error("Fehler beim Start der App:", error);
  }
}

initApp();