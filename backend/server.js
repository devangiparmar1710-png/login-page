const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect mongodb
mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);


// Signup API
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();
  res.json("Signup success");
});


// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json("Wrong password");

  res.json("Login successful");
});


app.listen(5000, () => console.log("Server running on 5000"));