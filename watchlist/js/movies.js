// ==========================================================
// movies.js - JavaScript for the My Watchlist page (movies.html).
// This is the Data Manipulation page. It can:
//   1. output the array of objects  -> displayMovies()
//   2. add a new object             -> addMovie()
//   3. delete an object             -> deleteMovie() (using the drop-down list)
//   4. search the array             -> searchMovies()
// It uses the movies array and makeStars() from data.js.
// ==========================================================

let nextId = 16; // the id the next added title gets (data.js already uses ids 1 to 15)

// ----------------------------------------------------------
// 1. OUTPUT THE ARRAY OF OBJECTS
// displayMovies(list) adds one row (a long box across the page)
// for each object in the array it is given to #movieCards. It is called when the
// page loads, and after every add, delete and search.
// ----------------------------------------------------------
const displayMovies = (list) => {
  let cardBox = document.querySelector("#movieCards"); // the <div> the rows go into
  cardBox.innerHTML = "";                              // empty it first so rows aren't shown twice

  if (list.length === 0) { // nothing to show (e.g. a search found nothing)
    cardBox.innerHTML = "<p>Nothing found.</p>";
  }

  // forEach runs the code inside once for every object in the list
  list.forEach((movie) => {
    // watched titles show stars and my review, unwatched ones show "Not reviewed yet"
    let statusText = "Unwatched";
    let reviewText = "Not reviewed yet.";

    if (movie.watched === true) {
      statusText = "Watched";
      reviewText = makeStars(movie.rating) + "<br>" + movie.review; // makeStars() is in data.js
    }

    // a template literal (backticks) lets me write HTML with ${} for the values.
    // the left side has the title and type, the right side has the review (see .card-left / .card-right in style.css)
    let card = `
      <div class="card">
        <div class="card-left">
          <h3>${movie.title}</h3>
          <p class="grey-text">${movie.type} - ${statusText}</p>
        </div>
        <div class="card-right">${reviewText}</div>
      </div>`;

    // insertAdjacentHTML adds the row at the end ("beforeend") of the box,
    // without replacing the rows that are already there
    cardBox.insertAdjacentHTML("beforeend", card);
  });

  showSummary(); // update the "Watched 12 of 15" line
};

// ----------------------------------------------------------
// fillDeleteList() puts one <option> for every title into the
// "Delete a title" drop-down. Each option's value is the
// movie's id, so deleteMovie() knows which object to remove.
// Called when the page loads and after every add or delete.
// ----------------------------------------------------------
const fillDeleteList = () => {
  let list = document.querySelector("#deleteChoice");
  list.innerHTML = ""; // empty the drop-down first

  movies.forEach((movie) => {
    list.insertAdjacentHTML("beforeend", `<option value="${movie.id}">${movie.title}</option>`);
  });
};

// ----------------------------------------------------------
// showSummary() counts the watched titles in the whole array
// and shows the percentage. Called at the end of displayMovies().
// ----------------------------------------------------------
const showSummary = () => {
  let watchedCount = 0;

  for (let movie of movies) {
    if (movie.watched === true) {
      watchedCount++; // ++ adds 1
    }
  }

  let percent = 0;
  if (movies.length > 0) {                                    // avoid dividing by 0
    percent = Math.round(watchedCount / movies.length * 100); // Math.round removes the decimals, e.g. 80
  }

  document.querySelector("#summary").textContent =
    `Watched ${watchedCount} of ${movies.length} titles (${percent}%)`;
};

// ----------------------------------------------------------
// 2. ADD A NEW OBJECT
// addMovie(event) runs when the add form is submitted.
// It reads and checks the form, then adds a new object to
// the movies array and redisplays the rows.
// ----------------------------------------------------------
const addMovie = (event) => {
  event.preventDefault(); // stop the form reloading the page

  let errorBox = document.querySelector("#addError");       // where error messages are shown
  errorBox.textContent = "";                                // clear any old error
  document.querySelector("#addMessage").textContent = "";   // and any old success message

  // text box: .value gets what was typed. trim() removes extra spaces
  let title = document.querySelector("#title").value.trim();

  // radio buttons: :checked finds the one that is picked, then .value gives "Film" or "Series"
  let type = document.querySelector('input[name="type"]:checked').value;

  // checkbox: .checked is true if ticked, false if not
  let watched = document.querySelector("#watched").checked;

  // select and textarea: .value
  let rating = document.querySelector("#rating").value;
  let review = document.querySelector("#review").value.trim();

  // ----- Validation: show a message and stop (return) if anything is wrong -----
  if (title.length === 0) {                     // is the title empty?
    errorBox.textContent = "Please enter a title.";
    return;
  }

  if (watched === true && review.length === 0) { // watched titles need a review
    errorBox.textContent = "Please write a short review.";
    return;
  }

  if (watched === false) {
    rating = 0;   // not watched, so no rating or review yet
    review = "";
  }

  // ----- Everything is valid, so build the new object -----
  // make the first letter a capital: "the godfather" -> "The godfather"
  title = title.charAt(0).toUpperCase() + title.substring(1);

  let newMovie = {
    id: nextId,
    title: title,
    type: type,
    watched: watched,
    rating: parseInt(rating),     // parseInt() turns the text "4" into the number 4
    review: review
  };

  nextId++;                                   // the next title will get a different id
  movies.push(newMovie);                      // push() adds the object to the end of the array
  displayMovies(movies);                      // redraw all the rows, including the new one
  fillDeleteList();                           // add the new title to the delete drop-down
  document.querySelector("#addForm").reset(); // empty the form (the checkbox goes back to ticked)
  toggleWatchedFields();                      // so show the rating and review boxes again
  document.querySelector("#addMessage").textContent = title + " was added."; // green success message
};

// when the add form is submitted, run addMovie
document.querySelector("#addForm").addEventListener("submit", addMovie);

// ----------------------------------------------------------
// toggleWatchedFields() shows the rating and review boxes
// when "I've watched it" is ticked, and hides them when not.
// It runs on the checkbox's "change" event.
// ----------------------------------------------------------
const toggleWatchedFields = () => {
  let fields = document.querySelector("#watchedFields");

  if (document.querySelector("#watched").checked === true) {
    fields.classList.remove("hidden"); // style.css hides anything with the class "hidden"
  } else {
    fields.classList.add("hidden");
  }
};

// "change" fires every time the checkbox is ticked or unticked
document.querySelector("#watched").addEventListener("change", toggleWatchedFields);

// ----------------------------------------------------------
// 3. DELETE AN OBJECT
// deleteMovie(event) runs when the delete form is submitted.
// It reads the id of the title chosen in the drop-down,
// finds that object in the array and removes it.
// ----------------------------------------------------------
const deleteMovie = (event) => {
  event.preventDefault(); // stop the form reloading the page

  let id = parseInt(document.querySelector("#deleteChoice").value); // the id of the chosen title

  // find the position of the object with this id, then remove it
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      let title = movies[i].title;                  // remember the title for the message
      if (confirm("Delete " + title + "?")) {       // confirm() returns true if OK is clicked
        movies.splice(i, 1);                        // splice(i, 1) removes 1 object at position i
        document.querySelector("#deleteMessage").textContent = title + " was deleted.";
      }
      break;                                        // found it, so stop the loop
    }
  }

  displayMovies(movies); // redraw the rows without the deleted one
  fillDeleteList();      // and take it out of the drop-down
};

// when the delete form is submitted, run deleteMovie
document.querySelector("#deleteForm").addEventListener("submit", deleteMovie);

// ----------------------------------------------------------
// 4. SEARCH THE ARRAY OF OBJECTS
// searchMovies() builds a new "results" array of the objects
// that match the title text and the watched / unwatched
// choice, and displays only those.
// ----------------------------------------------------------
const searchMovies = () => {
  // toLowerCase() so "DARK" still finds "The Dark Knight"
  let text = document.querySelector("#searchText").value.trim().toLowerCase();
  let status = document.querySelector("#searchStatus").value; // "All", "watched" or "unwatched"

  let results = []; // matching objects are pushed into this new array

  for (let movie of movies) {
    // includes() checks if the title contains the text (an empty box matches everything)
    let titleMatches = movie.title.toLowerCase().includes(text);

    // status matches if "All" was picked, or if it lines up with the watched value
    let statusMatches = status === "All" ||
                        (status === "watched" && movie.watched === true) ||
                        (status === "unwatched" && movie.watched === false);

    if (titleMatches && statusMatches) {
      results.push(movie);
    }
  }

  displayMovies(results); // show only the matching objects
  document.querySelector("#searchMessage").textContent = "Titles found: " + results.length;
};

// search when the Search button is clicked (the form is submitted)
document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault(); // stop the form reloading the page
  searchMovies();
});

// "keyup" fires each time a key is let go, so the results update while typing
document.querySelector("#searchText").addEventListener("keyup", searchMovies);

// "change" fires when a different option is picked in the drop-down
document.querySelector("#searchStatus").addEventListener("change", searchMovies);

// "Show all" clears the search and shows the whole array again
document.querySelector("#showAllBtn").addEventListener("click", () => {
  document.querySelector("#searchForm").reset();
  document.querySelector("#searchMessage").textContent = "";
  displayMovies(movies);
});

// ----------------------------------------------------------
// When the page first loads, show every object in the array
// ----------------------------------------------------------
displayMovies(movies);
fillDeleteList();
console.log("Watchlist loaded with " + movies.length + " titles"); // a message for testing in the browser console (F12)
