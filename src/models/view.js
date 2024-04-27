"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const ViewSchema = new Schema({

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
    }
}, {
    collection: "views",
    timestamps: true
})

module.exports = model("View", ViewSchema)