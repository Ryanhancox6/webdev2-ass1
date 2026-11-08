// ==========================================================
// home.js - JavaScript for the Welcome page (index.html).
// It uses the movies array from data.js, which is loaded
// before this file.
// ==========================================================

// ---------- 1. Greeting based on the time of day (Date object) ----------
let now = new Date();       // a Date object holding the current date and time
let hour = now.getHours();  // getHours() gives the hour from 0 to 23
let greeting = "";          // will hold the greeting text

if (hour < 12) {            // before 12 noon
  greeting = "Good morning!";
} else if (hour < 18) {     // 12 noon until 6pm
  greeting = "Good afternoon!";
} else {                    // 6pm or later
  greeting = "Good evening!";
}

document.querySelector("#greeting").textContent = greeting; // put the greeting into <p id="greeting">

// ---------- 2. Today's date ----------
// toDateString() gives a short date, e.g. "Sat Nov 07 2026"
document.querySelector("#todayText").textContent = "Today is " + now.toDateString();

// ---------- 3. Random pick (Math object + click event) ----------
// pickRandom runs when the "Pick for me" button is clicked
const pickRandom = () => {
  // Math.random() gives a decimal from 0 up to 1. Multiplying by the number of
  // movies and rounding down with Math.floor gives a position in the array (0 to 14)
  let position = Math.floor(Math.random() * movies.length);
  let pick = movies[position]; // the randomly chosen object

  // show the title in capitals using the string method toUpperCase()
  document.querySelector("#randomTitle").textContent = pick.title.toUpperCase() + " (" + pick.type + ")";
};

// when the button is clicked, run pickRandom
document.querySelector("#randomBtn").addEventListener("click", pickRandom);
