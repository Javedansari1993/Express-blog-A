//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://javed:javed123@atlascluster.rjxql.mongodb.net/blogDB",
  { useNewUrlParser: true }
);

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let posts = [];

const postSchema = new Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

const post1 = new Post({
  title: "day1",
  content: "welcome to the wolrd enjoy the proper manner part one 1",
});

const post2 = new Post({
  title: "day2",
  content: "welcome to the wolrd enjoy the proper manner part two 2",
});

const post3 = new Post({
  title: "day3",
  content: "welcome to the wolrd enjoy the proper manner part tree 3",
});

const defaultPost = [post1, post2, post3];

app.get("/", function (req, res) {
  //Find mathod
  Post.find({}, function (err, foundPost) {
    if (foundPost.length === 0) {
      //insert query
      Post.insertMany(defaultPost, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully insert");
        }
      });
      res.redirect("/");
    } else {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundPost,
      });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const postTitle = req.body.postTitle;
  const postContent = req.body.postBody;

  const post = new Post({
    title: postTitle,
    content: postContent,
  });

  post.save();
  res.redirect("/");
});
app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  // console.log(requestedTitle)
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    if (err) {
      console.log(err)
    } else {
      res.render("post", { title: post.title, content: post.content });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
