require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require('./models/userModels')
const app = express();
const fs = require('fs');
app.set('view engine', 'ejs')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})
app.post("/", async (req, res) => {
  try {
    console.log("post request sent")
    const { email, pass } = req.body;
    if (!(email && pass)) {
      console.log("All inputs are required");
    }
    const user = await User.findOne({ email });

    if (user && pass) {
      console.log(user)
      res.render('welcome',{user})
    }
    // console.log("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get('/register',(req, res) => {
  res.render('signup')
})

app.post('/register', async (req, res) => {
  var myData = new User(req.body);
  try{
    await myData.save()
    console.log("data saved")
  }catch{
    console.log("data not saved")
  }
  res.redirect('/');
})


module.exports = app;