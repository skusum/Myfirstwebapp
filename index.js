const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var mongoose = require("mongoose");
const model = require("./model");
const path = require("path");
///MOngog DB Connection
var mongoDB =
  // "mongodb+srv://Requin:Requin@cluster0.0vcok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  "mongodb+srv://kusum:habbod12@cluster0.igjkc.mongodb.net/sample_professors?retryWrites=true&w=majority";

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//  Add Resturant
app.post("/add", (req, res) => {
  const { Professor_ID, Difficulty, Quality, review} = req.body;
  //const address = { building, street, zipcode };
  console.log(req.body);
  const prof = new model({ Professor_ID, Difficulty, Quality, review });
  try {
    prof.save().then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/search", (req, res) => {
  model
    .find({ Professor_ID: req.body.professor_id })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => console.error(error));
});

app.listen(8080, function () {
  console.log("listening on 8080");
});
