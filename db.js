const mongoose = require('mongoose');
require('dotenv').config();

const databaseName = "firstproject";
// const mongodbURL = process.env.BASE_URL;
const mongodbURL = process.env.BASE_URL_PROD;

mongoose.connect((mongodbURL), { //craete database
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