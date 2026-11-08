let nextId = 16;

const displayMovies = (list) => {
  let cardBox = document.querySelector("#movieCards");
  cardBox.innerHTML = "";

  if (list.length === 0) {
    cardBox.innerHTML = "<p>Nothing found.</p>";
  }

  list.forEach((movie) => {
    let statusText = "Unwatched";
    let reviewText = "Not reviewed yet.";

    if (movie.watched === true) {
      statusText = "Watched";
      reviewText = makeStars(movie.rating) + "<br>" + movie.review;
    }

    let card = `
      <div class="card">
        <div class="card-left">
          <h3>${movie.title}</h3>
          <p class="grey-text">${movie.type} - ${statusText}</p>
        </div>
        <div class="card-right">${reviewText}</div>
      </div>`;

    cardBox.insertAdjacentHTML("beforeend", card);
  });

  showSummary();
};

const fillDeleteList = () => {
  let list = document.querySelector("#deleteChoice");
  list.innerHTML = "";

  movies.forEach((movie) => {
    list.insertAdjacentHTML("beforeend", `<option value="${movie.id}">${movie.title}</option>`);
  });
};

const showSummary = () => {
  let watchedCount = 0;

  for (let movie of movies) {
    if (movie.watched === true) {
      watchedCount++;
    }
  }

  let percent = 0;
  if (movies.length > 0) {
    percent = Math.round(watchedCount / movies.length * 100);
  }

  document.querySelector("#summary").textContent =
    `Watched ${watchedCount} of ${movies.length} titles (${percent}%)`;
};

const addMovie = (event) => {
  event.preventDefault();

  let errorBox = document.querySelector("#addError");
  errorBox.textContent = "";
  document.querySelector("#addMessage").textContent = "";

  let title = document.querySelector("#title").value.trim();

  let type = document.querySelector('input[name="type"]:checked').value;

  let watched = document.querySelector("#watched").checked;

  let rating = document.querySelector("#rating").value;
  let review = document.querySelector("#review").value.trim();

  if (title.length === 0) {
    errorBox.textContent = "Please enter a title.";
    return;
  }

  if (watched === true && review.length === 0) {
    errorBox.textContent = "Please write a short review.";
    return;
  }

  if (watched === false) {
    rating = 0;
    review = "";
  }

  title = title.charAt(0).toUpperCase() + title.substring(1);

  let newMovie = {
    id: nextId,
    title: title,
    type: type,
    watched: watched,
    rating: parseInt(rating),
    review: review
  };

  nextId++;
  movies.push(newMovie);
  displayMovies(movies);
  fillDeleteList();
  document.querySelector("#addForm").reset();
  toggleWatchedFields();
  document.querySelector("#addMessage").textContent = title + " was added.";
};

document.querySelector("#addForm").addEventListener("submit", addMovie);

const toggleWatchedFields = () => {
  let fields = document.querySelector("#watchedFields");

  if (document.querySelector("#watched").checked === true) {
    fields.classList.remove("hidden");
  } else {
    fields.classList.add("hidden");
  }
};

document.querySelector("#watched").addEventListener("change", toggleWatchedFields);

const deleteMovie = (event) => {
  event.preventDefault();

  let id = parseInt(document.querySelector("#deleteChoice").value);

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      let title = movies[i].title;
      if (confirm("Delete " + title + "?")) {
        movies.splice(i, 1);
        document.querySelector("#deleteMessage").textContent = title + " was deleted.";
      }
      break;
    }
  }

  displayMovies(movies);
  fillDeleteList();
};

document.querySelector("#deleteForm").addEventListener("submit", deleteMovie);

const searchMovies = () => {
  let text = document.querySelector("#searchText").value.trim().toLowerCase();
  let status = document.querySelector("#searchStatus").value;

  let results = [];

  for (let movie of movies) {
    let titleMatches = movie.title.toLowerCase().includes(text);

    let statusMatches = status === "All" ||
                        (status === "watched" && movie.watched === true) ||
                        (status === "unwatched" && movie.watched === false);

    if (titleMatches && statusMatches) {
      results.push(movie);
    }
  }

  displayMovies(results);
  document.querySelector("#searchMessage").textContent = "Titles found: " + results.length;
};

document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  searchMovies();
});

document.querySelector("#searchText").addEventListener("keyup", searchMovies);

document.querySelector("#searchStatus").addEventListener("change", searchMovies);

document.querySelector("#showAllBtn").addEventListener("click", () => {
  document.querySelector("#searchForm").reset();
  document.querySelector("#searchMessage").textContent = "";
  displayMovies(movies);
});

displayMovies(movies);
fillDeleteList();
console.log("Watchlist loaded with " + movies.length + " titles");
