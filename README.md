# Frontend Mentor - Space tourism website solution

This is a solution to the [Space tourism website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each of the website's pages depending on their device's screen size
- See hover states for all interactive elements on the page
- View each page and be able to toggle between the tabs to see new information

### Screenshot

![](./starter-code/screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid (named lines, full-bleed pattern)
- Flexbox
- Mobile-first workflow
- Vanilla JavaScript (ES Modules)
- Client-side routing with hash navigation
- JSON data loading

### What I learned

**CSS Grid with named lines and full-bleed pattern**

I learned how to build a grid that keeps content within a controlled area while allowing specific elements to intentionally break out of it:

```css
grid-template-columns:
  [breakout-start] 165px
  [content-start] repeat(12, 1fr)
  [content-end] 165px
  [breakout-end];
```

**Calculating `clamp()` manually**

Instead of guessing values I learned how to calculate `clamp()` using linear interpolation between two breakpoints:

```
slope  = (max-value - min-value) / (max-bp - min-bp) × 100 = xvw
offset = min-value - (slope × min-bp / 100)
```

```css
font-size: clamp(1.25rem, 12.65vw - 55.15px, 1.75rem);
```

**Magic line navigation with `getBoundingClientRect()`**

A sliding hover indicator that animates between nav links — no framework needed:

```js
function positionIndicator(indicator, link) {
  const drawerRect = drawer.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  indicator.style.width = `${linkRect.width}px`;
  indicator.style.transform = `translateX(${linkRect.left - drawerRect.left}px)`;
}
```

**Rendering dynamic HTML from JSON data**

Page content is loaded from a JSON file and written into the DOM using template literals, cleanly separating structure from content.

**`:has()` as a parent selector**

```css
.tech__grid:has([data-tech="space capsule"].is-active) .tech__image img {
  object-position: center 80%;
}
```

### Continued development

In my next project I want to focus more on:

- **Page layout vs. component layout** — the difference between a grid that structures the entire page and a grid that organises individual components internally became clearer during this project, but I want to apply that distinction consistently from the start
- **Grid-first thinking** — less relying on Flexbox as a fallback, planning layouts with Grid from the beginning
- **Working with external data** — getting more comfortable with JSON loading, async rendering, and the state challenges that come with it

### AI Collaboration

I used Claude Code (Anthropic) as a sparring partner — not to generate finished code, but for:

- Explaining concepts (e.g. how `clamp()` works mathematically)
- Debugging when things didn't behave as expected
- Discussing CSS approaches and weighing alternatives
- Implementing JS features that were new to me (magic line, client-side routing)

The learning effect was high because I had to understand each concept myself before applying it.

## Author

- Frontend Mentor - [@D0bbysocks](https://www.frontendmentor.io/profile/D0bbysocks)
