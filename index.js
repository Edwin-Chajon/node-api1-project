// implement your API here
const express = require('express');
const Users = require("./data/db"); 
const server = express();

server.use(express.json());
server.get('/', (req, res) => {res.json({ hello: 'Sup'})})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));


//get users
server.get("/api/users", (req, res) => {
    Users.find()
      .then(users => {res.status(200).json(users);})
      .catch(error => {res.status(500).json({errorMessage: "too bad so sad"});});
});

//get specific user
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    id ? 
    Users.findById(id)
        .then(users => {res.status(200).json(users);})
        .catch(error => {res.status(500).json({errorMessage: "user id does not exist."});})
        : res.status(404).json({errorMessage: "user id not found."});
    
});

// add new user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    userInfo['name'] && userInfo['bio'] ?
    Users.insert(userInfo)
        .then(user => {res.status(201).json(user)})
        .catch(error => {res.status(500).json({ errorMessage: 'cant create user'})})
    : res.status(404).json({ errorMessage: 'provide name and bio.' })

});

// delete user
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    id ?
    Users.remove(id)
        .then(users => {res.status(200).json(users)})
        .catch(error => {res.status(500).json({errorMessage: "error deleting"});})
    : res.status(404).json({errorMessage: " user id does not exist."});
    
});

// update user
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;

      userData["name"] && userData["bio"] ?
        Users.update(id)
          .then(update => {res.status(200).json(update)})
          .catch(err => {res.status(500).json({errorMessage: "cant modify."})})
      :
        res.status(400).json({ errorMessage: "provide name and bio."});

});
