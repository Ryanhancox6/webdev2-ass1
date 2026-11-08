// ==========================================================
// about.js - JavaScript for the About page (about.html).
// Information about me is held in an object called ryan.
// ==========================================================

// ---------- Information about me, held in an object ----------
// Each property is a name : value pair. hobbies is an array inside the object.
let ryan = {
  firstName: "Ryan",
  lastName: "Hancox",
  course: "Creative Computing",
  year: "2nd",
  college: "SETU Waterford",
  hobbies: ["Films", "TV series", "Web design", "Gaming"]
};

// ---------- Show the object on the page ----------
// full name, joined with a space -> "Ryan Hancox"
document.querySelector("#fullName").textContent = ryan.firstName + " " + ryan.lastName;

// the photo's alt text uses the initials: charAt(0) gets the first letter of each name -> "RH"
document.querySelector(".profile-img").alt = "Photo of Ryan Hancox (" + ryan.firstName.charAt(0) + ryan.lastName.charAt(0) + ")";

// a sentence built from three properties with a template literal
document.querySelector("#courseInfo").textContent = `${ryan.year} year ${ryan.course} student, ${ryan.college}`;

// hobbies: forEach goes through the array and adds an <li> for each hobby
let hobbyList = "";
ryan.hobbies.forEach((hobby) => {
  hobbyList += `<li>${hobby}</li>`;
});
document.querySelector("#hobbies").innerHTML = hobbyList; // innerHTML because the string contains HTML tags

// ---------- FAQ: show and hide the answers ----------
// querySelectorAll returns a list of ALL matching elements.
// The 1st question goes with the 1st answer, the 2nd with the 2nd, and so on.
let questions = document.querySelectorAll(".question");
let answers = document.querySelectorAll(".answer");

// forEach gives each question and its position (0, 1, 2)
questions.forEach((question, position) => {
  question.addEventListener("click", () => {
    // toggle adds the class "show" if it's missing, or removes it if it's there.
    // style.css hides .answer and shows .answer.show
    answers[position].classList.toggle("show");
  });
});
