const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const mongoose = require('mongoose');
require('dotenv').config();
const Image = require('./models/Image');
const {imageRouter} = require("./routes/imageRouter");
const {userRouter} = require("./routes/userRouter");
const { authenticate } = require('./middleware/authentication');

// console.log(process.env);
const app = express();
const { MONGO_URI, PORT } = process.env;
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {
    console.log('MongoDB Connected!');
    app.use('/uploads', express.static('uploads'));
    app.use(express.json());
    app.use(authenticate);
    app.use('/', imageRouter);
    app.use('/user', userRouter);
    app.listen(PORT, () => {
        console.log(`Express server is listening on PORT: ${PORT}`)
    })
}).catch((err) => {
    console.log(err);
});
