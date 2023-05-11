const express = require("express");
const { quizModel } = require("../model/quiz.model");

const quizRouter = express.Router();

quizRouter.get("/quiz", async (req, res) => {
  try {
    const quiz_data = await quizModel.find();
    res.status(200).send({ msg: "Success", data: quiz_data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

quizRouter.get("/quiz/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const quiz_data = await quizModel.findById(id);
    if (quiz_data) {
      res.status(200).send(quiz_data);
    } else {
      res.send({ msg: "Data Not Found" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

quizRouter.post("/quiz", async (req, res) => {
  try {
    const newQuiz = new quizModel(req.body);
    await newQuiz.save();
    res.status(200).send({ msg: "Quiz Succesfully Added" });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

quizRouter.patch("/quiz/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let quizdata = await quizModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(201).send({ msg: "Quiz Succesfully Updated" });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

quizRouter.delete("/quiz/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let quizdata = await quizModel.findByIdAndDelete(id);
    res.status(202).send({ msg: "Quiz Succesfully Deleted" });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = { quizRouter };
