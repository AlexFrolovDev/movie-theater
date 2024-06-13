const express = require("express");
const cors = require("cors");
const { v4: uuid4 } = require("uuid");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const {
  setMovies,
  getMovies,
  editMovie,
  removeMovie,
  addMovie,
  getScheduled,
  addScheduled,
  setScheduled,
  readFromFile,
  editScheduled,
  setOrders,
  addOrder,
  getOrders,
  removeScheduled,
  removeOrder,
} = require("./data");
const { MovieModel, ScheduleModel } = require("./models");

const PORT = 3030;
const dbUrl = process.env.MONGO_DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();

app.use(cors());
app.use(bodyparser.json({ limit: "50mb" }));

const apiRouter = express.Router();

const loadMovies = () => {
  fetch("https://freetestapi.com/api/v1/movies")
    .then((response) => response.json())
    .then(async (data) => {
      setMovies(data.map((movie) => ({ ...movie, id: uuid4() })));
      const dbMovies = MovieModel.find({});
      if (dbMovies.length === 0) {
        data.forEach((movie) => {
          const newMovie = new MovieModel({
            title: movie.title,
            plot: movie.plot,
            poster: movie.poster,
            duration: movie.runtime,
          });
          newMovie.save().then((response) => {
            console.log(response);
          });
        });
      }
      setOrders([]);
      setScheduled([]);
    });
};

apiRouter.get("/movies/scheduled", (req, res) => {
  const { order = "desc", from = new Date().getTime(), to } = req.query;
  console.log(order, from, to);
  const movies = getMovies();
  const schedules = getScheduled();
  let filtered = schedules
    .filter((schedule) => {
      return !!movies.find((movie) => movie.id === schedule.movieId);
    })
    .map((schedule) => {
      const movie = movies.find((movie) => movie.id === schedule.movieId);
      return {
        ...schedule,
        scheduleId: schedule.id,
        ...movie,
      };
    });

  filtered.sort((a, b) => {
    if (a.from > b.from) return 1;
    if (a.from < b.from) return -1;

    return 0;
  });

  if (order === "desc") {
    filtered = filtered.reverse();
  }

  if (to) {
    const fromTs = new Date(from).getTime();
    const toTs = new Date(to).getTime();
    filtered = filtered.filter((item) => {
      return item.from >= fromTs && item.from < toTs;
    });
  }

  res.send(filtered);
});

apiRouter.get("/movies/scheduled/:id", (req, res) => {
  console.log(req.params.id);
  const schedules = getScheduled();
  console.log(schedules.length);
  const schedule = schedules.find((schedule) => {
    console.log(schedule.id);
    return schedule.id === req.params.id;
  });

  const movie = getMovies().find((movie) => movie.id === schedule.movieId);

  if (!schedule || !movie) {
    res.sendStatus(400);
    return;
  }

  res.send({
    ...schedule,
    movie,
  });
});

apiRouter.get("/movies/list", async (req, res) => {
  console.log("movies count: ", getMovies().length);
  const movies = await MovieModel.find({});
  res.send({
    movies,
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
  const { movie } = req.body;
  const newMovie = new MovieModel({
    title: movie.title,
    plot: movie.plot,
    poster: movie.poster,
    duration: movie.runtime,
  });
  newMovie.save().then((response) => {
    console.log(response);
  });
  res.sendStatus(200);
});
apiRouter.delete("/movies/:movieId", async (req, res) => {
  await MovieModel.deleteOne({ _id: req.params.movieId });
  const movies = await MovieModel.find({});
  res.send(movies);
});
apiRouter.get("/movies/schedule/:movieId", (req, res) => {});
apiRouter.post("/movies/seat/:movieId/:seatIndex", (req, res) => {});

apiRouter.get("/schedules", async (req, res) => {
  const { movieIds = [], sort } = req.query;
  /* const movies = getMovies();
  const schedules = getScheduled().filter((_schedule) => {
    if (!movies.find((movie) => movie.id === _schedule.movieId)) return false;

    return movieIds.length ? movieIds.includes(_schedule.movieId) : true;
  }); */

  const schedules = await ScheduleModel.find({});

  res.send(schedules);
});
apiRouter.post("/schedules", async (req, res) => {
  const { movieId, from, to } = req.body;
  /* addScheduled({
    movieId,
    from,
    to,
    id: uuid4(),
    seats: new Array(100).fill(true),
  }); */

  const newSchedule = new ScheduleModel({
    from,
    to,
    seats: new Array(100).fill(true),
    movie: movieId,
  });
  await newSchedule.save();
  const schedules = await ScheduleModel.find({});

  res.send(schedules);
});

apiRouter.delete("/schedules", async (req, res) => {
  const { id } = req.body;
  /* removeScheduled(id);
  const orders = getOrders()
    .filter((order) => order.scheduleId === id)
    .map((order) => order.id);
  removeOrder(orders); */
  await ScheduleModel.deleteOne({ _id: id });
  const schedules = await ScheduleModel.find({});

  res.send(schedules);
});

apiRouter.get("/schedules/check-availability", async (req, res) => {
  const { from, to } = req.query;
  const schedules = await ScheduleModel.find({});
  const overlaps =
    schedules.length > 0
      ? schedules.some((s) => {
          console.log(from, to, s.from, s.to);
          return (from < s.from && to < s.from) || (from > s.to && to > s.to);
        })
      : true;

  res.send(overlaps);
});

apiRouter.post("/order", (req, res) => {
  const { scheduleId, seatIdx } = req.body;
  const schedule = getScheduled().find((_schedule) => {
    return _schedule.id === scheduleId;
  });
  if (!schedule || !schedule.seats[seatIdx]) {
    res.sendStatus(400);
    return;
  }

  schedule.seats[parseInt(seatIdx)] = false;
  editScheduled(schedule);

  const order = {
    id: uuid4().toString(),
    scheduleId,
    seat: seatIdx,
  };
  addOrder(order);

  res.sendStatus(200);
});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
  loadMovies();
});
