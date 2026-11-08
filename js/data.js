// ==========================================================
// data.js - the data for the whole website.
// This file is loaded FIRST on the Welcome and My Watchlist
// pages, so the movies array and makeStars() can be used by
// home.js and movies.js.
// ==========================================================

// movies is an array of objects. Each object is one film or TV series.
// I use "let" (not const) because movies.js adds and deletes items.
let movies = [
  {
    id: 1,                       // a unique number, used to find the object when deleting it
    title: "The Dark Knight",    // the name shown on the card
    type: "Film",                // "Film" or "Series"
    watched: true,               // true = I've watched it, false = still to watch
    rating: 5,                   // my rating out of 5 (0 if not watched yet), turned into stars by makeStars()
    review: "Heath Ledger's Joker makes this the best superhero film ever made." // my short review
  },
  { id: 2, title: "Fight Club", type: "Film", watched: true, rating: 5, review: "Dark, clever and the twist still gets me every time." },
  { id: 3, title: "Django Unchained", type: "Film", watched: true, rating: 4, review: "Classic Tarantino - brilliant dialogue and a great soundtrack." },
  { id: 4, title: "Sinners", type: "Film", watched: false, rating: 0, review: "" },
  { id: 5, title: "Your Name", type: "Film", watched: false, rating: 0, review: "" },
  { id: 6, title: "Back to the Future", type: "Film", watched: true, rating: 5, review: "A perfect, fun film that never gets old." },
  { id: 7, title: "Joker", type: "Film", watched: true, rating: 4, review: "Uncomfortable to watch, but Joaquin Phoenix is incredible." },
  { id: 8, title: "The Wolf of Wall Street", type: "Film", watched: true, rating: 4, review: "Crazy, loud and really funny for a three-hour film." },
  { id: 9, title: "Jurassic Park", type: "Film", watched: true, rating: 5, review: "The dinosaurs still look amazing over 30 years later." },
  { id: 10, title: "Breaking Bad", type: "Series", watched: true, rating: 5, review: "The best TV series I've ever watched, start to finish." },
  { id: 11, title: "The Walking Dead", type: "Series", watched: false, rating: 0, review: "" },
  { id: 12, title: "The Office", type: "Series", watched: true, rating: 5, review: "My go-to comfort show. Michael Scott is a legend." },
  { id: 13, title: "SpongeBob SquarePants", type: "Series", watched: true, rating: 4, review: "Grew up on it and it's still funny now." },
  { id: 14, title: "Two and a Half Men", type: "Series", watched: true, rating: 3, review: "Good for a laugh, but the early seasons are the best." },
  { id: 15, title: "The Boys", type: "Series", watched: true, rating: 4, review: "A violent, funny take on superheroes. Homelander is terrifying." }
];

// ----------------------------------------------------------
// makeStars(rating)
// Turns a rating number into stars, e.g. 3 -> "★★★☆☆".
// Used on the movie cards on the My Watchlist page.
// ----------------------------------------------------------
const makeStars = (rating) => {
  let stars = "";                 // start with an empty string and add one star at a time

  for (let i = 1; i <= 5; i++) {  // loop 5 times, once for each star position
    if (i <= rating) {
      stars = stars + "★";        // a full star for each point of the rating
    } else {
      stars = stars + "☆";        // an empty star for the rest
    }
  }

  return stars;                   // send the finished string back to whoever called the function
};
