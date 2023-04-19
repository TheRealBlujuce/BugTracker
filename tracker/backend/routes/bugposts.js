const express = require('express');
const router = express.Router();
const http = require('http');
const BugPost = require('../models/bug');

//const url = "http://localhost:3000/routes/bugposts";
  // const apiKey = 'aba90320-ef4d-4b31-939e-c6641a8ba016';
  // const url = `http://cloud.mongodb.com/api/atlas/v1.0/groups/bug-tracker-proj/clusters/maincluster/databases/Bugs/collections/BugPosts?apiKey=${apiKey}`;
  
// Define route for getting bug posts from MongoDB Atlas
router.get("/", function(req, res, next) {

  BugPost.find({})
    .then(bugs => {
      console.log(res);
      //send successful response
      res.status(200).json({
        message: 'Bugs fetched successfully',
        bugs: bugs
      });
    })
    .catch(error => {
      //return error response
      returnError(res, error);
    });

  });

// // Make GET request to MongoDB Atlas API
// const reqQ = http.request(url, (res) => {
//   let data = '';
//   res.on('data', (chunk) => {
//     data += chunk;
//   });
//   res.on('end', () => {
//     const jsonData = JSON.parse(data);
//     console.log(data)
//     res.json(jsonData);
//   });
// });


//   reqQ.on('error', (error) => {
//     console.error(error);
//     res.status(500).send('Error fetching bug posts from MongoDB Atlas');
//   });

//   reqQ.end();
// });

module.exports = router;