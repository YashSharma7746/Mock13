const express = require("express");
const { userModal } = require("../model/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
userRouter.get("/user", async (req, res) => {
  try {
    const user_data = await userModal.find();
    res.send(user_data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user_data = await userModal.findById(id);
    if (user_data) {
      res.send(user_data);
    } else {
      res.send({ msg: "No User" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "mock13");
          res.status(201).send({ msg: "Login Success", token });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

userRouter.post("/signup", async (req, res) => {
  let { email, password, isAdmin, name } = req.body;
  try {
    const user = await userModal.find({ email });
    if (user.length == 0) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ msg: "Error In Password Hashing" });
        } else {
          const newuser = new userModal({
            email,
            isAdmin,
            name,
            password: hash,
          });
          await newuser.save();
          res.status(201).send({ msg: "User Succesfully Register" });
        }
      });
    } else {
      res.send({ msg: "User is Already Present" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Invalid Credentials" });
  }
});

module.exports = { userRouter };
