const { Router } = require('express');
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require('../middleware/imageUpload');

imageRouter.post('/image', upload.single('image'), async (req, res) => {
    console.log(req.file);
    const image = await new Image({ key: req.file.filename, originalFileName: req.file.originalname }).save();
    res.json(image);
})
imageRouter.get('/images', async (req, res) => {
    const images = await Image.find();
    res.json(images);
})

module.exports = { imageRouter };