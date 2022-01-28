const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/apis/users");
const profile = require("./routes/apis/profile");
const posts = require("./routes/apis/posts");
const passport = require("passport");
const path = require("path");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require("./config/keys_prod").mongoURI;

// Connect to mongoDB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
      if (err) throw err;
      console.log('MongoDB is connected');
  }
);

app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//sever static assets if in production
if (process.env.NODE_ENV === "production") {
  // set the static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
