let now = new Date();
let hour = now.getHours();
let greeting = "";

if (hour < 12) {
  greeting = "Good morning!";
} else if (hour < 18) {
  greeting = "Good afternoon!";
} else {
  greeting = "Good evening!";
}

document.querySelector("#greeting").textContent = greeting;

document.querySelector("#todayText").textContent = "Today is " + now.toDateString();

const pickRandom = () => {
  let position = Math.floor(Math.random() * movies.length);
  let pick = movies[position];

  document.querySelector("#randomTitle").textContent = pick.title.toUpperCase() + " (" + pick.type + ")";
};

document.querySelector("#randomBtn").addEventListener("click", pickRandom);
