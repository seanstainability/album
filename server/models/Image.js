const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    // _id 자동 생성
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
}, {
    // 생성, 수정일 자동 생성
    timestamps: true
})

module.exports = mongoose.model('image', ImageSchema);