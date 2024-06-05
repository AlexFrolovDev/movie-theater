const express = require("express");
const cors = require("cors");

const PORT = 3030;

const app = express();

app.use(cors());

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

apiRouter.get("/movies/list", (req, res) => {
  fetch("https://freetestapi.com/api/v1/movies")
    .then((response) => response.json())
    .then((data) => {
      res.send({
        movies: data,
      });
    });
});
apiRouter.get("/movies/scheduled-list", (req, res) => {});
apiRouter.get("/movies/:movieId", (req, res) => {});
apiRouter.put("/movies/:movieId", (req, res) => {});
apiRouter.post("/movies/:movieId", (req, res) => {});
apiRouter.delete("/movies/:movieId", (req, res) => {});
apiRouter.post("/movies/seat/:movieId/:seatIndex", (req, res) => {});

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
});
