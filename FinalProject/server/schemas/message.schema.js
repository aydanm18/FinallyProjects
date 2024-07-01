const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        name: String,
        email: String,
        phone: String,
        website: String,
        message: String,
        isRead: { type: Boolean, default: false }

    },
    { timestamps: true, versionKey: false }
);

module.exports = MessageSchema