import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    user: String,
    title: String,
    text: String,
    createdAt: String,
    reactions: [{
        reaction: String,
        author: String,
    }],
    comments: [{
        comment: String,
        author: String,
    }],
},{ versionKey: false });