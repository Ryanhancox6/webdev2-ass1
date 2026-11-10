let movies = [
  {
    id: 1,
    title: "The Dark Knight",
    type: "Film",
    watched: true,
    rating: 5,
    review: "Heath Ledger's Joker makes this the best superhero film ever made."
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

const makeStars = (rating) => {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars = stars + "★";
    } else {
      stars = stars + "☆";
    }
  }

  return stars;
};
