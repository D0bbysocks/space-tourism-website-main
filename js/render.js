let index = 0;
let destController = null;
let crewController = null;
let techController = null;

export function renderPage(route, data, sub) {
  if (route === "destination") {
    renderDestination(data.destinations, sub);
  } else if (route === "crew") {
    renderCrew(data.crew, sub);
  } else if (route === "technology") {
    renderTechnology(data.technology, sub);
  }
}


function renderTechnology(technology, activeName) {
  const active = technology.find(
    (t) => t.name.toLowerCase() === activeName?.toLowerCase()
  ) || technology[0];

  index = technology.indexOf(active);

  if (techController) techController.abort();
  techController = new AbortController();
  const { signal: techSignal } = techController;

  const nav = document.querySelector(".tech__slider-nav");

  nav.innerHTML = technology.map((t, index) => `
    <button
      class="tp-4 tech__slider-btn${t === active ? " is-active" : ""}"
      aria-label="Show ${t.name}"
      aria-pressed="${t === active}"
      data-tech="${t.name.toLowerCase()}"
    >
    ${index + 1}
    </button>
    `).join("\n");

  const buttons = Array.from(nav.querySelectorAll(".tech__slider-btn"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const name = e.currentTarget.dataset.tech;
      const activeTech = technology.find((t) => t.name.toLowerCase() === name);
      
      buttons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      e.currentTarget.classList.add("is-active");
      e.currentTarget.setAttribute("aria-pressed", "true");

      index = buttons.indexOf(e.currentTarget);
      window.location.hash = `technology/${name.replaceAll(" ", "-")}`;
      updateTechContent(activeTech);
    });
  });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      index = (index - 1 + technology.length) % technology.length;
    } else if (event.key === "ArrowRight") {
      index = (index + 1) % technology.length;
    } else {
      return;
    }

    buttons.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    buttons[index].classList.add("is-active");
    buttons[index].setAttribute("aria-pressed", "true");
    buttons[index].focus();
    updateTechContent(technology[index]);
  }, { signal: techSignal });
  updateTechContent(active);
}


function renderCrew(crew, activeName) {

  const active = crew.find(
    (c) => c.name.toLowerCase() === activeName?.toLowerCase()
  ) || crew[0];

  index = crew.indexOf(active);

  if (crewController) crewController.abort();
  crewController = new AbortController();
  const { signal: crewSignal } = crewController;

  const nav = document.querySelector(".crew__btn-container");

  nav.innerHTML = crew.map((c) => `
  <button
    class="tp-4 crew__btn${c === active ? " is-active" : ""}"
    aria-label="${c.name}"
    aria-pressed="${c === active}"
    data-name="${c.name.toLowerCase()}"
  >

  </button>
  `).join("\n");

  const buttons = Array.from(nav.querySelectorAll(".crew__btn"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const name = e.currentTarget.dataset.name;
      const member = crew.find((m) => m.name.toLowerCase() === name);

      buttons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      e.currentTarget.classList.add("is-active");
      e.currentTarget.setAttribute("aria-pressed", "true");

      index = buttons.indexOf(e.currentTarget);
      window.location.hash = `crew/${name.replaceAll(" ", "-")}`;
      updateCrewContent(member);
    });
  });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      index = (index - 1 + crew.length) % crew.length;
    } else if (event.key === "ArrowRight") {
      index = (index + 1) % crew.length;
    } else {
      return;
    }

    buttons.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    buttons[index].classList.add("is-active");
    buttons[index].setAttribute("aria-pressed", "true");
    buttons[index].focus();
    updateCrewContent(crew[index]);
  }, { signal: crewSignal });

  updateCrewContent(active);
}



function renderDestination(destinations, activeName) {
  const active = destinations.find(
    (d) => d.name.toLowerCase() === activeName?.toLowerCase()
  ) || destinations[0];

  index = destinations.indexOf(active);

  if (destController) destController.abort();
  destController = new AbortController();
  const { signal: destSignal } = destController;

  const nav = document.querySelector(".destinations__nav");

  nav.innerHTML = destinations.map((dest) => `
    <li>
      <a
        href="#destination/${dest.name.toLowerCase().replaceAll(" ", "-")}"
        class="tp-8 destinations__nav-link${dest === active ? " is-active" : ""}"
        data-destination="${dest.name.toLowerCase()}"
      >
        ${dest.name.toUpperCase()}
      </a>
    </li>
  `).join("\n");

  const indicator = document.createElement("div");
  indicator.className = "destinations__indicator";
  indicator.setAttribute("aria-hidden", "true");
  nav.appendChild(indicator);

  const links = Array.from(nav.querySelectorAll(".destinations__nav-link"));

  let indicatorVisible = false;
  let leaveTimeout = null;

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      clearTimeout(leaveTimeout);

      if (!indicatorVisible) {
        indicator.style.transition = "opacity 0.2s ease";
        positionDestIndicator(indicator, link, nav);
        indicator.style.opacity = "0.25";
        indicatorVisible = true;
        setTimeout(() => {
          indicator.style.transition = "transform 0.3s ease, width 0.3s ease, opacity 0.3s ease";
        }, 50);
      } else {
        positionDestIndicator(indicator, link, nav);
      }
    });

    link.addEventListener("click", (e) => {
      e.preventDefault();

      const name = e.currentTarget.dataset.destination;
      const dest = destinations.find((d) => d.name.toLowerCase() === name);

      links.forEach((l) => l.classList.remove("is-active"));
      e.currentTarget.classList.add("is-active");

      index = links.indexOf(e.currentTarget);
      window.location.hash = `destination/${name.replaceAll(" ", "-")}`;
      updateDestinationContent(dest);
    });
  });

  nav.addEventListener("mouseleave", () => {
    leaveTimeout = setTimeout(() => {
      indicator.style.opacity = "0";
      indicatorVisible = false;
    }, 1500);
  }, { signal: destSignal });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      index = (index - 1 + destinations.length) % destinations.length;
    } else if (event.key === "ArrowRight") {
      index = (index + 1) % destinations.length;
    } else {
      return;
    }

    links.forEach((l) => l.classList.remove("is-active"));
    links[index].classList.add("is-active");
    links[index].focus();

    const activeDestination = destinations[index];
    window.location.hash = `destination/${activeDestination.name.toLowerCase().replaceAll(" ", "-")}`;
    updateDestinationContent(activeDestination);
  }, { signal: destSignal });

  updateDestinationContent(active);
}

function updateDestinationContent(dest) {
  document.querySelector(".destinations__image-container img").src = dest.images.png;
  document.querySelector(".destination__content h2").textContent = dest.name.toUpperCase();
  document.querySelector(".destination__content .tp-9").textContent = dest.description;

  const stats = document.querySelectorAll(".destination__stat .tp-6");
  stats[0].textContent = dest.distance.toUpperCase();
  stats[1].textContent = dest.travel.toUpperCase();
}

function positionDestIndicator(indicator, link, nav) {
  const navRect = nav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  indicator.style.width = `${linkRect.width}px`;
  indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
}

function updateCrewContent(member) {
  document.querySelector(".crew__image img").src = member.images.png
  document.querySelector(".crew__name").textContent = member.name
  document.querySelector(".crew__bio").textContent = member.bio
  document.querySelector(".crew__title").textContent = member.role.toUpperCase()
}


function updateTechContent(tech) {
  if (window.innerWidth >= 1100) {
    document.querySelector(".tech__image img").src = tech.images.portrait;
  } else {
    document.querySelector(".tech__image img").src = tech.images.landscape;
  }
  document.querySelector(".tech__content-title").textContent = tech.name;
  document.querySelector(".tech__content-text").textContent = tech.description;

}