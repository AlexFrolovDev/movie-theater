const { v4: uuid4 } = require("uuid");

let SEATS = 100;

let MOVIES = [];
let SCHEDULED = [];
let ORDERS = [];

const getMovies = () => MOVIES;
const setMovies = (movies) => (MOVIES = movies);
const addMovie = (movie) => MOVIES.push(movie);
const editMovie = (movie) => {
  MOVIES.forEach((_movie, idx) => {
    if (_movie.id === movie.id) {
      MOVIES[idx] = { ...movie };
      return;
    }
  });
};
const removeMovie = (movie) =>
  setMovies(MOVIES.filter((_movie) => _movie.id !== movie.id));

const setScheduled = (scheduled) => (SCHEDULED = scheduled);
const addScheduled = (scheduled) => SCHEDULED.push(scheduled);
const editScheduled = (scheduled) => {
  SCHEDULED.forEach((_scheduled) => {
    if (_scheduled.id === scheduled.id) {
      _scheduled = { ...scheduled };
    }
  });
};
const removeScheduled = (scheduled) =>
  setScheduled(
    SCHEDULED.filter((_scheduled) => _scheduled.id !== scheduled.id)
  );

const setOrders = (orders) => (ORDERS = orders);
const addOrder = (order) => ORDERS.push(order);

module.exports = {
  getMovies,
  setMovies,
  addMovie,
  editMovie,
  removeMovie,
  setScheduled,
  addScheduled,
  editScheduled,
  removeScheduled,
  setOrders,
  addOrder,
};
