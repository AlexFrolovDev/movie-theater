const express = require("express");
const cors = require("cors");
const { v4: uuid4 } = require("uuid");
const bodyparser = require("body-parser");
const {
  setMovies,
  getMovies,
  editMovie,
  removeMovie,
  addMovie,
  getScheduled,
  addScheduled,
  setScheduled,
} = require("./data");

const PORT = 3030;

const app = express();

app.use(cors());
app.use(bodyparser.json({ limit: "50mb" }));

const apiRouter = express.Router();

const MOCK = {
  movies: [
    {
      id: "1",
      title: "Movie 1",
      description: "Awesome movie",
      poster: "movie1.png",
    },
  ],
};

const loadMovies = () => {
  fetch("https://freetestapi.com/api/v1/movies")
    .then((response) => response.json())
    .then((data) => {
      setMovies(data.map((movie) => ({ ...movie, id: uuid4() })));
    });
};

apiRouter.get("/movies/scheduled", (req, res) => {
  const movies = getMovies();
  const schedules = getScheduled();
  res.send(
    schedules.map((schedule) => {
      const movie = movies.find((movie) => movie.id === schedule.movieId);
      return {
        ...schedule,
        scheduleId: schedule.id,
        ...movie,
      };
    })
    /* .filter(
        (schedule) => new Date(schedule.from).getTime() > new Date().getTime()
      ) */
  );
});

apiRouter.get("/movies/scheduled/:id", (req, res) => {
  console.log(req.params.id);
  const schedule = getScheduled().find(
    (schedule) => schedule.id === req.params.id
  );

  const movie = getMovies().find((movie) => movie.id === schedule.movieId);

  res.send({
    ...schedule,
    movie,
  });
});

apiRouter.get("/movies/list", (req, res) => {
  console.log("movies count: ", getMovies().length);
  res.send({
    movies: getMovies(),
  });
});
apiRouter.get("/movies/scheduled-list", (req, res) => {});
apiRouter.get("/movies/:movieId", (req, res) => {
  const movie = getMovies().find(
    (movie) => movie.id.toString() !== req.params.movieId.toString()
  );

  res.send(movie);
});
apiRouter.put("/movies/", (req, res) => {
  editMovie(req.body.movie);
  res.sendStatus(200);
});
apiRouter.post("/movies", (req, res) => {
  addMovie({ ...req.body.movie, id: uuid4() });
  console.log("movies count: ", getMovies().length);
  res.sendStatus(200);
});
apiRouter.delete("/movies/:movieId", (req, res) => {
  res.send(removeMovie(req.params.movieId));
});
apiRouter.get("/movies/schedule/:movieId", (req, res) => {});
apiRouter.post("/movies/seat/:movieId/:seatIndex", (req, res) => {});

apiRouter.get("/schedules", (req, res) => {
  const { movieIds = [], sort } = req.query;
  const schedules = getScheduled().filter((_schedule) => {
    return movieIds.length ? movieIds.includes(_schedule.movieId) : true;
  });

  res.send(schedules);
});
apiRouter.post("/schedules", (req, res) => {
  const { movieId, from, to } = req.body;
  addScheduled({ movieId, from, to, id: uuid4() });

  res.send(getScheduled());
});

apiRouter.get("/schedules/check-availability", (req, res) => {
  const { from: _from, to: _to } = req.query;
  const overlaps = getScheduled().some(({ from, to }) => {
    const startDate = new Date(from);
    const endDate = new Date(to);

    return (_from > from && _from < end) || (_to > from && _to < end);
  });

  res.send(!overlaps);
});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
  loadMovies();
});
