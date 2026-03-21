import { renderPage } from "./render.js";
import { closeNav } from "./main.js";

export function initRouter(data) {
  const navLinks = document.querySelectorAll(".nav__link");
  const indicator = document.querySelector(".nav__indicator");

  const hash = window.location.hash.substring(1) || "home";
  const [route, sub] = hash.split("/");

  showSection(route);
  renderPage(route, data, sub);
  let indicatorVisible = false;
  let leaveTimeout = null;

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      clearTimeout(leaveTimeout);

      if (!indicatorVisible) {
        // Erstes Hover: direkt positionieren ohne Slide-Animation
        indicator.style.transition = "opacity 0.2s ease";
        positionIndicator(indicator, link);
        indicator.style.opacity = "0.25";
        indicatorVisible = true;
        // Transition nach kurzem Delay wieder aktivieren für späteres Sliding
        setTimeout(() => {
          indicator.style.transition = "transform 0.3s ease, width 0.3s ease, opacity 0.3s ease";
        }, 50);
      } else {
        positionIndicator(indicator, link);
      }
    });
  });

  const drawer = document.querySelector(".nav__drawer");
  drawer.addEventListener("mouseleave", () => {
    leaveTimeout = setTimeout(() => {
      indicator.style.opacity = "0";
      indicatorVisible = false;
    }, 1500);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const route = event.currentTarget.dataset.route;

      showSection(route);
      renderPage(route, data);
      window.location.hash = route;
      closeNav();
    });
  });

  const heroBtn = document.querySelector(".hero__btn");
  heroBtn.addEventListener("click", () => {
    showSection("destination");
    renderPage("destination", data);
    window.location.hash = "destination";
  });

}

function positionIndicator(indicator, link) {
  const drawer = document.querySelector(".nav__drawer");
  const drawerRect = drawer.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  indicator.style.width = `${linkRect.width}px`;
  indicator.style.transform = `translateX(${linkRect.left - drawerRect.left}px)`;
}

function showSection(route) {
  document.body.className = route;

  document.querySelectorAll(".nav__link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === route);
  });

  const sections = document.querySelectorAll("main section");
  
  sections.forEach((section) => {
    section.classList.add("hidden");
  });


  const activeSection = document.querySelector(`#${route}`);
  if (activeSection) {
    activeSection.classList.remove("hidden");
  } else {
    sections[0]?.classList.remove("hidden");
  }
}


