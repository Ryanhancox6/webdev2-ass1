// ==========================================================
// common.js - code that runs on all three pages.
// It fills in the footer, which is the same on every page.
// It is loaded after data.js and before the page's own file.
// ==========================================================

let today = new Date(); // a Date object holding the current date and time

// getFullYear() gives the 4-digit year, e.g. 2026, which goes into <span id="footerYear">
document.querySelector("#footerYear").textContent = today.getFullYear();

// toDateString() gives a short date, e.g. "Sat Nov 07 2026", which goes into <p id="footerDate">
document.querySelector("#footerDate").textContent = today.toDateString();
