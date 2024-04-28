"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const ViewSchema = new Schema({

    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
        index: true
    },

    viewers: {
        type: Array,
        default: []
    }
}, {
    collection: "views",
    timestamps: true
})

module.exports = model("View", ViewSchema)