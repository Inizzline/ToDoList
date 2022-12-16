const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const clientInputList = ["Pray", "Exercise", "Eat"];
const clientWorklistInput = [];

app.get("/", function(req, res) {

const day = date.getDate();


  res.render("lists", {
    listTile: day,
    newClientInput: clientInputList
  });

});

app.post("/", function(req, res) {

  const clientInput = req.body.newItem;

  if (req.body.list === "Work") {

    clientWorklistInput.push(clientInput);
    res.redirect("/work");

  } else {

    clientInputList.push(clientInput);

    res.redirect("/");
  }

})

app.get("/work", function (req,res) {

  res.render("lists", {listTile: "Work List", newClientInput: clientWorklistInput})
})

app.get("/about", function (req, res) {
  res.render("about");
})

app.listen(3000, function() {
  console.log("Server is running✅");
})
