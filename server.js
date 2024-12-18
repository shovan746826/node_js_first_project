const express = require('express');
const db = require('./db');

const app = express();


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


const userRouter = require('./routers/user_router');
app.use('/user', userRouter);
