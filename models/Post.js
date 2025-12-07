const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    fullText: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;