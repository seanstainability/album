const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    // _id 자동 생성
    user: {
        _id: { type: mongoose.Types.ObjectId, require: true, index: true },
        nickname: { type: String, require: true },
        email: { type: String, require: true },
    },
    likes: [{ type: mongoose.Types.ObjectId }],
    public: { type: Boolean, required: true, default: false },
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
}, {
    // 생성, 수정일 자동 생성
    timestamps: true
})

module.exports = mongoose.model('image', ImageSchema);