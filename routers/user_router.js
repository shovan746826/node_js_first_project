const express = require('express');
const bodyParser = require('body-parser');
const User = require('./../model/user_model');

const router = express.Router();


router.use(bodyParser.json());

router.post('/register', function (req, res) {
    const user = new User(req.body);
    user.save()
        .then(function (user) {
            console.log("user saved");
            res.status(201).json(user);   
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        });
});

router.get('/all_users', function (req, res) {
    User.find()
        .then(function (users) {
            res.status(200).json({"users": users});
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        });
});

router.get('/search_by_name/:name', function (req, res) {
    User.find({name: req.params.name})
        .then(function (user) {
            res.status(200).json({"user": user});
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        });
});


router.get('/find', function (req, res) {
    const queryParams = req.query; // Get all query parameters
    
    User.find(queryParams)
        .then(function (users) {
            res.status(200).json({ "users": users });
        })
        .catch(function (err) {
            console.error("Error occurred:", err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        });
});

router.put('/update_by_email/:email', function (req, res) {
    User.findOneAndUpdate({email: req.params.email}, req.body, {new: true, returnOriginal: true})
        .then(function (user) {
            res.status(200).json({"user": user});
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        });
});

router.put('/update', function (req, res) {
   const queryParams = req.query; // Get all query parameters
   User.findOneAndUpdate(queryParams, req.body, {new: true, returnOriginal: true}, )
       .then(function (user) {
           res.status(200).json({"user": user});
       })
       .catch(function (err) {
           console.error("Error occurred:", err);
           res.status(500).json({ message: "Internal Server Error", error: err.message });
       });
});

router.delete('/delete_by_email/:email', function (req, res) {
    User.findOneAndDelete({email: req.params.email})
        .then(function (user) {
            res.status(200).json({message: "User successfully deleted", "user": user});
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        });
});


router.delete('/delete', function (req, res) {
    const queryParams = req.query; // Get all query parameters
    User.findOneAndDelete(queryParams)
        .then(function (user) {
            res.status(200).json({message: "User successfully deleted", "user": user});
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        });
});

module.exports = router;