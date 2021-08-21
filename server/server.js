const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const mongoose = require('mongoose');
require('dotenv').config();
const Image = require('./models/Image');
// console.log(process.env);
const app = express();
const PORT = 5000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
})
// const upload = multer({ dest: 'uploads' })
const upload = multer({ storage, fileFilter: (req, file, cb) => {
    if(["image/jpeg", "image/png"].includes(file.mimetype)) cb(null, true);
    else cb(new Error('invalid file type'), false);
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
});
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log('MongoDB Connected!');
    app.use('/uploads', express.static('uploads'));
    app.post('/image', upload.single('image'), async (req, res) => {
        console.log(req.file);
        const image = await new Image({ key: req.file.filename, originalFileName: req.file.originalname }).save();
        res.json(image);
    })
    app.get('/images', async (req, res) => {
        const images = await Image.find();
        res.json(images);
    })
    app.listen(PORT, () => {
        console.log(`Express server is listening on PORT: ${PORT}`)
    })
}).catch((err) => {
    console.log(err);
});
