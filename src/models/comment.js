"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const CommentSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    comment: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
    
}, {
    collection: "comments",
    timestamps: true
})

module.exports = model("Comment",CommentSchema)