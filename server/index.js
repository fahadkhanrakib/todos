const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const todosModel = require("./models");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb has been connected");
  })
  .catch((err) => {
    console.log("mongodb can't connect", err);
  });

app.get("/", (req, res) => {
  todosModel
    .find({})
    .then((todo) => res.json(todo))
    .catch((err) => res.jsno(err));
});

app.post("/createTodo", (req, res) => {
  todosModel
    .create(req.body)
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});

app.put("/updateTodo/:id", (req, res) => {
  const _id = req.params.id;
  
  todosModel.findById({_id})
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listening port : ${PORT}`);
});
