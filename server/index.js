const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
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
      const dbMovies = MovieModel.find({});
      if (dbMovies.length === 0) {
        data.forEach((movie) => {
          const newMovie = new MovieModel({
            title: movie.title,
            plot: movie.plot,
            poster: movie.poster,
            duration: movie.runtime,
          });
          newMovie.save();
        });
      }
    });
};

apiRouter.get("/movies/scheduled", async (req, res) => {
  const { order = "desc", from = new Date().getTime(), to } = req.query;

  const filterObj = {
    from: {
      $gte: from,
    },
    movie: {
      $exists: true,
    },
  };
  if (to && !isNaN(Number(to))) {
    filterObj.to = {
      $lte: to,
    };
  }

  const movies = await ScheduleModel.find({ ...filterObj }, null, {
    sort: { from: order === "desc" ? -1 : 1 },
  }).populate("movie");

  res.send(movies);
});

apiRouter.get("/movies/scheduled/:id", async (req, res) => {
  const schedule = await ScheduleModel.findOne({
    _id: req.params.id,
    movie: { $exists: true },
  }).populate("movie");

  if (!schedule) {
    res.sendStatus(404);
    return;
  }

  res.send(schedule);
});

apiRouter.get("/movies/list", async (req, res) => {
  const movies = await MovieModel.find({});
  res.send({
    movies,
  });
});

apiRouter.get("/movies/:movieId", async (req, res) => {
  const movie = await MovieModel.findOne({ _id: req.params.movieId });

  res.send(movie);
});

apiRouter.put("/movies/", async (req, res) => {
  await MovieModel.updateOne(
    { _id: req.body.movie?._id },
    { ...req.body.movie }
  );
  res.sendStatus(200);
});

apiRouter.post("/movies", async (req, res) => {
  const { movie } = req.body;
  const newMovie = new MovieModel({
    title: movie.title,
    plot: movie.plot,
    poster: movie.poster,
    duration: movie.runtime || movie.duration,
  });
  await newMovie.save();

  res.sendStatus(200);
});

apiRouter.delete("/movies/:movieId", async (req, res) => {
  await MovieModel.deleteOne({ _id: req.params.movieId });
  const movies = await MovieModel.find({});
  res.send(movies);
});

apiRouter.get("/schedules", async (req, res) => {
  const schedules = await ScheduleModel.find({});

  res.send(schedules);
});

apiRouter.post("/schedules", async (req, res) => {
  const { movieId, from, to } = req.body;

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
          return (from < s.from && to < s.from) || (from > s.to && to > s.to);
        })
      : true;

  res.send(overlaps);
});

apiRouter.post("/order", async (req, res) => {
  const { scheduleId, seatIdx } = req.body;

  const doc = await ScheduleModel.findOne({ _id: scheduleId });

  if (doc) {
    doc.seats[seatIdx] = false;
    await doc.save();
  }

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
