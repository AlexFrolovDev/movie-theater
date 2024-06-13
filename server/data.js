const fs = require("fs");
let SEATS = 100;

let MOVIES = [];
let SCHEDULED = [];
let ORDERS = [];

const saveToFile = (entity) => {
  try {
    switch (entity) {
      case "movies":
        fs.writeFileSync(
          "./data/movies.json",
          JSON.stringify(MOVIES),
          () => {}
        );
        return;
      case "scheduled":
        fs.writeFileSync(
          "./data/scheduled.json",
          JSON.stringify(SCHEDULED),
          () => {}
        );
        return;
      case "orders":
        fs.writeFileSync(
          "./data/orders.json",
          JSON.stringify(ORDERS),
          () => {}
        );
        return;
    }
  } catch (e) {
    console.log(e);
  }
};

const readFromFile = (entity) => {
  try {
    const parsed = JSON.parse(
      fs.readFileSync(`./data//${entity.toLowerCase()}.json`)
    );
    return parsed;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getMovies = () => MOVIES;
const setMovies = (movies) => {
  MOVIES = movies;
  saveToFile("movies");
};
const addMovie = (movie) => {
  MOVIES.unshift(movie);
  saveToFile("movies");
};
const editMovie = (movie) => {
  MOVIES.forEach((_movie, idx) => {
    if (_movie.id === movie.id) {
      MOVIES[idx] = { ...movie };
      return;
    }
  });
  saveToFile("movies");
};
const removeMovie = (movieId) => {
    const movies = MOVIES.filter((_movie) => _movie.id !== movieId);
  setMovies(movies);
  saveToFile("movies");

  return movies;
};

const getScheduled = () => SCHEDULED;
const setScheduled = (scheduled) => {
  SCHEDULED = scheduled;
  saveToFile("scheduled");
};
const addScheduled = (scheduled) => {
  SCHEDULED.push(scheduled);
  saveToFile("scheduled");
};
const editScheduled = (scheduled) => {
  SCHEDULED.forEach((_scheduled, idx) => {
    if (_scheduled.id === scheduled.id) {
      SCHEDULED[idx] = { ...scheduled };
      return;
    }
  });
  saveToFile("scheduled");
};
const removeScheduled = (id) => {
  setScheduled(
    SCHEDULED.filter((_scheduled) => _scheduled.id !== id)
  );
  saveToFile("scheduled");
};

const setOrders = (orders) => {
  ORDERS = orders;
  saveToFile("orders");
};

const getOrders = () => ORDERS;

const addOrder = (order) => {
  ORDERS.push(order);
  saveToFile("orders");
};
const removeOrder = (ids = []) => {
  ORDERS = ORDERS.filter((order) => !ids.includes(order.id));
  saveToFile("orders");
};

module.exports = {
  saveToFile,
  readFromFile,
  getMovies,
  setMovies,
  addMovie,
  editMovie,
  removeMovie,
  getScheduled,
  setScheduled,
  addScheduled,
  editScheduled,
  removeScheduled,
  setOrders,
  getOrders,
  addOrder,
  removeOrder,
};
