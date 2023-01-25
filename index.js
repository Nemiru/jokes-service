const express = require('express');
const app = express();
const { Joke } = require('./db');
const { Op } = require("sequelize")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  console.log(req.query);
  let jokes = [];
  try {
    if(Array.isArray(req.query.tags)) {
      jokes = await Joke.findAll({where: {tags: req.query.tags }});
      //res.status(200).console.log(jokes);
      //return;
    } else if (req.query.tags) {
      jokes = await Joke.findAll({where: {tags: req.query.tags }});
    } else {
      jokes = await Joke.findAll();
    }
        res.send(jokes);
    //res.send("thanks for stopping by!")
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
