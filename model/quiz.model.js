const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    creator: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    questions: [
      {
        title: String,
        answerOptions: [String, String, String, String],
        correctOption: [Number],
      },
    ],
    leaderboard: [{ eamil: String, score: Number }],
  },
  { versionKey: false }
);

const quizModel = mongoose.model("quiz", quizSchema);

module.exports = { quizModel };
