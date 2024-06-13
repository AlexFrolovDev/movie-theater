const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.MovieSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: {
    type: String,
    min: 1,
    max: 255,
  },
  plot: {
    type: String,
    min: 1,
    max: 255,
  },
  duration: {
    type: Schema.Types.Number,
    min: 1,
  },
  poster: String,
});

module.exports.MovieModel = mongoose.model("Movie", MovieSchema);

module.exports.ScheduleSchema = new Schema({
  id: Schema.Types.ObjectId,
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  from: Schema.Types.Number,
  to: Schema.Types.Number,
  seats: [Schema.Types.Boolean],
});

module.exports.ScheduleModel = mongoose.model("Schedule", ScheduleSchema);

module.exports.OrderSchema = new Schema({
  id: Schema.Types.ObjectId,
  schedule: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
  },
  seatIndex: Schema.Types.Number,
});
