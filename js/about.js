let ryan = {
  firstName: "Ryan",
  lastName: "Hancox",
  course: "Creative Computing",
  year: "2nd",
  college: "SETU Waterford",
  hobbies: ["Films", "TV series", "Web design", "Gaming"]
};

document.querySelector("#fullName").textContent = ryan.firstName + " " + ryan.lastName;

document.querySelector(".profile-img").alt = "Photo of Ryan Hancox (" + ryan.firstName.charAt(0) + ryan.lastName.charAt(0) + ")";

document.querySelector("#courseInfo").textContent = `${ryan.year} year ${ryan.course} student, ${ryan.college}`;

let hobbyList = "";
ryan.hobbies.forEach((hobby) => {
  hobbyList += `<li>${hobby}</li>`;
});
document.querySelector("#hobbies").innerHTML = hobbyList;

let questions = document.querySelectorAll(".question");
let answers = document.querySelectorAll(".answer");

questions.forEach((question, position) => {
  question.addEventListener("click", () => {
    answers[position].classList.toggle("show");
  });
});
