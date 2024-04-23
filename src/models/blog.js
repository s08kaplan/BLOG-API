"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const BlogSchema = new Schema({

  
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

  
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true
    },

   
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
        index: true
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: true
    },

    like: {
        type: Boolean,
        default: false
    },

    image: [],

    isPublish: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    collection: "blogs",
    timestamps: true
})

module.exports = model("Blog", BlogSchema)