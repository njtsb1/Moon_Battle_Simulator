# Building a Battle Simulator with Lua

Project developed during the Bootcamp Lua Developer Training, under the guidance of specialist [Rafael Skoberg](https://github.com/rafaskb "Rafael Skoberg").
Building a battle simulator using multiple Lua scripts as modules, an infinite logic loop, and an action window for the user to make decisions and alter the course of the battle.

## Features

- **Dark mode** by default with a light mode toggle (moon/sun icons).
- **Multilanguage**: English (EN-US) default, Português (PT-BR) and Español (ES).
- **Accessible**: semantic HTML, keyboard operable, `aria-live` battle log.
- **Responsive**: works on desktop, tablet and smartphone.
- **No build tools required** — just open `index.html`.

## Technologies Used

- **HTML** — main markup (semantic and accessible).
- **CSS**** — styling with CSS variables and responsive layout.
- **JavaScript** — game logic, i18n, theme toggle and UI updates.

## How to run

1. Open `index.html` in your browser (double-click or `File → Open`).
2. Use the language selector and theme toggle in the header.
3. Click actions to play. The battle log is updated live.

## Accessibility notes

- All interactive elements are keyboard accessible.
- The battle log uses `aria-live="polite"` to announce updates.
- Color contrast is considered for dark and light themes.
- Semantic elements (`header`, `main`, `section`, `footer`) are used.

## Customization

- Edit `i18n` object in `script.js` to change texts or add languages.
- Adjust stats in `script.js` `state` object to tune difficulty.

[LICENSE](/LICENSE)
