const { Router } = require('express');
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require('../middleware/imageUpload');
const fs = require('fs');
const { promisify } = require('util');
const mongoose = require('mongoose');

const fileUnlink = promisify(fs.unlink);
imageRouter.post('/image', upload.single('image'), async (req, res) => {
    try {
        if(!req.user) throw new Error('인증된 사용자가 아닙니다.');
        console.log(req.file);
        const image = await new Image({
            user: {
              _id: req.user.id,
              nickname: req.user.nickname,
              email: req.user.email,
            },
            public: req.body.public,
            key: req.file.filename,
            originalFileName: req.file.originalname
        }).save();
        res.json(image);
    } catch(err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})
imageRouter.get('/images', async (req, res) => {
    // public 이미지 가져오기
    const images = await Image.find({ public: true });
    res.json(images);
})
imageRouter.delete('/:imgId', async (req, res) => {
    try {
        if(!req.user) throw new Error('인증된 사용자가 아닙니다.');
        if(!mongoose.isValidObjectId(req.params.imgId)) throw new Error('올바른 이미지 경로가 아닙니다.');
        const image = await Image.findOneAndDelete({ _id: req.params.imgId });
        if(!image) return res.json({ message: '요청하신 이미지는 이미 삭제되었습니다.' });
        await fileUnlink(`./uploads/${image.key}`);
        res.json({ message: '삭제되었습니다.' });
    } catch(err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})
imageRouter.patch('/:imgId/like', async (req, res) => {
    try {
        if(!req.user) throw new Error('인증된 사용자가 아닙니다.');
        if(!mongoose.isValidObjectId(req.params.imgId)) throw new Error('올바른 이미지 경로가 아닙니다.');
        const image = await Image.findOneAndUpdate(
            { _id: req.params.imgId },
            { $addToSet: { likes: req.user.id } },
            { new: true } // 업데이트 이후 내용을 받기 위한 옵션
        );
        res.json(image);
    } catch(err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})
imageRouter.patch('/:imgId/unlike', async (req, res) => {
    try {
        if(!req.user) throw new Error('인증된 사용자가 아닙니다.');
        if(!mongoose.isValidObjectId(req.params.imgId)) throw new Error('올바른 이미지 경로가 아닙니다.');
        const image = await Image.findOneAndUpdate(
            { _id: req.params.imgId },
            { $pull: { likes: req.user.id } },
            { new: true } // 업데이트 이후 내용을 받기 위한 옵션
        );
        res.json(image);
    } catch(err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})

module.exports = { imageRouter };