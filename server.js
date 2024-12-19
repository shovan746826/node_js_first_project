const express = require('express');
const db = require('./db');
const app = express();
require('dotenv').config();



app.listen(process.env.PORT || 3000, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});


const userRouter = require('./routers/user_router');
app.use('/user', userRouter);
