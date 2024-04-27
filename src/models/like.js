"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const LikeSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
        index: true
    },

}, {
    collection: "likes",
    timestamps: true
})

module.exports = model("Like", LikeSchema)