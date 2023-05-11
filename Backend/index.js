const express = require("express");
const cors = require("cors");
const { quizRouter } = require("./routes/quiz.routes");
const { userRouter } = require("./routes/user.routes");
const app = express();
const connection = require("./db");
app.use(cors());
app.use("/quiz", quizRouter);
app.use("/", userRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (e) {
    console.log(e.message);
  }
  console.log(`Server is running on port ${process.env.port}`);
});
