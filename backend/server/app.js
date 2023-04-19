var express = require('express');
const app = express();
const Bug = require('../models/bug')


app.post("/api/bugs", (req, res, next) => {
  const bug = new Bug({
    title: req.body.title,
    priority: req.body.priority,
    dateCreated: req.body.dateCreated,
    description: req.body.description
  })
  bug.save();
  console.log(bug);
  res.status(201).json({
    message: "bug submitted successfully"
  })
})

module.exports = app;
