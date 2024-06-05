const express = require("express");
const cors = require("cors");

const PORT = 3030;

const app = express();

app.use(cors());

const apiRouter = express.Router();

apiRouter.get("/movies/list", (req, res) => {});
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
