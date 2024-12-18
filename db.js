const mongoose = require('mongoose');
require('dotenv').config();

const databaseName = "firstproject";
const mongodbURL = "mongodb://localhost:27017/";

mongoose.connect((process.env.BASE_URL || mongodbURL)+databaseName, { //craete database
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {    
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (err) => {
    console.log(`Database error: ${err}`);
}); 

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

module.exports = db;